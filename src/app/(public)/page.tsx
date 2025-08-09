// src/app/(public)/page.tsx
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getTrendingMovies,
} from "@/lib/movies";
import Hero from "@/components/composite/Hero";
import SectionRow from "@/components/composite/SectionRow";

type SP = Promise<{ page?: string | string[] }>;

export default async function HomePage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const pageStr = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const page = Math.max(1, Number(pageStr ?? 1) || 1);

  const [popular, topRated, upcoming, nowPlaying, trendingDay] = await Promise.all([
    getPopularMovies(page),
    getTopRatedMovies(page),
    getUpcomingMovies(page),
    getNowPlayingMovies(page),
    getTrendingMovies("day", page),
  ]);

  const heroItem =
    popular?.results?.[0] ??
    trendingDay?.results?.[0] ??
    topRated?.results?.[0] ??
    nowPlaying?.results?.[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {heroItem && <Hero item={heroItem} />}

      <main className="-mt-16 relative z-10 pb-20">
        <div className="space-y-8 px-4 md:px-8">
          <SectionRow title="Popular on Netflix" items={popular?.results ?? []} />
          <SectionRow title="Top Rated" items={topRated?.results ?? []} />
          <SectionRow title="Now Playing" items={nowPlaying?.results ?? []} />
          <SectionRow title="Upcoming" items={upcoming?.results ?? []} />
          <SectionRow title="Trending Today" items={trendingDay?.results ?? []} />
        </div>
      </main>

      {/* background vignette */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.12),rgba(0,0,0,0))] opacity-25"></div>
    </div>
  );
}
