import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CGVPage from "@/app/(legal)/cgv/page";

describe("Page /cgv", () => {
  it("affiche le H1 Conditions Générales de Vente", () => {
    render(<CGVPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /conditions générales de vente/i,
      }),
    ).toBeInTheDocument();
  });

  it("affiche l'encart draft à valider par un avocat", () => {
    render(<CGVPage />);

    expect(
      screen.getByText(/document à valider par un avocat/i),
    ).toBeInTheDocument();
  });

  it("mentionne le droit de rétractation de 14 jours", () => {
    render(<CGVPage />);

    expect(screen.getByText(/quatorze \(14\) jours/i)).toBeInTheDocument();
  });

  it("désigne Médicys comme médiateur de la consommation", () => {
    render(<CGVPage />);

    expect(screen.getByText(/médicys/i)).toBeInTheDocument();
  });
});
