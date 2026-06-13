import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CGUPage from "@/app/(legal)/cgu/page";

describe("Page /cgu", () => {
  it("affiche le H1 Conditions Générales d'Utilisation", () => {
    render(<CGUPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /conditions générales d.utilisation/i,
      }),
    ).toBeInTheDocument();
  });

  it("affiche l'encart draft à valider par un avocat", () => {
    render(<CGUPage />);

    expect(
      screen.getByText(/document à valider par un avocat/i),
    ).toBeInTheDocument();
  });

  it("cite la posture non-conseil (loi 71-1130)", () => {
    render(<CGUPage />);

    expect(screen.getByText(/loi n° 71-1130/i)).toBeInTheDocument();
  });
});
