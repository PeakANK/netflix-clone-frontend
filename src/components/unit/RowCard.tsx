"use client";
import Image from "next/image";
import Link from "next/link";
import type { MovieListItem, TVListItem } from "@/types/tmdb";

function displayTitle(item: MovieListItem | TVListItem) {
  return (item as MovieListItem).title ?? (item as TVListItem).name ?? "Untitled";
}

export default function RowCard({ item }: { item: MovieListItem | TVListItem }) {
  const title = displayTitle(item);
  const path = item.poster_path || item.backdrop_path || "";
  const url = path ? `https://image.tmdb.org/t/p/w342${path}` : "";

  return (
    <Link href={`/movie/${item.id}`} className="snap-start">
      <div className="relative w-[40vw] sm:w-[28vw] md:w-[18vw] lg:w-[14vw] aspect-[2/3] shrink-0 rounded-md overflow-hidden bg-neutral-800/50 ring-1 ring-white/5 transition-transform duration-200 hover:z-20 hover:scale-105">
        {url ? (
          <Image src={url} alt={title} fill sizes="(max-width: 768px) 40vw, (max-width: 1024px) 18vw, 14vw" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 hover:opacity-100 transition-opacity">
          <p className="text-[13px] font-semibold line-clamp-2">{title}</p>
          {"vote_average" in item && item.vote_average
            ? <p className="mt-1 text-xs text-neutral-300">★ {item.vote_average.toFixed(1)}</p>
            : null}
        </div>
      </div>
    </Link>
  );
}
