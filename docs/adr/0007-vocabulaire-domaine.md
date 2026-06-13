# ADR-007 — Vocabulaire domaine français / tech anglais

## Status

Accepted (2026-06-13)

## Context

App juridique française, codée par un fondateur francophone, destinée à des utilisateurs francophones. Les concepts métier sont définis en droit français (Code de la consommation, Code civil, Code des postes et des communications électroniques). Traduire ces concepts en anglais (`Case`, `LegalAction`, `Defendant`) dégrade la précision juridique et complique la communication avec l'avocat partenaire.

À l'inverse, les concepts techniques bénéficient de l'écosystème anglo-saxon (FastAPI, Pydantic, Next.js, npm) et perdent en clarté traduits (`gestionnaire` au lieu de `handler`).

## Decision

### Domaine métier — **français**
- Modèles, tables, champs métier, enums, types de domaine, événements, exceptions métier, libellés UI.
- Exemples : `Dossier`, `MiseEnDemeure`, `PartieAdverse`, `Mediateur`, `Saisine`, `Relance`, `Operateur`, `CasType`, `Slot`, `Destinataire`, `Fondement`, `EnvoiLRE`.
- Enums en français : `cas_type` valeurs `resiliation_refusee`, `prelevement_apres_resiliation`, `surfacturation`, `panne_longue_duree`, `frais_resiliation`.
- Exceptions métier : `DossierNonPret`, `QuotaLREDepasse`, `TemplateInvalide`, `OperateurInconnu`.

### Tech infrastructure — **anglais**
- Vocabulaire framework et plomberie : `request`, `response`, `handler`, `controller`, `service`, `repository`, `middleware`, `dependency`, `factory`, `session`, `client`, `worker`, `job`, `webhook`, `route`, `endpoint`.
- Exemples : `dossier_handler.py`, `agent_service.py`, `ar24_client.py`, `postmark_webhook.py`.

### Conventions
- Noms de variables locales : suivent le contexte (domaine ou tech) — `dossier`, `partie_adverse`, `agent_action` côté métier ; `request`, `response`, `client` côté tech.
- Noms de tables SQL : français en snake_case (`dossier`, `mise_en_demeure`, `agent_action`).
- Noms de colonnes : français pour le métier (`cas_type`, `operateur`, `destinataire`), anglais pour les colonnes techniques (`created_at`, `updated_at`, `id`).
- Logs : message en français pour le métier (`"Dossier créé"`), anglais pour la tech (`"Request received"`, `"Database connection established"`).
- Commits Conventional Commits en anglais (convention internationale) — `feat: add resiliation refusee template`.
- Variables d'environnement en SCREAMING_SNAKE_CASE anglais (`DATABASE_URL`, `ANTHROPIC_API_KEY`).

## Consequences

**Positives**
- Précision juridique préservée : `MiseEnDemeure` n'a pas de traduction satisfaisante (`FormalNotice` perd la nuance procédurale).
- Communication directe avec l'avocat partenaire (templates et concepts en français).
- Cohérence avec le PRD, les issues, et les conversations métier.
- Code "lisible métier" pour relecture par non-tech (pote droit, futur juriste interne).

**Négatives**
- Mélange de langues — peut surprendre un dev habitué au tout-anglais.
- Recrutement futur : un dev anglophone pur devra adapter — mitigé par la doc CLAUDE.md.
- Risque d'oubli accent / orthographe : `mediateur` vs `médiateur`. **Règle simple** : pas d'accents dans les identifiants Python/TS/SQL (pour éviter les problèmes d'encoding), accents dans les libellés UI uniquement.

**Alternatives écartées**
- Full anglais : perd la précision métier, friction avec l'avocat partenaire.
- Full français : friction inutile avec le framework anglo-saxon, mauvaise abstraction.
