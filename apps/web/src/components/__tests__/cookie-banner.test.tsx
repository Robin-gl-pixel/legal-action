import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CookieBanner } from "../cookie-banner";

const STORAGE_KEY = "reclam-cookie-consent";

describe("CookieBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("s'affiche au premier visit quand aucun choix n'est stocké", () => {
    render(<CookieBanner />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accepter/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /refuser/i })).toBeInTheDocument();
  });

  it("masque la bannière et stocke 'accepted' après clic sur Accepter", () => {
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole("button", { name: /accepter/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("accepted");
  });

  it("masque la bannière et stocke 'refused' après clic sur Refuser", () => {
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole("button", { name: /refuser/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("refused");
  });

  it("ne s'affiche pas si un choix est déjà stocké en localStorage", () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");

    render(<CookieBanner />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("expose un lien Personnaliser qui ouvre le détail", () => {
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole("button", { name: /personnaliser/i }));

    expect(screen.getByText(/cookies essentiels/i)).toBeInTheDocument();
  });
});
