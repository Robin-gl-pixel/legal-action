import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <nav className="mb-10 text-sm">
        <Link
          href="/"
          className="font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
        >
          Retour à l&rsquo;accueil
        </Link>
      </nav>
      <article className="prose-legal">{children}</article>
    </main>
  );
}
