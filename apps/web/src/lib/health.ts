import { z } from "zod";

const healthResponseSchema = z.object({
  status: z.string(),
  version: z.string(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export type HealthResult =
  | { ok: true; data: HealthResponse }
  | { ok: false; error: string };

export async function fetchHealth(baseUrl: string): Promise<HealthResult> {
  try {
    const response = await fetch(`${baseUrl}/health`, {
      cache: "no-store",
      headers: { accept: "application/json" },
    });
    if (!response.ok) {
      return { ok: false, error: `API HTTP ${response.status}` };
    }
    const json: unknown = await response.json();
    const parsed = healthResponseSchema.safeParse(json);
    if (!parsed.success) {
      return { ok: false, error: "Réponse API invalide" };
    }
    return { ok: true, data: parsed.data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return { ok: false, error: `API inaccessible (${message})` };
  }
}
