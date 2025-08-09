"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/tv", label: "TV Shows" },
  { href: "/search", label: "Search" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <nav className={`fixed inset-x-0 top-0 z-40 h-16 transition-colors duration-300 ${scrolled ? "bg-black shadow-lg shadow-red-900/30" : "bg-black/90"}`}>
      <div className="mx-auto flex h-full max-w-7xl items-center gap-6 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-6 w-5 bg-gradient-to-b from-red-500 to-red-700 rounded-sm shadow-lg shadow-red-900/40" />
          <span className="sr-only">Netflix Clone</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link key={n.href} href={n.href}
                className={`transition ${active ? "text-red-500 font-semibold" : "text-neutral-300 hover:text-white"}`}>
                {n.label}
              </Link>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="ml-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-28 md:w-44 rounded-md bg-neutral-800 px-3 py-1.5 text-sm placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-red-600"
          />
        </form>
      </div>
    </nav>
  );
}
