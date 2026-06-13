#!/usr/bin/env node
// Regenere packages/api-client/src/schema.d.ts depuis l'OpenAPI exposé par FastAPI.
// Prereq : `cd apps/api && uv run uvicorn src.legal_action_api.main:app --port 8000`.
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/schema.d.ts");
const URL = process.env.API_OPENAPI_URL ?? "http://localhost:8000/openapi.json";

mkdirSync(dirname(OUT), { recursive: true });

const result = spawnSync(
  "npx",
  ["--yes", "openapi-typescript", URL, "-o", OUT],
  { stdio: "inherit" },
);

if (result.status !== 0) {
  console.error(`Echec de la regen client API. Verifier que l'API tourne sur ${URL}.`);
  process.exit(result.status ?? 1);
}
