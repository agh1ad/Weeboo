import pg from "pg";

const { Pool } = pg;
let pool;
let ready = false;

function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.PGHOST);
}

function createPool() {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  const config = connectionString ? { connectionString } : {};
  if (
    connectionString &&
    !connectionString.includes("localhost") &&
    !connectionString.includes("sslmode=disable")
  ) {
    config.ssl = { rejectUnauthorized: false };
  }
  pool = new Pool({ ...config, max: 5, idleTimeoutMillis: 30_000 });
  pool.on("error", (error) => {
    ready = false;
    console.error(JSON.stringify({ event: "database_pool_error", message: error.message }));
  });
  return pool;
}

export async function initializeDatabase() {
  if (!databaseConfigured()) return false;
  const client = createPool();
  await client.query(`
    CREATE TABLE IF NOT EXISTS project_requests (
      id BIGSERIAL PRIMARY KEY,
      public_id UUID NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      client_type TEXT NOT NULL,
      service TEXT NOT NULL,
      project_idea TEXT NOT NULL,
      current_website TEXT,
      timing TEXT,
      materials TEXT,
      additional_details TEXT,
      consented_at TIMESTAMPTZ NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
    );
    CREATE INDEX IF NOT EXISTS project_requests_created_at_idx
      ON project_requests (created_at DESC);
    CREATE INDEX IF NOT EXISTS project_requests_status_idx
      ON project_requests (status);
  `);
  ready = true;
  return true;
}

export async function saveProjectRequest(publicId, request) {
  if (!ready) return false;
  await createPool().query(
    `INSERT INTO project_requests (
      public_id, name, email, client_type, service, project_idea,
      current_website, timing, materials, additional_details, consented_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW())`,
    [
      publicId,
      request.name,
      request.email,
      request.client_type,
      request.service,
      request.project_idea,
      request.current_website || null,
      request.timing || null,
      request.materials || null,
      request.additional_details || null,
    ],
  );
  return true;
}

export async function databaseHealth() {
  if (!ready) return { configured: databaseConfigured(), ready: false };
  try {
    await createPool().query("SELECT 1");
    return { configured: true, ready: true };
  } catch {
    ready = false;
    return { configured: true, ready: false };
  }
}

export async function closeDatabase() {
  if (pool) await pool.end();
}
