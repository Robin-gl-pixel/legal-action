# Spec — Saisine du Médiateur des Communications Électroniques (MCE)

## Statut

**Draft — étude amont issue #14.** Implémentation effective prévue après merge des slices #5 (modèle `Dossier`), #10 (envoi LRE = preuve réclamation écrite), #11 (alias mail inbound = preuves d'échanges) et #13 (relances cron). Cette spec sert de référence à l'agent qui pré-remplira la saisine.

## 1. Sources consultées

Toutes consultées le **2026-06-14** :

- [mediation-telecom.org — Saisir le Médiateur](https://www.mediation-telecom.org/saisir-le-mediateur)
- [mediation-telecom.org — Constituer son dossier](https://www.mediation-telecom.org/publications/fiches-pratiques/constituer-son-dossier-pour-recourir-a-la-mediation-des-communications-electroniques)
- [mediation-telecom.org — Le Médiateur (statut, cadre)](https://www.mediation-telecom.org/mediateur)
- [Arcep — Résoudre un litige avec son opérateur (particuliers)](https://www.arcep.fr/mes-demarches-et-services/consommateurs/fiches-pratiques/particuliers-comment-resoudre-un-litige-avec-votre-operateur.html)
- [economie.gouv.fr — Quel médiateur de la consommation contacter](https://www.economie.gouv.fr/cedef/mediateur-consommation-litige)

## 2. Identité et cadre réglementaire

- **Médiatrice en exercice** : Valérie Alvarez, mandat renouvelé en mai 2025 pour 3 ans (échéance ≈ 2028).
- **Statut** : médiatrice de la consommation sectorielle indépendante, agréée sur la liste française et au registre UE des médiateurs (pour litiges transfrontaliers).
- **Adresse de filing courrier** : `CS 30342 – 94257 GENTILLY Cedex`.
- **Cadre juridique** :
  - Ordonnance n° 2011-1012 du 24 août 2011 (rend la médiation obligatoire pour les pros des comm. électroniques).
  - Directive UE 2013/11/UE sur le règlement extrajudiciaire des litiges de consommation.
  - Code de la consommation, art. L613-1 à L613-3 et L612-1 à L612-5 (et règlement intérieur du MCE).
- **Surveillance** : Commission d'Évaluation et de Contrôle de la Médiation (CECM).
- **Coût** : gratuit pour le consommateur.
- **Avis** : non contraignant et **confidentiel** — *« ne peuvent être produits en justice, sauf accord exprès des deux parties »*. Implication pour Reclam : ne pas inciter l'utilisateur à compter sur l'avis MCE comme pièce d'un futur procès, sauf accord des parties.

## 3. Périmètre de compétence

Couvre les litiges B2C entre un consommateur et :
- Opérateurs de télécommunications fixes / mobiles / internet / fibre.
- Services de communications électroniques (surveillance, speed tests, annuaires, TV payante).
- Hébergeurs web.

**Couverture des 4 opérateurs ciblés par Reclam v1** : Free, SFR, Orange, Bouygues — tous adhérents par effet de l'ordonnance 2011-1012 (médiation obligatoire). À confirmer en checkant la page « membres » du MCE au moment de l'implémentation.

**Exclu** : litiges B2B (entreprises), litiges déjà portés devant un juge ou un autre médiateur, litiges manifestement infondés ou abusifs (art. L612-2 c. conso).

## 4. Conditions de recevabilité

Conditions cumulatives :

| Condition | Détail | Champ technique côté Reclam |
|---|---|---|
| **Particulier** | Pas un client professionnel ni une entreprise | `dossier.owner` est un user FR, non-pro |
| **Adhérent** | L'opérateur doit être adhérent (cas garanti pour Free/SFR/Orange/Bouygues) | enum `operateur` ∈ `{free, sfr, orange, bouygues}` |
| **Réclamation préalable au service clients** | Contact écrit, sans satisfaction sous 1 mois | `dossier.envoi_lre.delivered_at` + absence de classification `acceptation` sur emails inbound |
| **Saisine du service consommateurs après le SC** | Spécifique télécom : étape supplémentaire entre SC et médiateur | TODO : modéliser un événement `service_consommateurs_saisi` côté `dossier` |
| **Délai 1 mois après le service consommateurs** | Sans satisfaction | Calcul depuis le 2e envoi |
| **Délai max 1 an** | Saisine MCE dans l'année suivant le 1er contact écrit | Vérif côté agent avant proposition de saisine |
| **Pas de procédure judiciaire en cours** | Auto-déclaratif | Checkbox dans le flow de validation HITL |
| **Pas d'autre médiation en cours** | Auto-déclaratif | Idem |

⚠ **Précision capitale pour Reclam** : la procédure télécom impose **deux étapes** chez l'opérateur avant le médiateur (service clients → service consommateurs), pas une seule comme dans la médiation conso générique. Notre flow #10 (envoi LRE) couvre l'étape 1. Il faut un mécanisme #12/#13 qui déclenche une **deuxième relance ciblant le service consommateurs** avant de proposer la saisine MCE.

## 5. Format de soumission

Deux canaux possibles, à confirmer définitivement à l'implémentation :

| Canal | Description | Fiabilité dispo officielle |
|---|---|---|
| **Formulaire en ligne** (« quizz ») | Création d'un dossier sur `mediation-telecom.org/quizz` (URL exacte à confirmer car redirection / formulaire dynamique). Étape par étape, joindre les pièces en upload. | Confirmé par site officiel mais URL pas figée |
| **Courrier postal** | Adresse `CS 30342 – 94257 GENTILLY Cedex`. Inclut le formulaire papier + toutes les pièces. | Confirmé, fallback robuste |
| **API publique** | **Pas d'API publique documentée à ce jour.** | Aucune source ne mentionne d'API |
| **Email direct** | **Pas mentionné comme canal de saisine.** | À ne pas utiliser |

## 6. Champs requis et pièces justificatives

### 6.1 Champs de la saisine (en ligne ou papier)

| Champ MCE | Type | Provenance dans le modèle `Dossier` Reclam |
|---|---|---|
| Identité du saisissant (nom, prénom, date de naissance, adresse, téléphone, email) | obligatoire | `user_profile` + `dossier.slots.identite_expediteur` + `dossier.slots.adresse_expediteur` (slice #5) |
| Identité de l'opérateur visé | obligatoire | `dossier.destinataire` enrichi via Pappers (slice #7) |
| Catégorie de litige (mobile / internet / fibre / fixe) | obligatoire | À DÉRIVER de `cas_type` + métadonnée additionnelle ; possibilité : étendre `dossier` avec un champ `sous_categorie_telecom` |
| Numéro de client / référence de ligne / numéro de contrat | obligatoire | `dossier.slots.reference_contrat` (déjà dans le template #6) |
| Dates de contact avec le service clients | obligatoire | `dossier.envoi_lre.sent_at` + `dossier.envoi_lre.delivered_at` |
| Date de saisine du service consommateurs | obligatoire (télécom) | **GAP** — à modéliser comme un envoi LRE supplémentaire |
| Synthèse du litige (chronologie) | obligatoire | `dossier.slots.faits_narration` + auto-géné par l'agent depuis la timeline |
| Actions de l'opérateur (réponses, refus, silence) | obligatoire | Dérivé des `email_message` classifiés + délais sans réponse |
| Solution demandée | obligatoire | `dossier.slots.pretentions_action` (déjà dans le template #6) |
| Montants contestés / préjudice chiffré | si applicable | `dossier.slots.montants_contestes` |
| Déclaration d'absence de procédure judiciaire et d'autre médiation | obligatoire | Checkbox côté validation HITL (slice #14 effective) |
| Date du litige (≤ 1 an) | implicite | Calcul depuis `dossier.envoi_lre.sent_at` |

### 6.2 Pièces justificatives obligatoires

- ✅ Copie de la réclamation écrite envoyée à l'opérateur → **on a** : PDF de la mise en demeure générée + AR AR24.
- ✅ Preuves des échanges avec le service clients (chats, emails, formulaires) → **on a** : `email_message` inbound + threads dans Postmark.
- ✅ Facture d'achat ou d'abonnement → **dans `dossier.pieces`** (uploadées par l'user en slice #6).
- ✅ Email de confirmation de commande (vente à distance) → idem.
- ✅ Description de l'offre / contrat / CGV applicables → idem.
- ✅ Détail des factures contestées → idem.
- ✅ Preuves de préjudice (frais d'envoi, photos, attestations) → idem.

### 6.3 Pièces complémentaires selon sous-cas

| Sous-cas | Pièces additionnelles |
|---|---|
| Couverture mobile | Carte de couverture Arcep (capture), articles de presse, attestation du maire |
| Itinérance / dépassement forfait | Facture détaillée + capture SMS d'alerte / tarification |
| Restitution mobile loué | Preuve d'envoi, n° de suivi, AR de livraison, photos d'état |
| Résiliation pour motif légitime | Justificatif (licenciement, surendettement, déménagement) |
| Panne mobile | Ticket d'achat, bon de dépôt SAV, rapports techniciens, photos pré-réparation |
| Prélèvements contestés | Relevé bancaire (avec lignes hors sujet caviardées), attestation bancaire |
| Internet / fibre — connexion | Dates de contact support technique, rapports techniciens, speed tests |
| Dégâts installation fibre | Photos, devis de réparation, rapports d'intervention |

Cohérent avec nos 5 cas types Reclam — toutes ces pièces sont déjà uploadables via le flow #6/#7.

## 7. Procédure et délais

```
J0    Réclamation écrite → service clients de l'opérateur (= envoi LRE Reclam)
J0+1m Si pas de satisfaction → saisine écrite service consommateurs
J0+2m Si pas de satisfaction → saisine MCE recevable
J0+2m+ Le MCE accuse réception et statue sur la recevabilité
       (durée non-documentée précisément — TODO)
J?+90j Avis du MCE max (prolongeable si litige complexe)
```

L'avis du MCE est :
- **Non contraignant** pour l'opérateur (mais en pratique souvent suivi par les opérateurs adhérents — argument de réputation).
- **Confidentiel** par défaut, non opposable en justice sauf accord exprès.

## 8. Recommandation d'implémentation

### Option retenue : **B — Génération PDF pré-rempli + envoi par courrier (AR24 ou postal classique)**

Justification :

1. **Pas d'API publique.** L'option A (agent Playwright qui remplit le formulaire en ligne) est techniquement faisable mais **fragile** : un changement de structure du « quizz » MCE casse silencieusement la prod. Coût de monitoring élevé.
2. **Le courrier est explicitement supporté** (`CS 30342 – 94257 GENTILLY Cedex`) et c'est la voie la moins susceptible de changer.
3. **AR24 est déjà intégré** pour les mises en demeure (slice #9). Réutilisation directe : envoi de la saisine PDF en LRE.
4. **WeasyPrint est déjà en stack** (cf. CLAUDE.md et bootstrap) — pas de nouvelle dépendance.
5. **Coût** ≈ 2-4 € par saisine (LRE), absorbé dans le ticket abo (4 LRE/an) ou un add-on à voir.

Architecture d'impl future :

```
[Dossier en mediation] → agent_action `saisine_mediateur` (requires_validation=true)
                       → assemblage d'un payload `saisine_mce` à partir du Dossier
                       → rendu template YAML `saisine-mce-v1.yaml` (similaire à slice #6)
                       → WeasyPrint → PDF
                       → user voit la saisine, modifie/valide
                       → envoi LRE via AR24 vers CS 30342 - 94257 GENTILLY Cedex
                       → `dossier.status = mediation`
                       → poll AR24 webhook → `saisine_mediateur.submitted_at`
                       → timeline dossier mise à jour
```

Mode dégradé (option C) : si AR24 indisponible, génération PDF téléchargeable + instructions pour envoi postal par l'utilisateur. À garder en fallback explicite.

### Options écartées

- **Option A — Playwright headless sur le formulaire web** : fragilité, coût de maintenance, risque de détection anti-bot, pas d'audit trail propre.
- **Option D — Email direct au MCE** : pas un canal officiel de saisine, pas de garantie de prise en compte.

## 9. Posture utilisateur & autonomie graduée

- **`requires_validation = true`** (cf. ADR-004) : la saisine MCE est une **action à fort enjeu**. Toujours.
- L'utilisateur **doit voir** la saisine complète (PDF) et la **valider explicitement** avant envoi.
- Au moment de la validation, deux **checkboxes auto-déclaratives** obligatoires :
  - *« Je n'ai engagé aucune action en justice pour ce litige. »*
  - *« Je n'ai saisi aucun autre médiateur pour ce litige. »*
- **Disclaimer IA** rappelé (cf. ADR-004 §31, slice #17).
- **Pas de « tu vas gagner »** dans les outputs. Formulation type : *« Voici ta saisine. L'avis du Médiateur sera rendu sous 90 jours. Il n'est pas contraignant mais souvent suivi par les opérateurs adhérents. »*

## 10. Modèle de données proposé

Confirmation et ajustements du schéma esquissé dans l'issue #14 :

```python
# enums (à ajouter dans apps/api/src/legal_action_api/domaine/enums.py)
class Mediateur(StrEnum):
    COMM_ELECTRONIQUES = "comm_electroniques"
    # extensible : ENERGIE, BANQUE, etc. dans les futurs verticaux

class SaisineStatus(StrEnum):
    PROPOSEE = "proposee"
    VALIDEE_USER = "validee_user"
    ENVOYEE = "envoyee"
    ACCUSE_RECEPTION = "accuse_reception"
    RECEVABLE = "recevable"
    IRRECEVABLE = "irrecevable"
    AVIS_RENDU = "avis_rendu"
    CLOTUREE_AVEC_ACCORD = "cloturee_avec_accord"
    CLOTUREE_SANS_ACCORD = "cloturee_sans_accord"

# table saisine_mediateur
- id (uuid)
- dossier_id (fk dossier, on delete cascade)
- mediateur (enum Mediateur)
- template_id + template_version (audit trail)
- payload_slots (jsonb — snapshot des slots utilisés)
- pdf_storage_path (str)
- envoi_lre_id (fk envoi_lre, on delete restrict)  # réutilise la même infra que les MeD
- declaration_aucune_action_judiciaire (bool, NOT NULL)
- declaration_aucun_autre_mediateur (bool, NOT NULL)
- mediateur_dossier_ref (str, nullable — référence renvoyée par le MCE)
- status (enum SaisineStatus)
- proposed_at, validated_at, submitted_at (timestamps)
- recevable_at, avis_rendu_at, cloture_at (timestamps, nullables)
```

**RLS Supabase** : un user ne voit que les saisines de ses propres dossiers (jointure via `dossier.owner_id`).

## 11. Gaps identifiés (à fixer avant ou pendant l'impl)

1. **Modéliser le « service consommateurs » télécom** comme une étape séparée — pas juste un 2e envoi LRE. Impact sur slice #12 (classification) et #13 (relances cron). À discuter quand on attaque ces slices.
2. **Champ `sous_categorie_telecom`** (mobile / fixe / internet / fibre) à ajouter sur `dossier` — petit alter table.
3. **Confirmer l'URL du formulaire en ligne** au moment de l'impl (« /quizz » pas certaine).
4. **Confirmer la liste exhaustive des membres adhérents** au moment de l'impl (Free, SFR, Orange, Bouygues sont sûrs, mais MVNO ?).
5. **Décider si on génère la saisine en français standard** ou si on inclut un **résumé exécutif** en début pour le médiateur. Recommandation : ajouter une section `synthese` figée en début de PDF.
6. **Tracking du retour du MCE** : le MCE ne propose probablement pas de webhook. Choix : (a) saisie manuelle du `mediateur_dossier_ref` par le user à la réception de l'AR papier, (b) auto-détection si l'AR est numérique. À étudier au moment de l'impl.
7. **Délai 1 an : compteur** côté agent — si on s'approche de la fin de l'année post-réclamation, escalader proactivement vers la saisine.

## 12. TODO ouverts

- [ ] Confirmer l'URL exacte du formulaire en ligne (« quizz ») et la possibilité d'un dépôt PDF en lieu et place du remplissage interactif.
- [ ] Vérifier la liste à jour des membres adhérents (page « Membres » du MCE).
- [ ] Étudier le **règlement intérieur** détaillé du MCE pour confirmer les sous-cas de saisine et la procédure exacte.
- [ ] Définir le wording exact des deux déclarations auto-déclaratives obligatoires (vérifier la formulation côté MCE).
- [ ] Définir la structure du template `saisine-mce-v1.yaml` (sur le modèle de #6 — sections `objet`, `identite`, `chronologie`, `pretentions`, `declarations`, `formule_fin`).
- [ ] Décider si Reclam supporte aussi le dépôt postal classique en mode dégradé (sans AR24) — coût plus bas mais sans tracking automatique.
