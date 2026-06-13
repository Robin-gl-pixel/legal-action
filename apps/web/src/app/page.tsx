import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">legal-action</h1>
      <p className="mt-4 text-neutral-600">
        Monorepo bootstrap. Tracer bullet santé :{" "}
        <Link href="/health-demo" className="underline">
          /health-demo
        </Link>
        .
      </p>
    </main>
  );
}
