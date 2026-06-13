import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MentionsLegalesPage from "@/app/(legal)/mentions-legales/page";

describe("Page /mentions-legales", () => {
  it("affiche le H1 Mentions légales", () => {
    render(<MentionsLegalesPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /mentions légales/i }),
    ).toBeInTheDocument();
  });

  it("affiche l'encart draft à valider par un avocat", () => {
    render(<MentionsLegalesPage />);

    expect(
      screen.getByText(/document à valider par un avocat/i),
    ).toBeInTheDocument();
  });

  it("désigne les trois hébergeurs (Vercel, Fly.io, Supabase)", () => {
    render(<MentionsLegalesPage />);

    expect(screen.getAllByText(/vercel/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/fly\.io/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/supabase/i).length).toBeGreaterThan(0);
  });
});
