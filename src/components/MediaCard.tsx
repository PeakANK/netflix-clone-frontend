"use client";

import Link from "next/link";
import { poster } from "@/lib/image";
import type { Media } from "@/types/media";

export default function MediaCard({ item }: { item: Media }) {
  const title = item.title || item.name || "Untitled";
  const href = item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`;
  return (
    <Link href={href} className="group relative w-40 shrink-0 md:w-48" prefetch={false}>
      <img
        src={poster(item.poster_path, "w342")}
        alt={title}
        className="h-56 w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="mt-1 line-clamp-1 text-sm text-neutral-200">{title}</div>
    </Link>
  );
}
