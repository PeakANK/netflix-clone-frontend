"use client";

import RowCard from "@/components/unit/RowCard";
import type { MovieListItem, TVListItem } from "@/types/tmdb";
type MediaItem = MovieListItem | TVListItem;

export default function SectionRow({
  title,
  items,
  onItemClick,
}: {
  title: string;
  items: MediaItem[];
  onItemClick?: (id: number, item: MediaItem) => void;
}) {
  if (!items?.length) return null;

  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex overflow-x-auto gap-2 snap-x snap-mandatory scrollbar-hide">
        {items.map((item) => (
          <RowCard
            key={item.id}
            item={item}
            onOpen={onItemClick ? (id) => onItemClick(id, item) : undefined}
          />
        ))}
      </div>
    </section>
  );
}
