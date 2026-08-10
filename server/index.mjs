import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import {
  closeDatabase,
  databaseHealth,
  initializeDatabase,
  saveProjectRequest,
} from "./database.mjs";
import { sendProjectEmails } from "./email.mjs";
import { parseProjectRequest } from "./validation.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, "..");
const publicDirectory = path.join(root, "dist");
const port = Number(process.env.PORT || 3000);
const app = express();

if (!fs.existsSync(publicDirectory)) {
  console.error("Production build not found. Run npm run build before npm start.");
  process.exit(1);
}

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use((request, response, next) => {
  request.requestId = crypto.randomUUID();
  response.setHeader("X-Request-ID", request.requestId);
  next();
});
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }),
);
app.use(compression());
app.use(express.json({ limit: "32kb", strict: true }));

function allowedOrigin(request) {
  const origin = request.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    if (originUrl.host === request.get("host")) return true;
    const configured = (process.env.PUBLIC_ORIGIN || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    return configured.includes(originUrl.origin);
  } catch {
    return false;
  }
}

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests. Please wait before trying again." },
});

app.get("/api/health", async (_request, response) => {
  const database = await databaseHealth();
  response.status(database.ready ? 200 : 503).json({
    status: database.ready ? "ok" : "degraded",
    database,
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/project-requests", leadLimiter, async (request, response) => {
  if (!allowedOrigin(request)) {
    return response.status(403).json({ error: "Request origin is not allowed." });
  }

  const parsed = parseProjectRequest(request.body);
  if (!parsed.success) {
    return response.status(400).json({
      error: "Please review the highlighted information and try again.",
      fields: parsed.error.flatten().fieldErrors,
    });
  }

  const lead = parsed.data;
  if (lead.company_fax) {
    return response.status(202).json({ received: true });
  }
  if (Date.now() - lead.form_started_at < 1_500) {
    return response.status(400).json({ error: "Please take a moment to review your request." });
  }

  const publicId = crypto.randomUUID();
  let stored = false;
  let emailed = false;
  const failures = [];

  try {
    stored = await saveProjectRequest(publicId, lead);
  } catch (error) {
    failures.push("database");
    console.error(JSON.stringify({ event: "lead_database_failure", requestId: request.requestId, message: error.message }));
  }

  try {
    emailed = await sendProjectEmails(publicId, lead);
  } catch (error) {
    failures.push("email");
    console.error(JSON.stringify({ event: "lead_email_failure", requestId: request.requestId, message: error.message }));
  }

  if (!stored && !emailed) {
    return response.status(503).json({
      error: "We could not securely save the request right now. Please email hello@weeboo.com.",
    });
  }

  console.log(
    JSON.stringify({
      event: "project_request_received",
      requestId: request.requestId,
      publicId,
      stored,
      emailed,
      failures,
    }),
  );
  return response.status(201).json({ received: true, reference: publicId });
});

app.use(
  express.static(publicDirectory, {
    extensions: ["html"],
    etag: true,
    setHeaders(response, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (filePath.endsWith(".html")) {
        response.setHeader("Cache-Control", "no-cache");
      }
    },
  }),
);

app.use((request, response) => {
  response.status(404).sendFile(path.join(publicDirectory, "404.html"));
});

app.use((error, request, response, _next) => {
  console.error(JSON.stringify({ event: "unhandled_request_error", requestId: request.requestId, message: error.message }));
  response.status(500).json({ error: "Unexpected server error." });
});

try {
  const databaseReady = await initializeDatabase();
  console.log(JSON.stringify({ event: "database_initialized", ready: databaseReady }));
} catch (error) {
  console.error(JSON.stringify({ event: "database_initialization_failed", message: error.message }));
}

const server = app.listen(port, "0.0.0.0", () => {
  console.log(JSON.stringify({ event: "server_started", port }));
});

async function shutdown(signal) {
  console.log(JSON.stringify({ event: "server_stopping", signal }));
  server.close(async () => {
    await closeDatabase();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
