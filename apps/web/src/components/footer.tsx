import Link from "next/link";

const APP_VERSION = "v0.1.0";

const legalLinks: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgu", label: "CGU" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 text-sm text-muted-foreground">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-2xl font-bold tracking-tight text-accent">
              reclam
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed">
              Reclam n&rsquo;est pas un cabinet d&rsquo;avocat. L&rsquo;app
              t&rsquo;assiste dans la rédaction de tes courriers et le suivi de
              ton dossier, sans constituer un conseil juridique. Tu interagis
              avec un assistant IA.
            </p>
          </div>
          <nav aria-label="Liens légaux">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-medium underline decoration-border underline-offset-4 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="text-xs leading-relaxed">
          En cas de litige avec Reclam, médiateur de la consommation :
          Médicys —{" "}
          <a
            href="https://medicys.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border underline-offset-4 hover:text-foreground"
          >
            medicys.fr
          </a>
          .
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Reclam · {APP_VERSION}
        </p>
      </div>
    </footer>
  );
}
