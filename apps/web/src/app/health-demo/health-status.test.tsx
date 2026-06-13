import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HealthStatus } from "./health-status";

describe("HealthStatus", () => {
  it("affiche le statut et la version quand l'API repond ok", () => {
    render(<HealthStatus result={{ ok: true, data: { status: "ok", version: "0.1.0" } }} />);

    expect(screen.getByText(/Statut/)).toBeInTheDocument();
    expect(screen.getByText("ok")).toBeInTheDocument();
    expect(screen.getByText("0.1.0")).toBeInTheDocument();
  });

  it("affiche un message d'erreur quand l'API est down", () => {
    render(<HealthStatus result={{ ok: false, error: "connexion refusée" }} />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("API indisponible");
    expect(alert).toHaveTextContent("connexion refusée");
  });
});
