import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CookieBanner } from "@/components/cookie-banner";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reclam",
  description: "L'IA qui te débarrasse de SFR en 5 minutes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
