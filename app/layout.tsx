import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js + Render Demo",
  description: "Frontend con App Router + backend su Render",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}