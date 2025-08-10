import Hero from "@/components/composite/Hero";
import type { PagedResponse, MovieListItem } from "@/types/tmdb";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "@/features/movies";
import HomeClient from "./HomeClient";

type SP = Promise<{ page?: string | string[] }>;

export default async function HomePage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const pageStr = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const page = Math.max(1, Number(pageStr ?? 1) || 1);

  const [popular, topRated, upcoming, nowPlaying]: [
    PagedResponse<MovieListItem>,
    PagedResponse<MovieListItem>,
    PagedResponse<MovieListItem>,
    PagedResponse<MovieListItem>
  ] = await Promise.all([
    getPopularMovies(page),
    getTopRatedMovies(page),
    getUpcomingMovies(page),
    getNowPlayingMovies(page),
  ]);

  const heroItem =
    popular?.results?.[0] ??
    topRated?.results?.[0] ??
    nowPlaying?.results?.[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {heroItem && <Hero item={heroItem} />}
      <HomeClient
        popular={popular.results}
        topRated={topRated.results}
        nowPlaying={nowPlaying.results}
        upcoming={upcoming.results}
      />
    </div>
  );
}
