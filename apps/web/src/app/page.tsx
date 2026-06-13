import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Reclam
      </p>
      <h1 className="mt-6 font-sans text-5xl font-bold leading-tight tracking-tight text-accent">
        L&rsquo;IA qui te débarrasse de SFR en 5 minutes.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Tes litiges télécom, classés. Tu balances tes pièces, on rédige la mise
        en demeure, on suit les échanges, on saisit le médiateur si besoin.
      </p>
      <div className="mt-10 flex items-center gap-4">
        <Link
          href="/health-demo"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
        >
          Démarrer un dossier
        </Link>
        <Link
          href="/health-demo"
          className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
        >
          État du système
        </Link>
      </div>
    </main>
  );
}
