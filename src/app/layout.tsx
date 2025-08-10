'use client';

import './globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import NavBar from '@/components/NavBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <NavBar />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.995 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="pt-20"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </body>
    </html>
  );
}
