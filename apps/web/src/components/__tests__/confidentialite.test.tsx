import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ConfidentialitePage from "@/app/(legal)/confidentialite/page";

describe("Page /confidentialite", () => {
  it("affiche le H1 Politique de confidentialité", () => {
    render(<ConfidentialitePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /politique de confidentialité/i,
      }),
    ).toBeInTheDocument();
  });

  it("affiche l'encart draft à valider par un avocat", () => {
    render(<ConfidentialitePage />);

    expect(
      screen.getByText(/document à valider par un avocat/i),
    ).toBeInTheDocument();
  });

  it("liste les sous-traitants clés (Supabase, Anthropic, AR24)", () => {
    render(<ConfidentialitePage />);

    expect(screen.getAllByText(/supabase/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/anthropic/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ar24/i).length).toBeGreaterThan(0);
  });

  it("mentionne la durée de conservation de 5 ans des données de dossier", () => {
    render(<ConfidentialitePage />);

    expect(screen.getByText(/5 ans/i)).toBeInTheDocument();
  });
});
