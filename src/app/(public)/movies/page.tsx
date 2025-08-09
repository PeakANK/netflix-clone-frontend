import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getUpcomingMovies } from "@/lib/movies";
import SectionRow from "@/components/composite/SectionRow";
import type { PagedResponse, MovieListItem } from "@/types/tmdb";

export default async function MoviesPage() {
  const [popular, topRated, nowPlaying, upcoming]: [
    PagedResponse<MovieListItem>,
    PagedResponse<MovieListItem>,
    PagedResponse<MovieListItem>,
    PagedResponse<MovieListItem>
  ] = await Promise.all([
    getPopularMovies(1),
    getTopRatedMovies(1),
    getNowPlayingMovies(1),
    getUpcomingMovies(1),
  ]);

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="mt-16 relative z-10 pb-20 space-y-10 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionRow title="Popular Movies" items={popular.results} />
        <SectionRow title="Top Rated Movies" items={topRated.results} />
        <SectionRow title="Now Playing Movies" items={nowPlaying.results} />
        <SectionRow title="Upcoming Movies" items={upcoming.results} />
      </main>
    </div>
  );
}
