import { getApiBaseUrl } from "@/lib/api-config";
import { fetchHealth } from "@/lib/health";
import { HealthStatus } from "./health-status";

export const dynamic = "force-dynamic";

export default async function HealthDemoPage() {
  const result = await fetchHealth(getApiBaseUrl());

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Health demo</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Server Component qui interroge l&apos;API FastAPI sur <code>/health</code>.
      </p>
      <div className="mt-8">
        <HealthStatus result={result} />
      </div>
    </main>
  );
}
