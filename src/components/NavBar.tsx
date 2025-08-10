'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: '/', label: 'Home' },
  { href: '/movies', label: 'Movies' },
  { href: '/tv', label: 'TV' },
  { href: '/lists', label: 'My Lists' },
  { href: '/search', label: 'Search' },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <nav className="mx-auto max-w-7xl flex items-center gap-6 px-6 h-16">
        <span className="text-2xl font-extrabold text-red-500">NETFLIX</span>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={clsx(
              'text-sm hover:text-red-500 transition-colors',
              pathname === l.href && 'text-red-500'
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
