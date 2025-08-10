import type { ReactNode } from 'react';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'Netflix Clone',
  description: 'TMDB-powered Netflix clone frontend',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <NavBar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
