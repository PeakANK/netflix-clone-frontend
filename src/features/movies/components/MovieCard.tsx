"use client";
import Image from "next/image";
import type { MovieListItem, TVListItem } from "@/types/tmdb";
type MediaItem = MovieListItem | TVListItem;

export default function MovieCard({
  item,
  onClick,
}: {
  item: MediaItem;
  onClick: (id: number) => void;
}) {
  const title = "title" in item ? item.title : item.name;
  return (
    <button
      onClick={() => onClick(item.id)}
      className="group relative aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-lg bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600"
      title={title}
    >
      {item.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
          alt={title}
          fill
          sizes="160px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </button>
  );
}
