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
  const backdrop = item.backdrop_path || item.poster_path;
  const img = backdrop ? `https://image.tmdb.org/t/p/original${backdrop}` : undefined;

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full">
      {/* {img && (
        <Image
          src={img}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )} */}

      {/* gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent" />

      <div className="absolute bottom-24 left-4 right-4 md:left-16 md:right-[30%] space-y-4">
        <h1 className="text-3xl md:text-6xl font-extrabold drop-shadow-lg">
          {title}
        </h1>
        {item.overview && (
          <p className="max-w-2xl text-sm md:text-base text-neutral-200/90 line-clamp-3">
            {item.overview}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button className="rounded-md bg-white px-5 py-2.5 text-neutral-900 font-semibold hover:bg-neutral-200 transition">
            ▶ Play
          </button>
          <button className="rounded-md bg-neutral-700/60 px-5 py-2.5 font-semibold hover:bg-neutral-600/80 transition">
            ℹ More Info
          </button>
        </div>
      </div>
    </section>
  );
}
