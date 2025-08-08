"use client";

import { useMemo } from "react";
import { backdrop } from "@/lib/image";
import type { Media } from "@/types/media";

export default function Hero({ items }: { items: Media[] }) {
  const featured = useMemo(() => items[Math.floor(Math.random() * items.length)], [items]);
  const title = featured?.title || featured?.name || "Featured";
  return (
    <section className="relative aspect-[16/7] w-full overflow-hidden">
      <img
        src={backdrop(featured?.backdrop_path, "w1280")}
        alt={title}
        className="h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute bottom-10 left-4 md:left-10 max-w-2xl">
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-3 line-clamp-3 text-sm text-neutral-200 md:text-base">
          {featured?.overview}
        </p>
        <div className="mt-5 flex gap-3">
          <button className="rounded bg-white px-4 py-2 text-black">► Play</button>
          <button className="rounded bg-neutral-700 px-4 py-2">More Info</button>
        </div>
      </div>
    </section>
  );
}
