// src/app/my-lists/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DetailModal from '@/components/DetailModal';
import { getMyList, type ListItem } from '@/lib/utils';
import { imageUrl } from '@/lib/queries';

export default function MyListsPage() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<'movie' | 'tv'>('movie');

  // Load list once and whenever localStorage changes (e.g., removed from modal)
  const refresh = () => setItems(getMyList());

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'my-list') refresh();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const openDetail = (it: ListItem) => {
    setActiveId(it.id);
    setActiveType(it.type);
    setOpen(true);
  };

  return (
    <main className="px-4 md:px-8 pb-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Lists</h1>

      {items.length === 0 ? (
        <p className="text-white/60">Your list is empty. Add something from the home page.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((it) => (
            <button
              key={`${it.type}-${it.id}`}
              onClick={() => openDetail(it)}
              className="text-left group"
              aria-label={`Open details for ${(it.title ?? 'Untitled')}`}
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-neutral-900 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
                {it.poster ? (
                  <Image
                    src={imageUrl(it.poster, 'w500')}
                    alt={it.title ?? 'Poster'}
                    fill
                    sizes="(min-width: 1280px) 240px, (min-width: 768px) 20vw, 45vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-white/50 text-sm">
                    No Image
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm font-semibold line-clamp-2">
                {it.title ?? 'Untitled'}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail modal (no check button on cards; action stays inside the modal) */}
      <DetailModal
        open={open}
        onClose={() => setOpen(false)}
        mediaType={activeType}
        id={activeId}
      />
    </main>
  );
}
