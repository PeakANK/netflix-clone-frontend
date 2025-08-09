"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/browse/movies", label: "Movies" },
  { href: "/browse/top", label: "Top Rated" },
  { href: "/search", label: "Search" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <nav
      className={[
        "sticky top-0 z-30 h-16", // <-- fixed height
        scrolled ? "bg-neutral-950/80 backdrop-blur-md" : "bg-gradient-to-b from-black/60 to-transparent",
        "transition-colors"
      ].join(" ")}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center gap-6 px-4 md:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-6 w-5 bg-gradient-to-b from-red-500 to-red-700 rounded-sm shadow-lg shadow-red-900/40" />
          <span className="sr-only">Netflix Clone</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-neutral-200">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`hover:text-white transition ${pathname === n.href ? "text-white font-medium" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={onSubmit} className="ml-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-28 md:w-44 rounded-md bg-neutral-800/70 px-3 py-1.5 text-sm placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-red-600"
          />
        </form>
      </div>
    </nav>
  );
}
