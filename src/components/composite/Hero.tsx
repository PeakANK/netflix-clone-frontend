import Image from "next/image";

type Item = {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
};

export default function Hero({ item }: { item: Item }) {
  const title = item.title ?? item.name ?? "Featured";
  const path = item.backdrop_path || item.poster_path || "";
  const url = path ? `https://image.tmdb.org/t/p/original${path}` : "";

  return (
    <section className="relative h-[78vh] md:h-[86vh] w-full">
      {url && (
        <Image src={url} alt={title} fill priority className="object-cover" sizes="100vw" />
      )}

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-4 md:inset-x-16 inset-y-0 flex flex-col justify-center max-w-3xl space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">
          {title}
        </h1>

        {item.overview && (
          <p
            className="
              text-sm md:text-base text-neutral-200/90
              max-w-xl /* keeps it from stretching too wide */
              line-clamp-3 /* limits number of visible lines */
              leading-relaxed
            "
          >
            {item.overview}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button className="rounded-md bg-white px-5 py-2.5 text-neutral-900 font-semibold hover:bg-neutral-200 transition">
            ▶ Play
          </button>
          <button className="rounded-md bg-neutral-700/70 px-5 py-2.5 font-semibold hover:bg-neutral-600/80 transition">
            ℹ More Info
          </button>
        </div>
      </div>
    </section>
  );
}
