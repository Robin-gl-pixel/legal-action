# CLAUDE.md — Règles d'ingénierie

Règles qui s'appliquent à toutes les contributions sur ce repo. Lues automatiquement par Claude Code. À respecter dans chaque PR.

Pour les décisions structurantes (stack, monorepo, templates, autonomie graduée, mail, pricing, vocabulaire), voir `docs/adr/`.

---

## Principes transverses

1. **YAGNI strict en MVP** — pas d'abstraction avant la 3e occurrence concrète d'un pattern. Pas de Repository / UoW / Factory / Mediator avant douleur prouvée.
2. **Langage métier en français, langage tech en anglais.**
   - Domaine : `Dossier`, `MiseEnDemeure`, `PartieAdverse`, `Mediateur`, `Saisine`, `Relance`, `CasType`, `Operateur`.
   - Tech : `request`, `handler`, `controller`, `service`, `repository` (si justifié).
3. **Tests sur le comportement observable, jamais sur l'implémentation.** Si tu testes une private function, c'est qu'il manque une seam publique. Voir les 4 seams dans le PRD (issue #1).
4. **Pas de docstring descriptif. Pas de commentaire "ce que fait le code".** Uniquement le pourquoi non-évident : contrainte, invariant, workaround daté, hack lié à un bug externe.
5. **Erreurs explicites.** Jamais de `except:` nu, jamais de `catch (e) {}` silencieux. Erreurs métier typées (`DossierNotReady`, `QuotaLREDepasse`, `TemplateInvalide`).
6. **Pas de magic strings / numbers.** Enums centralisées (Postgres + Python + TS), constantes typées.
7. **Logs structurés** (`structlog` Python, `pino` TS si besoin) avec corrélation par `dossier_id` et `user_id` quand applicable.
8. **Pas de "TODO" sans nom + date + référence d'issue.** Format : `# TODO(robin, 2026-06-13, #42): pourquoi reporté`.

---

## Python / FastAPI / Workers Hatchet

9. **Python 3.12+, type tout.** `pyright` strict. Pas de `Any` sauf aux frontières contrôlées (sortie LLM avant validation, payload webhook avant parsing).
10. **Ruff** (lint + format) en pre-commit. Ruleset : `E`, `F`, `I`, `B`, `UP`, `SIM`, `RUF`, `ASYNC`.
11. **Pydantic v2** pour tout ce qui traverse une frontière (HTTP request/response, payloads workers, schémas LLM, parsing webhooks).
12. **FastAPI `Depends`** pour l'injection (auth, db session, agent client). Pas d'ABCs / interfaces sauf si vrai polymorphisme.
13. **async/await partout.** Jamais d'I/O bloquant dans un route handler ou un job worker — `httpx`, `asyncpg` / SQLAlchemy 2.0 async, jamais `requests` ni `psycopg2` sync.
14. **Limites souples.** Fichier > 300 lignes ou fonction > 30 lignes = signal de refacto, pas une règle dure.
15. **SQLAlchemy 2.0 async + Alembic** pour les migrations. Schémas SQL en `migrations/` pour la RLS Supabase.
16. **Pas d'IO dans `__init__.py`.** Side-effects au boot strictement contrôlés.

---

## TypeScript / Next.js

17. **TS strict.** `strict: true` complet, pas de `any` sauf `@ts-expect-error <raison>`. Pas de `as unknown as X`.
18. **ESLint + Prettier** config Next.js par défaut + `eslint-plugin-react-server-components`.
19. **Server Components par défaut.** `"use client"` uniquement quand strictement nécessaire (hooks, événements DOM, animations).
20. **Pas de `useEffect` quand un Server Component peut faire le travail.** Pattern : fetch côté serveur, hydrater côté client.
21. **Tailwind + shadcn/ui.** Pas de CSS modules, pas de styled-components. Customisation via le theme Tailwind issu du design tokens (slice #3).
22. **Zod** pour parsing runtime (réponses API non typées, formulaires). Types TS générés depuis l'OpenAPI FastAPI via `openapi-typescript`.
23. **Server Actions** pour les mutations côté serveur quand c'est cohérent avec le flow.

---

## Agent / LLM

24. **Tous les appels LLM passent par le wrapper Langfuse-instrumented.** Jamais d'appel `anthropic.messages.create()` direct dans le code métier.
25. **Sortie structurée obligatoire** (JSON schema via Claude Agent SDK ou `response_format`) pour toute décision agent — classification, routing, action proposée. Jamais de free-text quand on attend une décision.
26. **Enums fermées** pour les classifications : `cas_type`, classification de mail entrant, type d'`agent_action`. Ces enums vivent en un seul endroit (Python + TS partagent depuis l'OpenAPI).
27. **Disclaimers automatiquement injectés** dans tous les system prompts (anti-monopole avocat + mention IA).
28. **Anthropic prompt caching** activé sur les system prompts et l'historique conversationnel dès qu'un même prompt est réutilisé > 1 fois (cf. `cache_control`).
29. **Tests seam 2 obligatoires** pour les politiques d'autonomie graduée — fixture état dossier + événement → assertion sur les outils appelés et `requires_validation`.
30. **Pas de chain-of-thought visible dans les outputs.** Raisonner via les thinking blocks Claude, retourner uniquement la décision finale.
31. **Posture éditoriale.** Aucun output agent ne contient "*je vous recommande*", "*vous gagnerez*", "*dans votre cas vous devriez*". Test automatisé (seam 2) sur prompts types.

---

## Tests

32. **pytest** côté Python, **vitest** côté TS. PAS Jest.
33. **pytest-httpx** pour mocker les SaaS externes au niveau HTTP (Pappers, Stripe, Postmark, AR24, Anthropic, Langfuse). Aucun mock de dépendance interne.
34. **conftest.py** centralise les fixtures : `db_session`, `test_user`, `dossier_factory`, `email_inbound_factory`, `agent_action_factory`.
35. **1 fichier de test par module testé**, nommage `test_<module>.py` / `<module>.test.ts`.
36. **Snapshot tests avec `syrupy`** pour le rendu de template (seam 3). Snapshots committés et reviewés.
37. **Pas de seuil de coverage hardcodé.** Mais : tout endpoint API ⇒ au moins 1 test seam 1, toute politique d'autonomie graduée ⇒ au moins 1 test seam 2.
38. **Pas de `sleep()` dans les tests.** Utiliser les hooks de fake-time (`freezegun` Python, `vi.useFakeTimers()` TS).

---

## Sécurité

39. **Secrets jamais en clair.** Pre-commit hook `gitleaks` obligatoire. Secrets stockés dans Vercel/Fly secrets et Supabase Vault.
40. **Validation cryptographique des webhooks** systématique : signature Stripe, signature Postmark, signature AR24. Test : un webhook sans signature retourne 401.
41. **RLS Supabase activée sur toutes les tables avec user data.** Testée explicitement (test seam 1 : User A ne voit jamais les données de User B).
42. **Sanitisation user input avant LLM.** Échapper les caractères de templating (`{{`, `}}`), détecter les patterns d'injection prompt simples (mention "ignore previous", "act as", etc.) et flag pour review.
43. **CSP strict** côté front, HSTS, HTTPS-only.
44. **Pas de PII en clair dans les logs ni dans Langfuse.** Hash / redact les noms propres, emails, SIRET avant envoi.

---

## Git / PR

45. **Branche par issue** : `feat/<n>-<slug>` ou `fix/<n>-<slug>` ou `chore/<slug>`.
46. **Conventional Commits** : `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`, `perf:`. Scope facultatif : `feat(agent):`, `fix(api):`.
47. **PR template** (`.github/pull_request_template.md`) :
    - Issue liée
    - Acceptance criteria cochés
    - Tests verts (CI green)
    - Screenshot UI si applicable
    - ADR mis à jour ou créé si décision structurante
48. **`main` protégée** (branch protection rule), merge via PR. Même en solo : c'est la checklist forcée.
49. **Pas de squash automatique.** Garder l'historique des commits significatifs (mais squash les `wip`, `fix typo`, etc.).
50. **Pas de force-push sur `main`.** Jamais.

---

## ADR (Architecture Decision Records)

Toute décision qui touche : la stack, l'archi monorepo, le modèle de données central (`Dossier`, `Document`, `AgentAction`), la posture d'agent, le pricing, la conformité, la sécurité ⇒ écrire un ADR avant ou avec le PR.

Format Michael Nygard, numérotation séquentielle dans `docs/adr/`.

Pour modifier une décision existante : nouvel ADR avec status `Supersedes ADR-XXX`, et l'ancien ADR passe à `Superseded by ADR-YYY`.
