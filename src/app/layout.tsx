import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-white antialiased">
        {children}
        {/* global background/overlays live here if you need them */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.12),rgba(0,0,0,0))] opacity-25" />
      </body>
    </html>
  );
}
