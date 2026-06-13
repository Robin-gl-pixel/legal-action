"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "reclam-cookie-consent";

type ConsentChoice = "accepted" | "refused";

function isConsentChoice(value: string | null): value is ConsentChoice {
  return value === "accepted" || value === "refused";
}

// TODO(robin, 2026-06-14, #17): câbler les trackers analytics réels une fois
// la slice analytics ajoutée. Pour l'instant, on stocke uniquement le choix.
export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [hasChoice, setHasChoice] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setHasChoice(isConsentChoice(stored));
  }, []);

  if (!mounted || hasChoice) {
    return null;
  }

  const persistChoice = (choice: ConsentChoice) => {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setHasChoice(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background shadow-lg"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 text-sm text-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p id="cookie-banner-title" className="font-semibold text-accent">
            Cookies
          </p>
          <p className="mt-1 text-muted-foreground">
            Reclam utilise des cookies pour faire fonctionner l&rsquo;app
            (essentiels) et mesurer l&rsquo;usage (analytics). Tu peux refuser
            les non-essentiels sans perdre l&rsquo;usage.
          </p>
          {detailsOpen ? (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Cookies essentiels : session, préférences d&rsquo;affichage,
              sécurité (CSRF). Toujours actifs, sans choix possible — sans eux
              l&rsquo;app ne fonctionne pas. Cookies de mesure : statistiques
              d&rsquo;usage agrégées, sans PII. Désactivables. La granularité
              fine par tracker arrivera quand la slice analytics sera ajoutée.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              className="mt-2 text-xs font-medium underline decoration-border underline-offset-4 hover:text-foreground"
            >
              Personnaliser
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => persistChoice("refused")}
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-accent transition hover:bg-muted"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => persistChoice("accepted")}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
