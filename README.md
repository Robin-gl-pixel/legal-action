# legal-action

App agentique de gestion de litiges télécom B2C en France. Monorepo : Next.js (web), FastAPI (api), Hatchet workers (workers), client API TS auto-généré.

Voir [`CLAUDE.md`](./CLAUDE.md) pour les règles d'ingénierie et [`docs/adr/`](./docs/adr/) pour les décisions structurantes.

## Structure

```
apps/web/             Next.js 15 (App Router, TS strict, Tailwind, shadcn/ui)
apps/api/             FastAPI (Python 3.12+, Pydantic v2, async)
apps/workers/         Hatchet workers (Python, durable workflows)
packages/api-client/  Client TS généré depuis l'OpenAPI FastAPI
design/               Design tokens (slice #3, géré séparément)
docs/adr/             Architecture Decision Records
```

## Prérequis machine

- Node 20+
- pnpm 10+
- Python 3.12+
- uv (gestionnaire d'env Python)
- Docker (pour Supabase local, Hatchet local)
- `pre-commit` (`pipx install pre-commit`)

Installation rapide (macOS) :

```bash
brew install node pnpm uv
pipx install pre-commit
```

## Comptes externes à provisionner

Tous les secrets vivent dans Vercel/Fly secrets et Supabase Vault. Aucun `.env` réel n'est commité.

| Service | Usage | Variable principale |
|---|---|---|
| Supabase (EU region) | Postgres + Auth + Storage + pgvector | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`, `DATABASE_URL` |
| Anthropic | Claude Opus 4.7 + Haiku 4.5 (agent + classification) | `ANTHROPIC_API_KEY` |
| Postmark | Mail inbound + outbound transactionnel | `POSTMARK_SERVER_TOKEN`, `POSTMARK_INBOUND_WEBHOOK_SECRET` |
| AR24 | Lettre Recommandée Électronique (LRE) | `AR24_API_KEY`, `AR24_SENDER_ID` |
| Stripe | Abonnements + paiement à l'acte | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ABO_ANNUEL`, `STRIPE_PRICE_ACTE` |
| Pappers | Enrichissement raison sociale / RCS opérateurs | `PAPPERS_API_KEY` |
| Langfuse | Observabilité agent (traces LLM) | `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_HOST` |
| Hatchet | Workflows durables | `HATCHET_CLIENT_TOKEN` |
| Vercel | Hosting `apps/web` | dashboard Vercel |
| Fly.io | Hosting `apps/api` et `apps/workers` (région CDG) | `flyctl auth login` |

## Lancer en local

### 1. Installer les dépendances

```bash
# racine du monorepo
pnpm install

# api
cd apps/api && uv sync && cd ../..

# workers
cd apps/workers && uv sync && cd ../..
```

### 2. Variables d'environnement

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/workers/.env.example apps/workers/.env
# remplir avec les valeurs des comptes provisionnés
```

### 3. Démarrer

```bash
# API (FastAPI, port 8000)
cd apps/api && uv run uvicorn src.legal_action_api.main:app --reload --port 8000

# Web (Next.js, port 3000) — depuis la racine
pnpm dev

# Workers (Hatchet) — nécessite un token Hatchet
cd apps/workers && uv run python -m legal_action_workers.main
```

### 4. Vérifier la santé

```bash
curl http://localhost:8000/health
# {"status":"ok","version":"0.1.0"}

open http://localhost:3000/health-demo
# affiche le statut renvoyé par l'API
```

## Régénérer le client API typé

Le client TS dans `packages/api-client` est généré depuis l'OpenAPI exposé par FastAPI.

```bash
# 1. démarrer l'API
cd apps/api && uv run uvicorn src.legal_action_api.main:app --port 8000

# 2. dans un autre terminal
pnpm --filter @legal-action/api-client regen
```

Sortie : `packages/api-client/src/schema.d.ts`.

## Tests

```bash
# api (pytest)
cd apps/api && uv run pytest -v

# web (vitest)
pnpm --filter @legal-action/web test
```

## Pre-commit

```bash
pre-commit install
pre-commit run --all-files
```

## Commits / PR

Conventional Commits, branche par issue (`feat/<n>-<slug>`, `chore/<slug>`). Voir `CLAUDE.md` pour le détail des règles.
