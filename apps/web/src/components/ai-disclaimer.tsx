export function AIDisclaimer() {
  return (
    <aside
      role="note"
      aria-label="Information sur l'assistant IA"
      className="rounded-md border border-border bg-muted px-5 py-4 text-sm leading-relaxed text-foreground"
    >
      <p>
        Tu interagis avec un assistant IA. Ce service n&rsquo;est pas un cabinet
        d&rsquo;avocat. L&rsquo;app t&rsquo;assiste dans la rédaction de tes
        courriers, sans constituer un conseil juridique.
      </p>
    </aside>
  );
}
