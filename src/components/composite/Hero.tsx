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
  const bgUrl = path ? `https://image.tmdb.org/t/p/original${path}` : "";

  return (
    <section
      className="
        relative w-full
        h-[56vh] sm:h-[62vh] md:h-[70vh] lg:h-[76vh] xl:h-[82vh]
      "
    >
      {bgUrl && (
        <Image
          src={bgUrl}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Readability/transition gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

      {/* Centered content */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-4 sm:px-8 md:px-16 max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            {title}
          </h1>

          {item.overview && (
            <p className="text-neutral-200/90 text-sm sm:text-base max-w-xl leading-relaxed line-clamp-3">
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
      </div>
    </section>
  );
}
