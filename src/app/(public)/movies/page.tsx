import MoviesClient from "./MoviesClient";
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getUpcomingMovies } from "@/lib/movies";
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
      <MoviesClient
        popular={popular.results}
        topRated={topRated.results}
        nowPlaying={nowPlaying.results}
        upcoming={upcoming.results}
      />
    </div>
  );
}
