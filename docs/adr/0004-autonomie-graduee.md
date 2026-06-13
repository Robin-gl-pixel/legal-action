# ADR-004 — Autonomie graduée de l'agent

## Status

Accepted (2026-06-13)

## Context

L'utilisateur attend de la valeur "agentique" : un agent qui prend le dossier en charge sans qu'il ait à valider chaque micro-action. Mais :
- Une action mal envoyée au nom du user peut **détruire sa position juridique** (mise en demeure aux formules maladroites, accord transactionnel précipité, désistement).
- Une autonomie totale est **angoissante** au démarrage (perception : "l'IA agit sans moi").
- Un workflow "valider chaque action" est **insupportable** à l'usage (10 clics par dossier).

## Decision

Politique d'**autonomie graduée** appliquée à toute `agent_action` :

### Actions à FORT enjeu — `requires_validation = true`
- Envoi initial de la **mise en demeure**.
- **Saisine du médiateur**.
- **Accord transactionnel** (acceptation d'une offre adverse).
- **Désistement / abandon** du dossier.
- Toute réponse à un mail classifié `refus` ou `acceptation` par la partie adverse.

### Actions à FAIBLE enjeu — `requires_validation = false`, exécution **différée 24h**
- Accusés de réception.
- Réponses standard à des demandes d'info simple.
- Relances automatiques (J+15 sans réponse).

Pour les actions différées, l'utilisateur peut **modifier / rejeter / valider immédiatement** pendant les 24h via un encart visible sur la page dossier.

### Posture éditoriale (CONTRAINTE TRANSVERSE — voir aussi CLAUDE.md §31)

Aucun output agent ne contient :
- "*je vous recommande*"
- "*vous gagnerez / avez de fortes chances*"
- "*dans votre cas, vous devriez*"
- "*votre situation est X*"

Formulations autorisées : "*voici un modèle adapté aux faits que vous avez déclarés*", "*l'article L… prévoit que…*" (information juridique générique).

### Garde-fous techniques
- Sortie structurée (JSON schema) pour chaque décision d'agent — pas de free-text quand on attend une décision.
- Test seam 2 obligatoire pour chaque type d'`agent_action`.
- Disclaimers systématiquement injectés dans les system prompts.

## Consequences

**Positives**
- Expérience "magique" sans risque catastrophique.
- Construction de la confiance progressive — un user peut migrer vers une autonomie plus poussée dans une v2 si métriques OK.
- Posture défensive claire vs monopole avocat (cf. [ADR-003](0003-templates-juridiques.md)).

**Négatives**
- Latence perçue sur les actions à faible enjeu (24h différé) — atténuable en raccourcissant à 4h si user pressé, à arbitrer en v1.5.
- Complexité du schema `agent_action` (état machine validation/exécution).

**Alternatives écartées**
- Validation systématique (co-pilote pur) : tue la promesse "agentique" et la valeur perçue.
- Autonomie totale après brief : trop risqué (un faux pas en mise en demeure grève la prescription, l'audience, la crédibilité).

Voir aussi : [ADR-003](0003-templates-juridiques.md) (templates juridiques figés qui supportent la posture).
