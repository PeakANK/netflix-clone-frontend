// src/components/Hero.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { imageUrl } from '@/lib/queries';
import DetailModal from './DetailModal';
import AddToListButton from './AddToListButton'; // <-- import

type Props = {
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  overview?: string;
  backdrop_path?: string | null;
  subtitle?: string;
};

export default function Hero({
  id,
  mediaType,
  title,
  overview,
  backdrop_path,
  subtitle,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative w-full h-[82vh] md:h-[80vh] overflow-hidden">
      {/* Background image */}
      {backdrop_path && (
        <Image
          src={imageUrl(backdrop_path, 'original')}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex md:items-center items-end pb-20">
        <div className="w-full px-4 md:px-10 flex flex-col items-center text-center md:items-start md:text-left mx-auto">
          <h1 className="text-4xl leading-tight font-extrabold md:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 text-[13px] text-white/80 md:hidden">{subtitle}</p>
          )}

          {overview && (
            <p className="mt-3 hidden sm:block text-sm md:text-base text-white/80 line-clamp-4 md:line-clamp-5 max-w-xl md:max-w-2xl">
              {overview}
            </p>
          )}

          {/* Action Buttons */}
          <div className="mt-4 md:mt-6 flex items-center gap-4">
            {/* My List (now functional) */}
            <AddToListButton
              item={{
                id,
                type: mediaType,
                title: title,
                poster: backdrop_path ?? null,
              }}
            />

            {/* Play */}
            <button
              className="flex items-center justify-center gap-2 px-6 md:px-7 py-2.5 rounded-md bg-white text-black font-semibold hover:bg-white/90"
              onClick={() => {}}
            >
              ▶ <span>Play</span>
            </button>

            {/* Info */}
            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center gap-2 px-6 md:px-7 py-2.5 rounded-md bg-white/10 text-white/90 font-semibold hover:bg-white/20"
            >
              ⓘ <span className="hidden sm:inline">Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal open={open} onClose={() => setOpen(false)} mediaType={mediaType} id={id} />
    </section>
  );
}
