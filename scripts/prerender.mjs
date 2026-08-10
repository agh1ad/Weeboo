import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "../.ssr/entry-server.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist", "index.html");
const ssrDirectory = path.join(root, ".ssr");
const shell = await fs.readFile(indexPath, "utf8");
const markup = render();

if (!shell.includes('<div id="root"></div>')) {
  throw new Error("Homepage root placeholder was not found during prerendering.");
}

await fs.writeFile(
  indexPath,
  shell.replace('<div id="root"></div>', `<div id="root">${markup}</div>`),
);
await fs.rm(ssrDirectory, { recursive: true, force: true });

console.log("Prerendered the complete homepage into dist/index.html.");
