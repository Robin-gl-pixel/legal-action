# ADR-005 — Architecture mail (LRE AR24 + alias par dossier)

## Status

Accepted (2026-06-13)

## Context

L'app doit (1) envoyer la mise en demeure avec valeur juridique, (2) recevoir et structurer toutes les réponses adverses, (3) gérer le suivi sans demander à l'utilisateur d'aller chercher dans sa boîte mail.

Contraintes :
- Une mise en demeure DOIT avoir une **date certaine** (art. 1344-1 Code civil) pour faire courir les intérêts moratoires et préserver la prescription.
- L'utilisateur ne doit pas connecter sa boîte Gmail/Outlook (friction OAuth + risque RGPD + ambiguïté "qui écrit").
- Les réponses adverses doivent atterrir dans l'app pour que l'agent les classifie et propose une action.

## Decision

### Envoi de la mise en demeure : **Lettre Recommandée Électronique via AR24**
- AR24 émet une LRE équivalente LRAR papier (art. L100 CPCE).
- Date d'envoi certaine, accusé de réception électronique horodaté.
- API REST, ~2-4 € par envoi (intégré dans le tarif user).
- L'envoi est déclenché après paiement Stripe (à l'acte 19 €) ou décompte d'un quota abo (39 €/an inclut 4 LRE).

### Suivi des échanges : **alias dédié par dossier**
- À la création d'un dossier, génération d'un alias unique : `prenom.nom+{ref_dossier}@litiges.app` (ou domaine équivalent).
- L'alias est utilisé comme `reply-to` de la LRE.
- Les réponses adverses arrivent sur cet alias → Postmark inbound webhook → backend → email parsé, attaché au dossier.
- L'utilisateur ne connecte JAMAIS sa boîte personnelle.

### Stack mail
- **Inbound + outbound transactionnel** : Postmark.
- **LRE** : AR24.
- **DNS** : sous-domaine MX dédié (ex : `litiges.app`) pointant vers Postmark.
- **Tracking** : `envoi_lre` (AR24 ID, status, tracking URL) + `email_message` (inbound/outbound, classification, attachments).

### Classification + autonomie graduée
- Chaque email inbound est classifié par Haiku (enum fermée : `refus` | `acceptation` | `demande_info` | `accuse` | `autre`).
- Une `agent_action` est créée avec proposition de réponse.
- Politique de validation selon l'enum (cf. [ADR-004](0004-autonomie-graduee.md)).

## Consequences

**Positives**
- Valeur juridique solide pour la mise en demeure.
- Friction minimale (pas d'OAuth, pas de connexion boîte mail user).
- Contrôle total de l'inbox côté agent.
- Audit trail complet (envois + réponses + classifications).
- Coût LRE intégré au pricing — perçu comme un avantage (vs concurrent qui demande au user d'aller à La Poste).

**Négatives**
- Dépendance forte à AR24 et Postmark — fallback à étudier si SLA insuffisant.
- DNS / délivrabilité à monitorer en continu.
- L'alias `prenom.nom+ref@litiges.app` est visible côté partie adverse — un opérateur télécom peut potentiellement bloquer le domaine. Mitigation : multiplier les domaines.

**Alternatives écartées**
- OAuth boîte mail user (Gmail / Outlook) : friction onboarding élevée, ambiguïté "qui écrit" (user vs IA), responsabilité RGPD étendue.
- Email sec sans LRE : juridiquement faible pour une mise en demeure, fragilise la position user.
- LRAR papier via Maileva : plus cher, intégration plus lourde, latence d'envoi.
- Postmark sans alias dédié (juste un compte unique) : impossible de router les réponses au dossier.

Voir aussi : [ADR-004](0004-autonomie-graduee.md) (utilise les emails classifiés pour ses décisions).
