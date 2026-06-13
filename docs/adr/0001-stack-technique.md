# ADR-001 — Stack technique

## Status

Accepted (2026-06-13)

## Context

App agentique de gestion de litiges télécom B2C en France. Fondateur solo, très à l'aise en Python, moins en TypeScript. Besoin de livrer rapidement un MVP (~8 semaines full-time), avec un agent réellement autonome (orchestration LLM longue durée), un frontend web B2C de qualité, et une stack durable (vivra ≥ 12 mois).

Contraintes :
- Hébergement EU (RGPD, perception de sérieux pour B2C français).
- Workflow long-running natif (un dossier vit 2-6 mois entre la mise en demeure et la médiation).
- Type-safety end-to-end souhaitable mais pas à n'importe quel prix.
- Pas de ML custom prévu en MVP — uniquement de l'orchestration LLM via API.

## Decision

| Couche | Choix |
|---|---|
| Backend HTTP | FastAPI (Python 3.12+), Pydantic v2 |
| Workers durables | Hatchet (Python, cron + retries + durable state) |
| Frontend web | Next.js (TS, App Router) sur Vercel |
| DB / Auth / Storage / Vector | Supabase (Postgres + pgvector + Auth + Storage, région EU) |
| Agent runtime | Claude Agent SDK Python |
| Modèles LLM | Opus 4.7 (rédaction, planification) + Haiku 4.5 (routing, classification) |
| OCR / vision | Claude vision direct |
| Mail | Postmark (inbound + outbound) |
| LRE | AR24 API |
| Identification entreprise | Pappers (Sirene en bootstrap) |
| Paiements | Stripe (Checkout + Subscriptions + Customer Portal) |
| PDF | WeasyPrint |
| Observabilité agent | Langfuse |
| Hébergement backend / workers | Fly.io région Paris (CDG) |
| Client API typé | `openapi-typescript` généré depuis FastAPI |

## Consequences

**Positives**
- Le fondateur travaille dans sa zone de confort Python — vélocité réelle.
- Stack durable, mature, communautés actives.
- Hébergement EU sur Supabase + Fly = argument compliance.
- Workers Hatchet gèrent nativement les workflows pluri-mois (médiation), pas besoin de bricoler.
- Si ML custom devient utile plus tard (classifieur, fine-tuning), on est déjà en Python.

**Négatives**
- +1 langage à maintenir (Python backend + TS frontend) vs full-TS — coût mineur, atténué par OpenAPI → types TS.
- Fly.io légèrement plus cher que Vercel-only (≈ 5-20 €/mois MVP).
- Pas de `tRPC` natif — remplacé par `openapi-typescript`, ≈ 95% du même bénéfice.

**Alternatives écartées**
- Full TypeScript (Next.js + Anthropic SDK TS) : écarté car le fondateur est Python-first, et l'argument "tout-en-un TS" ne compense pas l'inconfort.
- Modèles EU souverains (Mistral) : qualité inférieure à Opus pour le legal français, pas justifié en MVP.
