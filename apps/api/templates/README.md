# Templates juridiques

Templates YAML versionnes utilises par le pipeline de generation des mises en demeure. Voir `docs/adr/0003-templates-juridiques.md` pour la decision d'architecture.

## Structure d'un template

Chaque template est un fichier `.yaml` situe dans ce repertoire (`apps/api/templates/`). Il se compose de deux parties separees par les marqueurs `---` :

1. Un **frontmatter** YAML decrivant les metadonnees.
2. Un **corps** decoupe en sections nommees, chaque section etant introduite par une ligne `@section <nom>`.

Exemple minimaliste :

```yaml
---
id: exemple-cas-operateur-v1
vertical: telecom
cas_type: resiliation_refusee
operateur: free
fondement: "Article L224-33 du code de la consommation"
avocat_validateur: "Nom Prenom (barreau de Paris)"
version: 1.0.0
delai_jours: 15
slots_requis:
  - identite_expediteur
  - faits_narration
sections_figees:
  - fondement
  - formule_fin
---
@section objet
Objet : Mise en demeure - {{identite_expediteur}}

@section faits
{{faits_narration}}

@section fondement
Aux termes de l'article L224-33 du code de la consommation...

@section pretentions
Je vous mets en demeure de prendre acte de la resiliation.

@section formule_fin
Je vous prie d'agreer mes salutations distinguees.
```

### Champs du frontmatter

| Champ                | Type        | Notes                                                            |
|----------------------|-------------|------------------------------------------------------------------|
| `id`                 | str         | kebab-case, unique, doit correspondre au nom de fichier.         |
| `vertical`           | str         | Domaine metier (ex : `telecom`).                                 |
| `cas_type`           | enum        | Valeur de `CasType` (`resiliation_refusee`, ...).                |
| `operateur`          | enum        | Valeur de `Operateur` (`free`, `sfr`, `orange`, `bouygues`).     |
| `fondement`          | str         | Resume des articles cites.                                       |
| `avocat_validateur`  | str         | Nom de l'avocat (ou pote droit) qui a valide le contenu.         |
| `version`            | semver      | `MAJOR.MINOR.PATCH`.                                             |
| `delai_jours`        | int > 0     | Delai donne au destinataire.                                     |
| `slots_requis`       | list[str]   | Slots que l'appelant DOIT fournir au rendu.                      |
| `sections_figees`    | list[str]   | Sections ou aucun slot `{{...}}` n'est autorise.                 |

### Corps

- Chaque section est introduite par `@section <nom>` sur une ligne seule.
- Sections attendues : `objet`, `faits`, `fondement`, `pretentions`, `formule_fin`.
- Les slots utilisent la syntaxe `{{slot_name}}` (snake_case).

## Regle des sections figees

Les sections listees dans `sections_figees` constituent la **defense anti-hallucination** decrite par l'ADR-003. Typiquement :

- `fondement` : citations d'articles, formules legales.
- `formule_fin` : disclaimer anti-monopole avocat + mention IA.

Aucun slot `{{...}}` n'est tolere dans ces sections. Un test automatise (`tests/test_template_renderer.py`) refuse tout template qui violerait cette regle.

## Workflow de validation par avocat

1. Un nouveau template est cree sur une branche `feat/<n>-template-<slug>`.
2. Le frontmatter porte un `avocat_validateur` provisoire (`"A valider par le pote droit"` en bootstrap).
3. La PR est ouverte en **draft** : la review juridique est un prerequis bloquant.
4. L'avocat (ou le pote droit en v0) relit, propose des amendements via commits sur la branche.
5. Une fois valide, l'avocat signe en remplacant `avocat_validateur` par son nom complet.
6. La PR est passee en Ready for review, puis mergee.
7. Toute modification ulterieure d'un template impose une bump de `version` (semver) et une nouvelle revue.

## Ajouter un nouveau template

1. Choisir un id en kebab-case (`<cas-type>-<operateur>-v<n>`), creer le fichier `apps/api/templates/<id>.yaml`.
2. Renseigner le frontmatter (cas_type et operateur doivent exister dans `legal_action_api.domaine.enums`).
3. Rediger les sections en s'appuyant sur les articles cites dans `fondement`.
4. Lister tous les slots utilises dans le corps dans `slots_requis`.
5. Lister les sections sans slots dans `sections_figees`.
6. Lancer `uv run pytest` : le test garde-fou refuse tout template invalide.
7. Ouvrir la PR en draft, demander la validation juridique.
