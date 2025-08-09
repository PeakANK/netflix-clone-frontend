import "@/app/globals.css";
import "@/styles/scrollbar.css";
import Navbar from "@/components/layouts/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "Next.js 15 + Tailwind",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white antialiased">
        <Navbar />
        {/* Offset content by navbar height */}
        <main className="mt-10">{children}</main>
        {/* Optional background vignette */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.12),rgba(0,0,0,0))] opacity-25" />
      </body>
    </html>
  );
}
