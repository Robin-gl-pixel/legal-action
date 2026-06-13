# ADR-003 — Templates juridiques YAML avec bloc fondement figé

## Status

Accepted (2026-06-13)

## Context

L'app rédige des mises en demeure au nom de l'utilisateur. Risques majeurs :
1. **Hallucination juridique** par le LLM (article inexistant, formule erronée) → mise en demeure ridiculisée, position juridique du user dégradée, réputation produit détruite.
2. **Conseil juridique personnalisé** (loi 71-1130 art. 54) potentiellement constitutif de monopole avocat.

Précédent : Cass. civ. 24 mars 2016 a validé l'assistance à la rédaction par site web tant que l'utilisateur reste maître du contenu (demanderjustice.com).

## Decision

Les mises en demeure sont générées à partir de **templates YAML versionnés en Git**, avec **bloc fondement juridique FIGÉ** par un avocat (ou pote droit en bootstrap v0, vrai avocat dès activité commerciale).

Structure :

```yaml
---
id: <slug>
vertical: telecom
cas_type: resiliation_refusee | prelevement_apres_resiliation | surfacturation | panne_longue_duree | frais_resiliation
operateur: free | sfr | orange | bouygues
fondement: <liste d'articles>
avocat_validateur: <nom>
version: <semver>
delai_jours: <int>
slots_requis: [...]
---
Objet : <slot ou figé>

<récit faits — slot LLM>

[BLOC FIGÉ FONDEMENT — JAMAIS altérable par LLM]
Aux termes de l'article L121-84-2 du code de la consommation...

Je vous mets en demeure de <slot prétention> dans un délai de {{delai_jours}} jours...
```

Règles strictes :
- Le **bloc fondement** est texte brut sans slot — un test (seam 3) vérifie qu'aucun `{{...}}` n'apparaît dedans.
- Les **slots LLM** ne couvrent que : récit des faits, ton, identité des parties, prétentions chiffrées, formules de politesse.
- Chaque template est **versionné** ; chaque mise en demeure générée stocke `template_id` + `version` + `slots_snapshot` (audit trail si litige user).
- Les templates vivent dans `apps/api/templates/`, modifiables uniquement via PR avec relecture avocat.
- Routing : à la fin de l'onboarding, classification LLM (Haiku) à sortie structurée sur enum fermée détermine `cas_type` + `operateur` → choix du template adéquat. Fallback règles déterministes.

## Consequences

**Positives**
- Hallucination juridique structurellement impossible sur les articles cités.
- Posture défensive vs monopole avocat solide (templates validés par avocat + assistance à la rédaction).
- Audit trail complet en cas de litige.
- Évolution juridique gérée par PR (révision trimestrielle).

**Négatives**
- Coût de production des templates (relecture avocat, v0 par pote droit).
- Rigidité : un cas atypique mal couvert par les templates demande développement (nouveau template) plutôt que adaptation libre.
- Maintenance : veille Légifrance + jurisprudence à industrialiser.

**Alternatives écartées**
- Génération LLM end-to-end avec garde-fous RAG sourcé : insuffisant — un LLM bien rappé peut quand même halluciner ou paraphraser un article.
- Review humaine systématique : tue la marge et le scaling.
- Templates non-juridiques (free-text avec disclaimers) : insuffisant pour la crédibilité légale d'une mise en demeure.

Voir aussi : [ADR-004](0004-autonomie-graduee.md) pour la politique d'autonomie de l'agent, qui s'appuie sur ces templates.
