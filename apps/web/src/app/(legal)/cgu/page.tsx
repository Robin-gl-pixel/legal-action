import type { Metadata } from "next";
import Link from "next/link";
import { DraftNotice } from "@/components/draft-notice";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — Reclam",
  description:
    "Conditions générales d'utilisation du service Reclam. Document draft, à valider par avocat.",
};

export default function CGUPage() {
  return (
    <>
      <h1 className="font-sans text-4xl font-bold tracking-tight text-accent">
        Conditions Générales d&rsquo;Utilisation
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Dernière mise à jour : draft v0 — non publié.
      </p>
      <div className="mt-8">
        <DraftNotice />
      </div>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-foreground">
        <h2 className="text-2xl font-semibold text-accent">1. Objet</h2>
        <p>
          Les présentes Conditions Générales d&rsquo;Utilisation (« CGU »)
          régissent l&rsquo;accès et l&rsquo;utilisation du service Reclam
          (« le Service »), édité par Robin Hesse (cf. Mentions légales). Le
          Service propose à ses utilisateurs un outil d&rsquo;assistance à la
          rédaction de courriers de réclamation et de suivi de litiges de
          consommation, notamment dans le secteur des télécommunications.
        </p>
        <p>
          L&rsquo;utilisation du Service vaut acceptation pleine et entière des
          présentes CGU. L&rsquo;utilisateur reconnaît en avoir pris
          connaissance et les accepter sans réserve.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          2. Accès au Service
        </h2>
        <p>
          Le Service est accessible 24h/24, 7j/7, sous réserve des interruptions
          de maintenance, d&rsquo;incidents techniques ou d&rsquo;événements de
          force majeure. Reclam ne garantit pas une disponibilité ininterrompue
          du Service.
        </p>
        <p>
          L&rsquo;accès au Service nécessite une connexion internet, un
          navigateur récent et la création d&rsquo;un compte utilisateur.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          3. Comptes utilisateur
        </h2>
        <h3 className="mt-4 text-xl font-semibold text-accent">
          3.1 Création de compte
        </h3>
        <p>
          La création d&rsquo;un compte nécessite la fourniture d&rsquo;une
          adresse électronique valide et la définition d&rsquo;un mot de passe.
          L&rsquo;utilisateur s&rsquo;engage à fournir des informations exactes,
          à jour, et à les mettre à jour le cas échéant.
        </p>
        <h3 className="mt-4 text-xl font-semibold text-accent">
          3.2 Sécurité des identifiants
        </h3>
        <p>
          L&rsquo;utilisateur est seul responsable de la confidentialité de ses
          identifiants. Toute action effectuée depuis son compte est réputée
          effectuée par lui. En cas de compromission, il s&rsquo;engage à
          alerter Reclam sans délai.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          4. Périmètre fonctionnel
        </h2>
        <p>Le Service permet à l&rsquo;utilisateur de :</p>
        <ul className="ml-6 list-disc space-y-2">
          <li>déclarer un litige avec un opérateur de télécommunications ;</li>
          <li>
            téléverser les pièces justificatives nécessaires (factures,
            échanges, contrats) ;
          </li>
          <li>
            obtenir une assistance à la rédaction d&rsquo;une mise en demeure à
            partir de modèles validés par un avocat ;
          </li>
          <li>
            suivre les échanges avec la partie adverse et déclencher, le cas
            échéant, une saisine du médiateur compétent ;
          </li>
          <li>conserver l&rsquo;historique de son dossier.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          5. Posture non-conseil
        </h2>
        <p>
          Reclam n&rsquo;est pas un cabinet d&rsquo;avocat et n&rsquo;exerce pas
          la profession d&rsquo;avocat. Le Service propose uniquement une
          assistance à la rédaction sur la base de modèles documentaires figés,
          dont le fondement juridique a été validé par un avocat. Il ne
          constitue en aucun cas une consultation juridique personnalisée au
          sens de l&rsquo;article 54 de la loi n° 71-1130 du 31 décembre 1971
          portant réforme de certaines professions judiciaires et juridiques.
        </p>
        <p>
          L&rsquo;utilisateur reste maître du contenu des courriers qu&rsquo;il
          envoie. Toute décision juridique ou stratégique de fond relève de sa
          seule responsabilité. Pour un conseil personnalisé, il est invité à
          consulter un avocat inscrit à un barreau.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          6. Assistance par intelligence artificielle
        </h2>
        <p>
          Le Service repose sur des modèles d&rsquo;intelligence artificielle
          générative. L&rsquo;utilisateur est informé que ses échanges avec
          l&rsquo;assistant sont traités automatiquement, qu&rsquo;ils peuvent
          contenir des erreurs ou des imprécisions, et qu&rsquo;il lui revient
          de relire chaque contenu produit avant envoi.
        </p>
        <p>
          Les modèles utilisés sont fournis par des prestataires tiers (cf.
          Politique de confidentialité). Reclam ne peut garantir
          l&rsquo;absence totale d&rsquo;erreurs dans les contenus générés.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          7. Propriété intellectuelle
        </h2>
        <p>
          L&rsquo;ensemble des éléments composant le Service (marque, logo,
          design, code, textes, modèles documentaires) est protégé par le droit
          de la propriété intellectuelle et reste la propriété exclusive de
          Reclam ou de ses concédants. Toute reproduction, représentation ou
          exploitation non autorisée est interdite.
        </p>
        <p>
          Les contenus produits par l&rsquo;utilisateur dans le cadre de son
          dossier (récit des faits, pièces téléversées, courriers finalisés)
          restent sa propriété. Il concède à Reclam une licence d&rsquo;usage
          strictement limitée à la fourniture du Service.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          8. Responsabilité
        </h2>
        <p>
          Reclam est tenu à une obligation de moyens et non de résultat. Sa
          responsabilité ne saurait être engagée :
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            en cas d&rsquo;issue défavorable d&rsquo;un litige porté par
            l&rsquo;utilisateur ;
          </li>
          <li>
            en cas d&rsquo;erreur, d&rsquo;omission ou d&rsquo;imprécision dans
            les informations fournies par l&rsquo;utilisateur ;
          </li>
          <li>
            en cas d&rsquo;indisponibilité temporaire du Service liée à une
            cause extérieure ;
          </li>
          <li>
            en cas d&rsquo;utilisation du Service en contrariété avec les
            présentes CGU.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          9. Données personnelles
        </h2>
        <p>
          Le traitement des données personnelles dans le cadre du Service est
          régi par la{" "}
          <Link
            href="/confidentialite"
            className="font-medium underline decoration-border underline-offset-4 hover:text-foreground"
          >
            Politique de confidentialité
          </Link>
          , qui fait partie intégrante des présentes CGU.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          10. Durée et résiliation
        </h2>
        <p>
          Les présentes CGU s&rsquo;appliquent pour la durée d&rsquo;utilisation
          du Service par l&rsquo;utilisateur. Ce dernier peut clôturer son
          compte à tout moment depuis l&rsquo;interface du Service. Reclam peut
          suspendre ou résilier un compte en cas de manquement grave aux CGU,
          après mise en demeure restée infructueuse.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          11. Médiation et juridiction
        </h2>
        <p>
          En cas de litige avec Reclam, l&rsquo;utilisateur consommateur peut
          recourir gratuitement au médiateur de la consommation Médicys (
          <a
            href="https://medicys.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-border underline-offset-4 hover:text-foreground"
          >
            medicys.fr
          </a>
          ).
        </p>
        <p>
          À défaut de règlement amiable, les présentes CGU sont régies par le
          droit français. Les tribunaux français sont seuls compétents, sous
          réserve des règles impératives de compétence territoriale applicables
          aux consommateurs.
        </p>
      </section>
    </>
  );
}
