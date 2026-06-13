import type { Metadata } from "next";
import { DraftNotice } from "@/components/draft-notice";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Reclam",
  description:
    "Politique de confidentialité du service Reclam. Document draft, à valider par avocat.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <h1 className="font-sans text-4xl font-bold tracking-tight text-accent">
        Politique de confidentialité
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Dernière mise à jour : draft v0 — non publié.
      </p>
      <div className="mt-8">
        <DraftNotice />
      </div>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-foreground">
        <h2 className="text-2xl font-semibold text-accent">
          1. Responsable de traitement
        </h2>
        <p>
          Le responsable du traitement des données personnelles collectées via
          le service Reclam est :
        </p>
        <p className="ml-4">
          <strong>Robin Hesse</strong>
          <br />
          Statut juridique : à compléter (entreprise individuelle / SAS)
          <br />
          Contact : à compléter (adresse électronique de contact)
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          2. Bases légales du traitement
        </h2>
        <p>
          Les traitements mis en œuvre par Reclam reposent sur les bases légales
          suivantes au sens de l&rsquo;article 6 du RGPD :
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <strong>Exécution du contrat</strong> (article 6.1.b) pour la
            fourniture du Service, la rédaction des courriers, le suivi du
            dossier et la facturation.
          </li>
          <li>
            <strong>Intérêt légitime</strong> (article 6.1.f) pour la mesure
            d&rsquo;audience agrégée, la sécurisation du Service, la prévention
            de la fraude et l&rsquo;amélioration continue de l&rsquo;outil.
          </li>
          <li>
            <strong>Consentement</strong> (article 6.1.a) pour les traceurs
            non-essentiels (cookies de mesure) et toute communication
            commerciale.
          </li>
          <li>
            <strong>Obligation légale</strong> (article 6.1.c) pour la
            conservation des factures et des éléments comptables.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          3. Données collectées
        </h2>
        <p>
          Les catégories de données collectées dans le cadre du Service sont :
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <strong>Données d&rsquo;identité</strong> : nom, prénom, adresse
            postale, adresse électronique, numéro de téléphone.
          </li>
          <li>
            <strong>Données relatives au litige</strong> : récit des faits,
            identité de la partie adverse, montants en jeu, dates
            d&rsquo;échanges, références contractuelles.
          </li>
          <li>
            <strong>Pièces justificatives</strong> : factures, contrats,
            courriels, captures d&rsquo;écran téléversés par
            l&rsquo;utilisateur.
          </li>
          <li>
            <strong>Échanges avec l&rsquo;assistant</strong> : historique des
            messages produits dans le cadre du dossier.
          </li>
          <li>
            <strong>Données de paiement</strong> : traitées directement par
            Stripe ; Reclam ne stocke pas les numéros de carte.
          </li>
          <li>
            <strong>Données techniques</strong> : journaux d&rsquo;accès,
            adresse IP, type de navigateur, cookies (cf. bannière de
            consentement).
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          4. Destinataires et sous-traitants
        </h2>
        <p>
          Les données sont accessibles aux personnels habilités de Reclam dans
          la limite de leurs attributions. Reclam fait appel aux sous-traitants
          suivants, chacun encadré par un contrat conforme à l&rsquo;article 28
          du RGPD :
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <strong>Supabase</strong> (hébergement de la base de données,
            région UE).
          </li>
          <li>
            <strong>Anthropic</strong> (fournisseur des modèles
            d&rsquo;intelligence artificielle, États-Unis).
          </li>
          <li>
            <strong>Postmark</strong> (envoi des courriels transactionnels).
          </li>
          <li>
            <strong>AR24</strong> (prestataire qualifié de lettre recommandée
            électronique, France).
          </li>
          <li>
            <strong>Pappers</strong> (consultation des données publiques
            d&rsquo;immatriculation des sociétés adverses).
          </li>
          <li>
            <strong>Stripe</strong> (traitement des paiements, Irlande / UE).
          </li>
          <li>
            <strong>Langfuse</strong> (observabilité des appels aux modèles
            d&rsquo;IA ; données pseudonymisées avant envoi).
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          5. Transferts hors Union européenne
        </h2>
        <p>
          Le recours au prestataire Anthropic implique un transfert de données
          vers les États-Unis. Ce transfert est encadré par les clauses
          contractuelles types (CCT) adoptées par la Commission européenne, par
          un accord de traitement de données (DPA) et, le cas échéant, par les
          mesures supplémentaires recommandées par le CEPD (chiffrement,
          minimisation, pseudonymisation des données envoyées).
        </p>
        <p>
          Aucune donnée d&rsquo;identification directe (nom, email, SIRET) n&rsquo;est
          envoyée à Langfuse : seuls des identifiants techniques et des
          métriques agrégées sont transmis.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          6. Durées de conservation
        </h2>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <strong>Données de dossier (récit, pièces, courriers)</strong> : 5
            ans à compter de la clôture du dossier, durée alignée sur la
            prescription civile de droit commun (article 2224 du Code civil).
          </li>
          <li>
            <strong>Comptes utilisateurs</strong> : durée de la relation
            contractuelle, puis archivage 3 ans pour gestion d&rsquo;éventuels
            litiges.
          </li>
          <li>
            <strong>Pièces comptables</strong> : 10 ans à compter de la clôture
            de l&rsquo;exercice (article L123-22 du Code de commerce).
          </li>
          <li>
            <strong>Journaux techniques</strong> : 12 mois.
          </li>
          <li>
            <strong>Cookies</strong> : 13 mois maximum, conformément à la
            recommandation CNIL.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          7. Droits des personnes concernées
        </h2>
        <p>
          Conformément aux articles 15 à 22 du RGPD et à la loi Informatique et
          Libertés modifiée, l&rsquo;utilisateur dispose des droits suivants sur
          ses données personnelles :
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>droit d&rsquo;accès ;</li>
          <li>droit de rectification ;</li>
          <li>
            droit à l&rsquo;effacement (sous réserve des obligations de
            conservation légales) ;
          </li>
          <li>droit à la portabilité ;</li>
          <li>
            droit d&rsquo;opposition pour motif légitime et droit à la
            limitation du traitement ;
          </li>
          <li>
            droit de définir des directives relatives au sort de ses données
            après son décès.
          </li>
        </ul>
        <p>
          Ces droits peuvent être exercés par courrier électronique à
          l&rsquo;adresse de contact figurant dans les Mentions légales.
          L&rsquo;utilisateur dispose également du droit d&rsquo;introduire une
          réclamation auprès de la Commission nationale de l&rsquo;informatique
          et des libertés (CNIL — 3 place de Fontenoy, 75007 Paris,{" "}
          <a
            href="https://www.cnil.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-border underline-offset-4 hover:text-foreground"
          >
            cnil.fr
          </a>
          ).
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          8. Sécurité
        </h2>
        <p>
          Reclam met en œuvre les mesures techniques et organisationnelles
          appropriées pour protéger les données : chiffrement en transit
          (TLS 1.3) et au repos, contrôle d&rsquo;accès strict, journalisation
          des accès, sauvegardes chiffrées, et politique de gestion des
          incidents conformément à l&rsquo;article 33 du RGPD.
        </p>
      </section>
    </>
  );
}
