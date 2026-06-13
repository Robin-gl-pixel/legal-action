import type { Metadata } from "next";
import { DraftNotice } from "@/components/draft-notice";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — Reclam",
  description:
    "Conditions générales de vente du service Reclam. Document draft, à valider par avocat.",
};

export default function CGVPage() {
  return (
    <>
      <h1 className="font-sans text-4xl font-bold tracking-tight text-accent">
        Conditions Générales de Vente
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
          Les présentes Conditions Générales de Vente (« CGV ») encadrent les
          offres commerciales du service Reclam, édité par Robin Hesse, à
          destination des consommateurs au sens du Code de la consommation. Le
          Service propose une assistance à la rédaction de courriers de
          réclamation et au suivi de litiges, sans constituer un conseil
          juridique.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">2. Prix</h2>
        <p>Les tarifs en vigueur sont les suivants :</p>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <strong>Abonnement annuel</strong> : 39 € TTC par an, donnant accès
            à l&rsquo;ensemble des fonctionnalités de suivi de dossier.
          </li>
          <li>
            <strong>Acte unitaire</strong> : 19 € TTC par mise en demeure
            envoyée par lettre recommandée électronique (LRE).
          </li>
          <li>
            <strong>Commission de succès</strong> : 10 % TTC des sommes
            effectivement récupérées suite à l&rsquo;intervention assistée par
            le Service, dans la limite des montants encaissés et déclarés par
            l&rsquo;utilisateur.
          </li>
        </ul>
        <p>
          Les prix sont indiqués en euros toutes taxes comprises. Reclam se
          réserve la faculté de modifier ses tarifs à tout moment, étant entendu
          que les modifications ne s&rsquo;appliquent qu&rsquo;aux commandes
          postérieures à leur entrée en vigueur.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          3. Modalités de paiement
        </h2>
        <p>
          Les paiements sont traités par le prestataire Stripe (Stripe Payments
          Europe, Ltd.) selon ses propres conditions. Reclam ne conserve aucune
          donnée bancaire en clair sur ses serveurs. Les moyens de paiement
          acceptés sont la carte bancaire et les autres méthodes proposées par
          Stripe au moment de la commande.
        </p>
        <p>
          La facture correspondant à chaque commande est mise à disposition de
          l&rsquo;utilisateur dans son espace personnel.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          4. Exécution du service
        </h2>
        <p>
          L&rsquo;exécution des prestations démarre dès que l&rsquo;utilisateur
          valide explicitement le contenu de sa mise en demeure et autorise son
          envoi. L&rsquo;envoi est effectué par lettre recommandée électronique
          via le prestataire qualifié AR24, conformément au règlement eIDAS et à
          l&rsquo;article L100 du Code des postes et des communications
          électroniques. La LRE produit les mêmes effets juridiques qu&rsquo;une
          lettre recommandée papier avec accusé de réception.
        </p>
        <p>
          Le suivi du dossier, les relances automatiques et les notifications
          d&rsquo;événements sont assurés sur la durée de l&rsquo;abonnement
          souscrit.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          5. Droit de rétractation
        </h2>
        <p>
          Conformément aux articles L221-18 et suivants du Code de la
          consommation, l&rsquo;utilisateur consommateur dispose d&rsquo;un
          délai de quatorze (14) jours à compter de la conclusion du contrat
          pour exercer son droit de rétractation, sans avoir à motiver sa
          décision ni à supporter d&rsquo;autres coûts que ceux prévus par la
          loi.
        </p>
        <p>
          Pour exercer ce droit, l&rsquo;utilisateur notifie sa décision par
          courrier électronique à l&rsquo;adresse de contact figurant dans les
          Mentions légales, en utilisant le formulaire-type prévu à
          l&rsquo;article R221-1 ou tout autre support clair et non équivoque.
        </p>
        <h3 className="mt-4 text-xl font-semibold text-accent">
          5.1 Inapplication du droit de rétractation
        </h3>
        <p>
          Conformément à l&rsquo;article L221-28 1° du Code de la consommation,
          le droit de rétractation ne peut être exercé pour les services
          pleinement exécutés avant la fin du délai de rétractation et dont
          l&rsquo;exécution a commencé après accord préalable exprès de
          l&rsquo;utilisateur et renoncement exprès à son droit de rétractation.
          L&rsquo;envoi d&rsquo;une LRE constitue une prestation pleinement
          exécutée dès sa transmission au prestataire AR24.
        </p>
        <p>
          Avant chaque envoi de LRE, l&rsquo;utilisateur est invité à confirmer
          expressément son accord pour le démarrage immédiat de la prestation
          ainsi que son renoncement au droit de rétractation pour ce service
          spécifique.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          6. Médiation de la consommation
        </h2>
        <p>
          Conformément aux articles L611-1 et suivants du Code de la
          consommation, l&rsquo;utilisateur consommateur a le droit de recourir
          gratuitement à un médiateur de la consommation en cas de litige avec
          Reclam, après avoir tenté de résoudre le différend directement par
          réclamation écrite.
        </p>
        <p>
          Le médiateur désigné par Reclam est :
        </p>
        <p className="ml-4">
          <strong>Médicys</strong>
          <br />
          73 boulevard de Clichy, 75009 Paris
          <br />
          <a
            href="https://medicys.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-border underline-offset-4 hover:text-foreground"
          >
            medicys.fr
          </a>
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-accent">
          7. Tribunal compétent
        </h2>
        <p>
          Les présentes CGV sont soumises au droit français. À défaut de
          résolution amiable, le litige sera porté devant les juridictions
          françaises compétentes. L&rsquo;utilisateur consommateur peut saisir,
          à son choix, outre l&rsquo;une des juridictions territorialement
          compétentes en vertu du Code de procédure civile, la juridiction du
          lieu où il demeurait au moment de la conclusion du contrat ou de la
          survenance du fait dommageable, conformément à l&rsquo;article R631-3
          du Code de la consommation.
        </p>
      </section>
    </>
  );
}
