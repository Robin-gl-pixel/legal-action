# ADR-002 — Architecture monorepo

## Status

Accepted (2026-06-13)

## Context

Stack acceptée en [ADR-001](0001-stack-technique.md) : Python (FastAPI + Hatchet workers) + TypeScript (Next.js). Trois unités déployables : frontend Vercel, backend Fly.io, workers Fly.io. Besoin de partager des types (schémas API), du tooling (lint, format, CI), et des conventions.

## Decision

Monorepo avec la structure suivante :

```
/
├── apps/
│   ├── web/        ← Next.js (TS, App Router) — déployée sur Vercel
│   ├── api/        ← FastAPI (Python) — déployée sur Fly.io (région Paris)
│   └── workers/    ← Hatchet workers (Python) — déployés sur Fly.io
├── packages/
│   └── api-client/ ← client TS auto-généré depuis l'OpenAPI de FastAPI
├── docs/
│   └── adr/        ← Architecture Decision Records
├── design/         ← tokens.md, assets visuels source
├── CLAUDE.md       ← règles d'ingénierie transverses
└── README.md
```

Outils :
- **Python** : `uv` pour la gestion d'environnements et de dépendances, `pyproject.toml` par app, workspace partagé à la racine si utile.
- **TypeScript** : `pnpm` workspaces.
- **CI** : GitHub Actions, jobs par app (build / lint / typecheck / test), seulement déclenchés sur diff des chemins concernés.

Communication backend ↔ frontend :
- HTTP REST.
- OpenAPI 3.1 auto-générée par FastAPI.
- Le package `packages/api-client` est régénéré via `openapi-typescript` et consommé par `apps/web`.

## Consequences

**Positives**
- Refactos cross-app dans un seul commit / PR.
- Types partagés sans publication de packages — `apps/web` importe directement depuis `packages/api-client`.
- Conventions homogènes (CLAUDE.md, ADRs, CI).
- Migration éventuelle vers polyrepo reste possible (chaque app est autonome dans son dossier).

**Négatives**
- Légère complexité initiale (deux gestionnaires de packages, jobs CI à scoper).
- Tooling cross-stack (Python + TS) demande un peu de discipline.

**Alternatives écartées**
- Polyrepo : friction inutile en solo, refactos cross-cutting pénibles.
- Mono-langage (full TS ou full Python) : écarté en ADR-001.
