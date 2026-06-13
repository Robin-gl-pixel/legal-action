export function DraftNotice() {
  return (
    <aside
      role="note"
      aria-label="Document à valider"
      className="mb-10 rounded-md border-l-4 border-primary bg-muted px-5 py-4 text-sm leading-relaxed text-foreground"
    >
      <p className="font-semibold uppercase tracking-wide text-accent">
        Document à valider par un avocat avant publication
      </p>
      <p className="mt-1 text-muted-foreground">
        Contenu draft, à relire avant mise en ligne commerciale. Les références
        légales s&rsquo;appuient sur les modèles CNIL, economie.gouv.fr et
        Service-Public.fr.
      </p>
    </aside>
  );
}
