# Identité visuelle — décisions

Document de référence des choix d'identité de Reclam. Pour le menu de propositions ayant mené à ces choix, voir [`proposals.md`](./proposals.md).

---

## Nom produit

**Reclam**

Contraction de « réclamation ». Court (2 syllabes), tranchant, action implicite (récupérer / réclamer). Sonne moderne sans être tech-bro. Mémorisable FR/EN.

Risques à monitorer :
- Confusion possible avec « réclame » (publicité, vieilli mais résiduel chez +40 ans). Mitigation : ton et baseline orientés action / récupération, jamais publicitaire.
- Variantes orthographiques (Reclaim / Réclam / Reclam). **Forme canonique fixée : `Reclam`**, sans accent, capitale au début.

Domaines à vérifier en priorité : `reclam.app`, `getreclam.com`, `reclam.fr`.

---

## Palette

**Palette 2 — Indigo confiance + jaune signal.**

| Rôle | Hex | Token |
|---|---|---|
| Primaire (CTA) | `#FFD23F` | `primary` |
| Sur primaire (texte sur CTA) | `#1E1B4B` | `primary-foreground` |
| Accent / sérieux | `#1E1B4B` | `accent` |
| Sur accent | `#FAFAF9` | `accent-foreground` |
| Fond clair | `#FAFAF9` | `background` |
| Texte principal | `#0F0E2E` | `foreground` |
| Texte secondaire | `#6B6A88` | `muted-foreground` |
| Surface secondaire | `#F4F4F2` | `muted` |
| Succès / validation | `#10B981` | `success` |
| Bordure légère | `#E5E5E0` | `border` |

Règles d'usage :
- Le **jaune signal** est strictement réservé aux CTA et accents ponctuels. Jamais en aplat large (vire post-it / warning).
- L'**indigo profond** porte la hiérarchie sérieuse (headers, titres, navigation, texte principal en alternative).
- Le **fond crème** (`#FAFAF9`) remplace le blanc pur — chaleur sans poussiéreux.
- Pour le contraste, vérifier WCAG AA : jaune `#FFD23F` sur indigo `#1E1B4B` = contraste ≥ 7:1 (AAA).

---

## Typographie

**General Sans (Fontshare) — titres et corps.**

- Famille unique : [General Sans](https://www.fontshare.com/fonts/general-sans).
- Poids utilisés : 400 (corps), 500 (emphase), 600 (titres secondaires), 700 (titres principaux).
- Italique : 400 et 500 pour citations / mises en avant ponctuelles.

Pourquoi le single-family : simplicité de stack, perf (1 chargement), juste assez de personnalité (`a`, `g`, `t` distinctifs) pour ne pas être Inter.

Risque licence : Fontshare gratuit, vérifier la licence avant lancement commercial. Si bloquant, fallback vers Inter Tight + Inter (combo 1).

Stack CSS (fallback en cas de chargement défaillant) :
```
font-family: "General Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
```

---

## Logo

**Concept 1 — Wordmark pur avec détail typographique.**

Le nom du produit en minuscules, dans General Sans poids 600-700, avec **un détail typographique sur le `a` de Reclam** (crochet inspiré du sigle de réclamation / pied-de-mouche éditorial).

```
   r e c l a m
            ↑
       crochet
```

Le détail isolé sert d'icône (favicon, app icon, avatar mail sortant). Pour la première version code (sans le détail custom dessiné en Figma), le wordmark reste en General Sans 700, tracking serré.

À produire en Figma (slice #3 — non encore livré) :
- SVG wordmark final avec détail sur le `a`.
- Variantes : sur fond clair, sur fond indigo, monochrome.
- Favicon dérivé du détail (32×32, 16×16, masque iOS).

---

## Ton éditorial — règles + exemples

Principes (rappel) :
- **Direct** : phrases courtes, pas de remplissage.
- **Chaleureux** : tutoiement.
- **Factuel** : ce qui se passe, ce qui va se passer, ce qu'on attend.
- **Jamais condescendant ni infantilisant** : pas de « bravo », pas de « tu es presque arrivé ».
- **Pas de jargon non-expliqué** : si « mise en demeure », on explique en une phrase.
- **Posture anti-monopole avocat** ([ADR-004](../docs/adr/0004-autonomie-graduee.md) §31) : jamais « je vous recommande », « vous gagnerez », « dans votre cas vous devriez ».

Exemples calés sur les moments clés (issus de `proposals.md`, repris ici comme référence) :

### Onboarding — après upload des pièces
> Bien. On a tes factures et ta dernière réponse SFR. Trois infos manquent pour rédiger la lettre : la date de ta demande initiale, le montant que tu réclames, et si tu as déjà essayé un autre canal. Ça prend deux minutes.

### Validation MeD avant envoi
> Voici ta mise en demeure. Le fondement juridique a été figé par un avocat — il ne bougera pas. Le récit des faits reprend ce que tu as déclaré. Relis, modifie ce que tu veux, et clique sur Envoyer quand tu es prêt. Une fois partie, elle a la même valeur qu'une lettre recommandée papier.

### Attente d'une réponse adverse — J+10
> Ta lettre est arrivée chez SFR le 4 juin. Ils ont 15 jours pour répondre, soit jusqu'au 19 juin. Pas besoin de check l'app — si quelque chose arrive, on te prévient par mail. Si on n'a rien le 20 au matin, on relance automatiquement.

---

## Reste à produire (hors périmètre de cette PR)

- [ ] Logo SVG final avec le détail sur le `a` (Figma + export).
- [ ] Favicon + app icons iOS/Android dérivés du détail.
- [ ] Mocks haute-fi des 6 flows uniques (cf. [issue #3](https://github.com/Robin-gl-pixel/legal-action/issues/3)).
- [ ] Auto-hébergement de General Sans (perf + privacy) — actuellement via CDN Fontshare.
- [ ] Vérification licence Fontshare pour usage commercial.
- [ ] Dark mode (différé v1.5 — pas dans le scope MVP).
