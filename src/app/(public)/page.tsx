import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "@/lib/movies";
import Hero from "@/components/composite/Hero";
import SectionRow from "@/components/composite/SectionRow";

type SP = Promise<{ page?: string | string[] }>;

export default async function HomePage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const pageStr = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const page = Math.max(1, Number(pageStr ?? 1) || 1);

  const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
    getPopularMovies(page),
    getTopRatedMovies(page),
    getUpcomingMovies(page),
    getNowPlayingMovies(page),
    // getTrendingMovies("day", page),
  ]);

  const heroItem =
    popular?.results?.[0] ??
    topRated?.results?.[0] ??
    nowPlaying?.results?.[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {heroItem && <Hero item={heroItem} />}

      <section className="-mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 relative z-10 pb-24">
        <div className="space-y-10 px-3 sm:px-4 md:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
          <SectionRow title="Popular on Netflix" items={popular?.results ?? []} />
          <SectionRow title="Top Rated" items={topRated?.results ?? []} />
          <SectionRow title="Now Playing" items={nowPlaying?.results ?? []} />
          <SectionRow title="Upcoming" items={upcoming?.results ?? []} />
        </div>
      </section>
    </div>
  );
}
