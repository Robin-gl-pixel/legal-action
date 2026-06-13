import type { HealthResult } from "@/lib/health";

export function HealthStatus({ result }: { result: HealthResult }) {
  if (!result.ok) {
    return (
      <div
        role="alert"
        className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-800"
      >
        <p className="font-medium">API indisponible</p>
        <p className="mt-1">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
      <p>
        Statut : <span className="font-medium">{result.data.status}</span>
      </p>
      <p>
        Version API : <span className="font-mono">{result.data.version}</span>
      </p>
    </div>
  );
}
