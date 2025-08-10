'use client';

import { useEffect, useState } from 'react';
import MediaCard from '@/components/MediaCard';
import AddToListButton from '@/components/AddToListButton';
import { getMyList, ListItem } from '@/lib/utils';

export default function ListsPage() {
  const [items, setItems] = useState<ListItem[]>([]);

  useEffect(() => { setItems(getMyList()); }, []);

  return (
    <div>
      <h1 className="px-6 text-2xl font-bold mt-4">My Lists</h1>
      {items.length === 0 ? (
        <div className="px-6 mt-4 text-white/70">No items yet—add some from rows.</div>
      ) : (
        <div className="px-6 mt-4 grid gap-6 grid-cols-[repeat(auto-fill,minmax(154px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {items.map((m) => (
            <MediaCard
              key={`${m.type}-${m.id}`}
              id={m.id}
              title={m.title}
              poster_path={m.poster}
              footer={<AddToListButton item={m} />}
            />
          ))}
        </div>
      )}
    </div>
  );
}
