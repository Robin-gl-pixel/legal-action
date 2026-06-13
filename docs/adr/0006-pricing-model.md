# ADR-006 — Pricing model

## Status

Accepted (2026-06-13)

## Context

Cible MVP : particuliers français en litige télécom. Coût variable estimé par dossier : 3-6 € (LRE 2-4 € + LLM 0,5-1,5 € + Pappers 0,1-0,3 €).

Modèles candidats analysés : pay-per-case (demanderjustice), abonnement annuel (Justice.cool), freemium, no-win-no-fee (AirHelp), hybride success-fee léger, apport d'affaires avocat.

## Decision

**Combo abo + à l'acte punitif + apport avocat** :

1. **Abonnement "Protection Litige Télécom" — 39 €/an** (par défaut)
   - Accès illimité à l'agent et au suivi.
   - 4 LRE incluses par an (quota).
   - Au-delà du quota : surcoût LRE à 5 € l'envoi pour les abonnés.

2. **Option à l'acte pour non-abonnés — 19 € + 10 % du recouvrement plafonné à 49 €**
   - Délibérément moins attractif que l'abo (pousse à l'abo dès la 2e MeD potentielle).
   - Capture les sceptiques sans tuer le modèle principal.

3. **Apport avocat — 150-300 € par dossier qualifié**
   - Pour cas hors-périmètre (montant > 5 000 €, complexité juridique, sensibilité).
   - Renvoi vers un réseau d'avocats partenaires.
   - Revenu B2B propre, marge nette.

### Gating technique
- L'envoi de la mise en demeure (slice #9) vérifie :
  - Abonnement actif avec quota disponible → décrément + autorisation.
  - Sinon paiement à l'acte 19 € requis (Stripe Checkout).
- Le quota se reset à chaque période annuelle via webhook Stripe `customer.subscription.updated`.

## Consequences

**Positives**
- **Cashflow d'avance** : 39 € encaissés au signup, marge brute ~50% sur 4 dossiers/abonné/an.
- **LTV/CAC sain** : abo renouvelable → 15-20 € de CAC absorbable sur 2 ans.
- **Pitch marketing fort** : *"39 €/an, ton avocat IA pour tes litiges télécom"* > *"30 € la lettre"*.
- **Apport avocat** = diversification + positionnement "porte d'entrée du système juridique".
- **À l'acte rend l'abo évident** : pas un vrai pricing alternatif, un tarif punitif qui pousse à la conversion.

**Négatives**
- Perception "je paye pour rien si pas de litige" pour les non-actifs. Mitigation : marketing axé "assurance / protection".
- Cas litige non-monétaire (résiliation pure) → success-fee à l'acte = 0 sur le 10%, seul le 19 € capture la valeur.
- Si un power user fait 5+ dossiers/an : surcoût LRE le rend non-rentable, à monitorer.

**Alternatives écartées**
- Pure pay-per-case : modèle transactionnel, pas de rétention, CAC par dossier élevé.
- Pure no-win-no-fee : cashflow douloureux, ne marche pas pour litiges non-monétaires.
- Freemium pur : cannibalisation, attire les trolls de litiges non-actionnables.

Voir aussi : [ADR-005](0005-architecture-mail.md) pour le coût LRE.
