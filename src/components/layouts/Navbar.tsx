"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-black" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-6" />
          </Link>
          <nav className="hidden gap-4 text-sm md:flex">
            <Link href="/">Home</Link>
            <Link href="/browse/tv">TV Shows</Link>
            <Link href="/browse/movies">Movies</Link>
            <Link href="/browse/new">New & Popular</Link>
            <Link href="/my-list">My List</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/search" aria-label="Search">
            🔍
          </Link>
          <div className="h-8 w-8 rounded-full bg-neutral-700" />
        </div>
      </div>
    </header>
  );
}
