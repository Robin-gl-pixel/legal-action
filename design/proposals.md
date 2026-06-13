# Identité visuelle — menu de choix

Document de travail. Trois propositions par dimension. Robin choisit, on dérive ensuite les tokens Tailwind dans un second temps.

Cible : particulier français 25-45 ans, irrité par son opérateur, pas juriste. Promesse : facilité, rapidité, sérieux juridique, prise en charge end-to-end. Pitch viral : *« L'IA qui te débarrasse de SFR en 5 minutes. »*

Tension d'équilibrage à garder en tête tout au long du document :
- Trop cabinet d'avocat (bleu marine + Garamond + balance de la justice) → on devient demanderjustice.com, ringard et payant.
- Trop fun startup (purple gradient + Inter + illustrations rondes) → on devient Justice.cool, perçu comme pas sérieux pour un litige juridique réel.

L'objectif : « calme et confiant ». Comme un assistant qui sait ce qu'il fait, te parle d'égal à égal, et ne te fait pas la leçon.

---

## 1. Nom produit — 3 propositions

### Option A — **Litige**

- **Domaine probable** : `litige.app` (probable libre), `litige.fr` (probablement pris en parking ou par un cabinet), `golitige.com`, `litige.io`.
- **Signification / ton** : appropriation frontale du mot du problème. C'est exactement ce que l'utilisateur tape dans Google.
- **Pourquoi ça marche** : SEO direct, un mot que la cible utilise déjà, intelligible par tout francophone, court (2 syllabes). S'inscrit naturellement dans le vocabulaire métier de l'ADR-007.
- **Risques** :
  - Trop générique — difficile de défendre une marque trop descriptive en INPI.
  - Connotation négative : on porte le mot du problème, pas de la solution. Risque de paraître « lourd » pour un produit dont la promesse est la légèreté.

### Option B — **Reclam**

- **Domaine probable** : `reclam.app` (très probable libre), `reclam.fr` (à vérifier, possiblement pris par site allemand), `getreclam.com`.
- **Signification / ton** : contraction de « réclamation ». Court, tranchant, légèrement anglo (sonne comme un verbe anglais : *to reclaim*). Côté « je récupère ce qui m'est dû ».
- **Pourquoi ça marche** : 2 syllabes, facile à prononcer FR/EN, action implicite (récupérer / réclamer), évoque la restitution sans être juridique. Sonne moderne sans être tech-bro.
- **Risques** :
  - Confusion possible avec « réclame » au sens publicitaire (vieilli mais résiduel chez les +40 ans).
  - Variantes orthographiques : Reclaim, Réclam, Reclam — à figer dès le départ.

### Option C — **Tildé**

- **Domaine probable** : `tilde.app` (probablement pris dans la dev sphere), `tilde.fr` (à creuser), `tildeapp.com`, `hellotilde.com`.
- **Signification / ton** : référence au signe `~` qui clôt, qui termine, qui « passe à autre chose ». Évoque la résolution propre d'un point en suspens. Sonore doux, presque scandinave.
- **Pourquoi ça marche** : très court (2 syllabes), distinctif, défensible en marque (mot non-descriptif), permet un logo iconique évident (le tilde lui-même). Ton apaisé qui contredit l'angoisse du litige.
- **Risques** :
  - Sens non-évident pour la cible — il faut un baseline systématique (« Tildé — tes litiges télécom, classés »).
  - `tilde` est très utilisé dans la communauté dev (`tildes.net`, opérateurs Unix), peu de risque côté grand public mais friction côté distinctivité tech.

---

## 2. Palettes — 3 propositions

Chaque palette donne : primaire (CTA, action), accent (sérieux/structure), neutrals, et selon, une couleur de succès/validation. Hex codes uniquement, pas de tokens. Les noms de couleurs sont indicatifs.

### Palette 1 — « Vert juridique calme »

| Rôle | Hex | Nom indicatif |
|---|---|---|
| Primaire (CTA) | `#0F7A5A` | Vert forêt profond |
| Accent (sérieux) | `#0B2545` | Bleu nuit |
| Fond clair | `#F7F5F0` | Crème papier |
| Texte principal | `#111827` | Gris encre |
| Texte secondaire | `#5B6470` | Gris ardoise |
| Succès / validation | `#1FAE83` | Vert clair |

- **Ton global** : sérieux moderne, légèrement éditorial. On évoque le droit (bleu nuit) sans tomber dans le marine corporate, et on apporte du vert qui rassure et différencie. Le fond crème casse le côté médical/SaaS du blanc pur.
- **Pourquoi ça marche pour la cible** : le vert n'est associé ni aux opérateurs télécom français (rouge SFR, blanc/rouge Free, orange Orange, bleu Bouygues) ni aux banques. Différenciation visuelle forte. Le crème évoque le papier juridique sans être passéiste. Posture « calme, professionnel, du côté du consommateur ».
- **Risque** : risque de glisser vers une vibe « écologie / produit bio » si le vert est trop saturé. Garder la saturation modérée.

### Palette 2 — « Indigo confiance, jaune action »

| Rôle | Hex | Nom indicatif |
|---|---|---|
| Primaire (CTA) | `#FFD23F` | Jaune signal |
| Accent (sérieux) | `#1E1B4B` | Indigo profond |
| Fond clair | `#FAFAF9` | Blanc cassé chaud |
| Texte principal | `#0F0E2E` | Indigo encre |
| Texte secondaire | `#6B6A88` | Lavande grise |
| Succès / validation | `#10B981` | Émeraude |

- **Ton global** : amical confiant, énergie contenue. L'indigo profond apporte le sérieux quasi-académique d'un livre de droit ; le jaune signal sur les CTA donne le punch « passe à l'action ».
- **Pourquoi ça marche pour la cible** : le jaune est très peu utilisé en legaltech FR — démarcation forte. L'indigo est suffisamment sombre pour éviter le côté startup tech-bro du violet vibrant. Le contraste jaune/indigo est fort en accessibilité (WCAG AA atteignable sur fond blanc).
- **Risque** : le jaune peut virer post-it ou warning si mal dosé. À réserver strictement aux CTA et accents ponctuels, jamais en aplat large.

### Palette 3 — « Noir & corail minimaliste »

| Rôle | Hex | Nom indicatif |
|---|---|---|
| Primaire (CTA) | `#FF5A4E` | Corail vif |
| Accent (sérieux) | `#0A0A0A` | Noir presque pur |
| Fond clair | `#FFFFFF` | Blanc |
| Texte principal | `#0A0A0A` | Noir |
| Texte secondaire | `#737373` | Gris neutre |
| Surface secondaire | `#F4F4F4` | Gris papier |
| Succès / validation | `#16A34A` | Vert net |

- **Ton global** : minimaliste premium, vibe Linear / Vercel / Notion. Très contemporain, design-forward.
- **Pourquoi ça marche pour la cible** : démarcation extrême vs concurrents legaltech FR (tous au bleu corpo). Le corail rappelle l'urgence et l'action sans la connotation agressive du rouge pur. La 25-35 mobile-first reconnaît immédiatement ce langage visuel comme « produit moderne sérieux ».
- **Risque** : peut paraître « trop tech » ou « trop SF startup » pour la 40-45, surtout des classes populaires moins exposées aux UI premium. Tester sur cible plus âgée avant de figer.

---

## 3. Typographies — 3 combos

### Combo 1 — Inter Tight + Inter

- **Titres** : [Inter Tight](https://fonts.google.com/specimen/Inter+Tight) (poids 600-700).
- **Corps** : [Inter](https://fonts.google.com/specimen/Inter) (poids 400, 500 pour emphase).
- **Vibe** : moderne neutre, ultra-fonctionnel. Le standard de fait des produits SaaS depuis 2020.
- **Rationnel** : choix safe et durable. Excellente lisibilité sur mobile (cible utilise probablement l'app dans le métro). Inter Tight donne aux titres un caractère plus serré, légèrement éditorial, qui différencie sans rupture. Aucun risque de friction lecteur.
- **Risque** : générique. Si l'identité visuelle ne marque pas ailleurs (couleur, logo), on disparaît dans le bruit SaaS.

### Combo 2 — Instrument Serif + Geist

- **Titres** : [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) (regular ou italic).
- **Corps** : [Geist](https://vercel.com/font) (poids 400-500).
- **Vibe** : éditorial sérieux mais contemporain. Le serif des titres évoque le journalisme de qualité (Le Monde, Mediapart) et le droit, le Geist apporte la modernité tech sans froid.
- **Rationnel** : casse la binaire « avocat poussiéreux vs startup gloss ». L'utilisateur perçoit « contenu sérieux, présentation moderne » — exactement le positionnement cible. Différenciation forte vs concurrents (tous sur Inter ou Poppins).
- **Risque** : Instrument Serif demande une maîtrise typographique en hierarchy (tracking, line-height, sizes). Mal réglé, ça vire blog Substack amateur. Demande une attention design soutenue.

### Combo 3 — General Sans + General Sans

- **Titres** : [General Sans](https://www.fontshare.com/fonts/general-sans) (poids 600-700).
- **Corps** : General Sans (poids 400-500).
- **Vibe** : sans-serif amical confiant. Géométrique sans être froid, humain sans être enfantin. Vibe Stripe-meets-Linear.
- **Rationnel** : un seul superfamily simplifie la stack (1 fichier, 1 fallback). General Sans a juste assez de personnalité (les terminaisons des `a`, `g`, `t`) pour ne pas être Inter, sans demander la maîtrise d'un serif. Très bon compromis distinctif/safe.
- **Risque** : sous licence Fontshare (gratuite mais à vérifier pour usage commercial / self-hosting). Moins de poids variables qu'Inter, moins de souplesse dans les micro-réglages typographiques.

---

## 4. Logos — 3 concepts

### Concept 1 — Wordmark pur avec ligature

- **Type** : wordmark.
- **Description** : le nom du produit en lettres minuscules, dans la typo de titre choisie, avec une ligature ou un détail typographique sur une lettre clé (le `t` de Tildé devient un vrai tilde `~`, le `i` de Litige perd son point pour un trait long, le `a` de Reclam est doté d'un crochet de réclamation).
- **Rationnel symbolique** : sobriété. Le nom EST le logo. Aucune métaphore visuelle imposée, aucune balance de la justice ringarde, aucun robot IA cliché. C'est un produit qui n'a pas besoin de se déguiser en autre chose.
- **Lisibilité / réduction (favicon)** : le détail typographique (tilde, trait, crochet) devient l'icône isolée pour favicon et app icon.
- **Sketch ASCII** (variante Tildé) :

```
   t i l d e~
   ────────
```

### Concept 2 — Picto + wordmark, picto = signe arrêté

- **Type** : picto + wordmark.
- **Description** : un picto géométrique simple qui évoque la clôture d'un dossier — un cachet, un coin de page cornée, un sceau circulaire stylisé, ou une coche enfermée dans un cercle. Le picto est posé à gauche du nom du produit, légèrement plus grand que la cap-height.
- **Rationnel symbolique** : la promesse « on clôt ton litige ». Métaphore tangible mais pas littérale. Le sceau / cachet évoque la valeur juridique (LRE, AR24, MeD) sans tomber dans la balance.
- **Lisibilité / réduction (favicon)** : le picto seul sert d'app icon. Idéal pour notifications push, badges, header app.
- **Sketch ASCII** :

```
   ╔═══╗
   ║ ✓ ║    reclam
   ╚═══╝
```

### Concept 3 — Monogramme dans une forme contenante

- **Type** : monogramme + wordmark optionnel.
- **Description** : la première lettre du nom, dessinée custom (pas reprise de la font), enfermée dans un carré aux coins arrondis ou un cercle. La lettre déborde légèrement de sa forme contenante pour donner du caractère. Le wordmark accompagne pour la première impression, le monogramme seul prend le relais une fois la marque connue.
- **Rationnel symbolique** : posture « entité qui s'occupe de toi ». La forme contenante = container, abri, prise en charge. La lettre custom = identité forte qui dépasse le cadre, qui ne se laisse pas enfermer (parallèle subtil avec l'utilisateur qui ne se laisse pas faire par son opérateur).
- **Lisibilité / réduction (favicon)** : excellent. Le monogramme est par nature optimisé pour les petits formats — favicon, app icon iOS/Android, avatar dans les mails sortants.
- **Sketch ASCII** (variante Reclam, lettre R) :

```
   ┌─────┐
   │  R ─┤
   │  R╱ │
   └─────┘   reclam
```

---

## 5. Ton de voix éditorial

Principes :
- **Direct** : phrases courtes. Pas de remplissage.
- **Chaleureux** : on tutoie (cohérent avec le pitch viral). On reconnaît l'irritation sans la dramatiser.
- **Factuel** : on dit ce qui se passe, ce qui va se passer, ce qu'on attend du user. Pas de promesse de résultat.
- **Jamais condescendant** : on ne « rassure » pas le user comme un enfant. On l'informe comme un adulte.
- **Jamais infantilisant** : pas de « bravo », pas de « tu es presque arrivé », pas d'émojis joyeux.
- **Pas de jargon juridique non-expliqué** : si on dit « mise en demeure », on dit en une phrase ce que ça fait.

Contrainte transverse (rappel ADR-004 §31) : aucune sortie agent ne contient *« je vous recommande »*, *« vous gagnerez »*, *« dans votre cas vous devriez »*. Les phrases ci-dessous respectent cette règle.

### Onboarding — accueil après upload des pièces

> Bien. On a tes factures et ta dernière réponse SFR. Trois infos manquent pour rédiger la lettre : la date de ta demande initiale, le montant que tu réclames, et si tu as déjà essayé un autre canal. Ça prend deux minutes.

Ce que ça illustre : on confirme ce qu'on a compris (rassure sans flatter), on annonce ce qu'on va demander (transparence sur les prochaines étapes), on donne une estimation de temps (respecte le user).

### Validation de la mise en demeure avant envoi

> Voici ta mise en demeure. Le fondement juridique a été figé par un avocat — il ne bougera pas. Le récit des faits reprend ce que tu as déclaré. Relis, modifie ce que tu veux, et clique sur Envoyer quand tu es prêt. Une fois partie, elle a la même valeur qu'une lettre recommandée papier.

Ce que ça illustre : on explique la séparation slot juridique figé / slot factuel (cohérent ADR-003), on remet le contrôle au user, on rappelle la valeur juridique de la LRE sans jargonner.

### Attente d'une réponse adverse — état après J+10

> Ta lettre est arrivée chez SFR le 4 juin. Ils ont 15 jours pour répondre, soit jusqu'au 19 juin. Pas besoin de check l'app — si quelque chose arrive, on te prévient par mail. Si on n'a rien le 20 au matin, on relance automatiquement.

Ce que ça illustre : on factualise l'état (date d'AR, échéance), on déresponsabilise le user de la vigilance (« pas besoin de check »), on annonce le comportement par défaut de l'agent (cohérent autonomie graduée ADR-004), on rappelle qu'on est là sans en faire trop.

---

## Notes de synthèse pour la décision

- Les trois noms se positionnent différemment : **Litige** (SEO + frontalité), **Reclam** (action + modernité), **Tildé** (distinctivité + posture apaisée). Le choix dépend en grande partie du parti pris : marketing-driven (Litige), produit-driven (Reclam), brand-driven (Tildé).
- Les trois palettes incarnent trois positionnements distincts : **Vert juridique** = confiance papier, **Indigo + jaune** = punch + sérieux, **Noir & corail** = premium minimaliste. La palette 1 vise large, la 2 vise distinctif, la 3 vise design-aware.
- Les trois typo combos suivent une courbe de risque : **Inter Tight + Inter** (safe), **General Sans** (compromis), **Instrument Serif + Geist** (signature forte mais demande discipline).
- Les trois concepts de logo sont pensés pour fonctionner avec n'importe lequel des trois noms et n'importe laquelle des trois palettes — le choix se fait indépendamment.

À pondérer au moment du choix : cohérence entre les axes. Un nom distinctif (Tildé) + palette neutre (Vert juridique) + typo signature (Instrument Serif) = trop d'angles à porter en MVP. Un nom distinctif demande des axes plus calmes ailleurs, et inversement.
