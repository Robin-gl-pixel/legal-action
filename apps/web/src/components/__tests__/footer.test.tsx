import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../footer";

describe("Footer", () => {
  it("expose les 4 liens vers les pages légales", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: /mentions légales/i }),
    ).toHaveAttribute("href", "/mentions-legales");
    expect(screen.getByRole("link", { name: /^cgu$/i })).toHaveAttribute(
      "href",
      "/cgu",
    );
    expect(screen.getByRole("link", { name: /^cgv$/i })).toHaveAttribute(
      "href",
      "/cgv",
    );
    expect(screen.getByRole("link", { name: /confidentialité/i })).toHaveAttribute(
      "href",
      "/confidentialite",
    );
  });

  it("affiche le disclaimer non-conseil et la mention IA", () => {
    render(<Footer />);

    expect(
      screen.getByText(/n.est pas un cabinet d.avocat/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/assistant ia/i)).toBeInTheDocument();
  });

  it("affiche la mention du médiateur de la consommation Médicys", () => {
    render(<Footer />);

    expect(screen.getByText(/médicys/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /medicys\.fr/i }),
    ).toHaveAttribute("href", "https://medicys.fr/");
  });
});
