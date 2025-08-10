"use client";
import Image from "next/image";
import Link from "next/link";
import type { MovieListItem, TVListItem } from "@/types/tmdb";

type MediaItem = MovieListItem | TVListItem;

function titleOf(i: MediaItem) {
  return "title" in i ? i.title : i.name;
}

export default function RowCard({
  item,
  onOpen, // optional: when present, we intercept normal clicks to open modal
}: {
  item: MediaItem;
  onOpen?: (id: number, item: MediaItem) => void;
}) {
  const title = titleOf(item);
  const path = item.poster_path || item.backdrop_path || "";
  const url = path ? `https://image.tmdb.org/t/p/w342${path}` : "";

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!onOpen) return; // behave like a normal link
    // allow modified/middle clicks to open in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onOpen(item.id, item);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(item.id, item);
    }
  }

  return (
    <Link
      href={`/movie/${item.id}`}
      className="snap-start"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`${title} details`}
    >
      <div
        className="
          relative shrink-0 aspect-[2/3] overflow-hidden rounded-md bg-neutral-800/50 ring-1 ring-white/5
          w-[44vw] sm:w-[30vw] md:w-[22vw] lg:w-[16vw] xl:w-[12vw] 2xl:w-[10vw]
          max-w-[240px] 2xl:max-w-[220px]
          transition-transform duration-200 hover:z-20 hover:scale-105
        "
      >
        {url ? (
          <Image
            src={url}
            alt={title}
            fill
            className="object-cover"
            sizes="
              (min-width:1536px) 10vw,
              (min-width:1280px) 12vw,
              (min-width:1024px) 16vw,
              (min-width:768px) 22vw,
              (min-width:640px) 30vw,
              44vw
            "
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
            No image
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 hover:opacity-100 transition-opacity">
          <p className="text-[13px] font-semibold line-clamp-2">{title}</p>
          {"vote_average" in item && typeof item.vote_average === "number" ? (
            <p className="mt-1 text-xs text-neutral-300">★ {item.vote_average.toFixed(1)}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
