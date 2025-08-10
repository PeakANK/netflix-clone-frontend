// src/components/Hero.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { imageUrl } from '@/lib/queries';
import DetailModal from './DetailModal';

type Props = {
  id: number;                          // ⬅️ add
  mediaType: 'movie' | 'tv';           // ⬅️ add
  title: string;
  overview?: string;
  backdrop_path?: string | null;
};

export default function Hero({ id, mediaType, title, overview, backdrop_path }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh]">
      {/* Background */}
      {backdrop_path && (
        <Image
          src={imageUrl(backdrop_path, 'original')}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* Content - left aligned, vertically centered */}
      <div className="relative z-10 h-full flex items-center pl-6 md:pl-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{title}</h1>
          {overview && (
            <p className="mt-3 md:mt-4 text-sm md:text-base text-white/80 line-clamp-4 md:line-clamp-5">
              {overview}
            </p>
          )}
          <div className="mt-4 md:mt-6 flex gap-3">
            <button className="px-4 md:px-5 py-2 bg-white text-black rounded-md font-semibold hover:bg-white/90">
              Play
            </button>
            <button
              onClick={() => setOpen(true)}
              className="px-4 md:px-5 py-2 bg-white/20 hover:bg-white/30 rounded-md"
            >
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal (reuses your existing component) */}
      <DetailModal open={open} onClose={() => setOpen(false)} mediaType={mediaType} id={id} />
    </section>
  );
}
