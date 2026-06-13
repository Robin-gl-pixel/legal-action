import type { Metadata } from "next";
import { DraftNotice } from "@/components/draft-notice";

export const metadata: Metadata = {
  title: "Mentions légales — Reclam",
  description:
    "Mentions légales du service Reclam. Document draft, à valider par avocat.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <h1 className="font-sans text-4xl font-bold tracking-tight text-accent">
        Mentions légales
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Dernière mise à jour : draft v0 — non publié.
      </p>
      <div className="mt-8">
        <DraftNotice />
      </div>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-foreground">
        <h2 className="text-2xl font-semibold text-accent">1. Éditeur</h2>
        <p>
          Le service Reclam est édité par :
        </p>
        <p className="ml-4">
          <strong>Robin Hesse</strong>
          <br />
          Statut juridique : à compléter (entreprise individuelle / SAS — à
          confirmer avant publication commerciale).
          <br />
          Numéro d&rsquo;immatriculation : à compléter (SIREN / SIRET).
          <br />
          Siège : à compléter (adresse postale complète).
          <br />
          Adresse électronique de contact : à compléter.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          2. Directeur de la publication
        </h2>
        <p>
          Le directeur de la publication est Robin Hesse, en sa qualité de
          fondateur du Service.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          3. Hébergeurs
        </h2>
        <h3 className="mt-4 text-xl font-semibold text-accent">
          3.1 Application web
        </h3>
        <p>
          L&rsquo;application web (front-end) est hébergée par :
        </p>
        <p className="ml-4">
          <strong>Vercel Inc.</strong>
          <br />
          440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis
          <br />
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-border underline-offset-4 hover:text-foreground"
          >
            vercel.com
          </a>
        </p>
        <h3 className="mt-4 text-xl font-semibold text-accent">
          3.2 Back-end applicatif
        </h3>
        <p>
          L&rsquo;API et les workers sont hébergés par :
        </p>
        <p className="ml-4">
          <strong>Fly.io (région Paris — CDG)</strong>
          <br />
          Fly.io Inc., 2261 Market Street #4990, San Francisco, CA 94114,
          États-Unis
          <br />
          <a
            href="https://fly.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-border underline-offset-4 hover:text-foreground"
          >
            fly.io
          </a>
        </p>
        <h3 className="mt-4 text-xl font-semibold text-accent">
          3.3 Base de données
        </h3>
        <p>
          Les données utilisateur sont stockées par :
        </p>
        <p className="ml-4">
          <strong>Supabase (région UE)</strong>
          <br />
          Supabase Inc., 970 Toa Payoh North #07-04, Singapour (entité opérant
          la région UE).
          <br />
          <a
            href="https://supabase.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-border underline-offset-4 hover:text-foreground"
          >
            supabase.com
          </a>
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">4. Contact</h2>
        <p>
          Pour toute question relative au Service, à la protection des données
          ou à l&rsquo;exercice des droits : voir l&rsquo;adresse électronique
          de contact mentionnée au paragraphe 1.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          5. Propriété intellectuelle
        </h2>
        <p>
          La marque « Reclam », le wordmark associé et l&rsquo;ensemble des
          éléments graphiques et éditoriaux du Service sont protégés. Toute
          reproduction non autorisée est interdite. Voir les Conditions
          Générales d&rsquo;Utilisation.
        </p>
      </section>
    </>
  );
}
