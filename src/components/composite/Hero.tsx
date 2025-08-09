import Image from "next/image";
import type { MovieListItem, TVListItem, MovieDetail, TVDetail, Genre } from "@/types/tmdb";
import { getGenreNames, titleOf } from "@/lib/utils";

type HeroItem = MovieListItem | TVListItem | MovieDetail | TVDetail;

export default function Hero({ item, genres, logoUrl }: { item: HeroItem; genres?: Genre[]; logoUrl?: string }) {
  const title = titleOf(item);
  const path = item.backdrop_path || item.poster_path || "";
  const bgUrl = path ? `https://image.tmdb.org/t/p/original${path}` : "";
  const subline = genres ? getGenreNames(item, genres, 2).join(" • ") : undefined;

  return (
    <section className="relative h-[78vh] md:h-[86vh] w-full">
      {bgUrl && <Image src={bgUrl} alt={title} fill priority className="object-cover" sizes="100vw" />}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-4 md:inset-x-16 inset-y-0 flex flex-col justify-center max-w-3xl space-y-4">
        {logoUrl ? (
          <div className="relative h-14 md:h-24 w-auto">
            <Image src={logoUrl} alt={`${title} logo`} width={800} height={300} className="h-full w-auto" priority />
          </div>
        ) : (
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">{title}</h1>
        )}
        {subline && <p className="text-white/90 text-sm md:text-base">{subline}</p>}
        {"overview" in item && item.overview && (
          <p className="text-neutral-200/90 text-sm md:text-base max-w-xl leading-relaxed line-clamp-3">{item.overview}</p>
        )}
        <div className="flex gap-3 pt-2">
          <button className="rounded-md bg-white px-5 py-2.5 text-neutral-900 font-semibold hover:bg-neutral-200 transition">▶ Play</button>
          <button className="rounded-md bg-neutral-700/70 px-5 py-2.5 font-semibold hover:bg-neutral-600/80 transition">ℹ More Info</button>
        </div>
      </div>
    </section>
  );
}
