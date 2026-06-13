# @legal-action/api-client

Client TS typé pour l'API FastAPI. Le fichier `src/schema.d.ts` est **généré** à partir de l'OpenAPI 3.1 exposé par `apps/api` via [`openapi-typescript`](https://github.com/openapi-ts/openapi-typescript).

## Régénérer

```bash
# 1. démarrer l'API
cd apps/api && uv run uvicorn src.legal_action_api.main:app --port 8000

# 2. dans un autre terminal, à la racine du monorepo
pnpm --filter @legal-action/api-client regen
```

Variable d'env optionnelle : `API_OPENAPI_URL` (défaut : `http://localhost:8000/openapi.json`).

## Usage

```ts
import type { paths } from "@legal-action/api-client/schema";

type HealthResponse =
  paths["/health"]["get"]["responses"][200]["content"]["application/json"];
```

## Convention

- Ne jamais éditer `src/schema.d.ts` à la main — le régénérer.
- Commiter le `schema.d.ts` regénéré dans la même PR que tout changement de contrat API.
