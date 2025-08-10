import Hero from '@/components/Hero';
import SectionRow from '@/components/SectionRow';
import { apiGet } from '@/lib/api';
import type { PagedResponse, MovieListItem } from '@/types/tmdb';

export default async function HomePage() {
  const [popularMovies, popularTv] = await Promise.all([
    apiGet<PagedResponse<MovieListItem>>('/api/movies/popular', { page: 1 }),
    apiGet<PagedResponse<MovieListItem>>('/api/tv/popular', { page: 1 }),
  ]);

  const hero = (popularMovies.results?.[0] ?? popularTv.results?.[0]);
  const heroTitle = hero?.title ?? hero?.name ?? 'Featured';

  return (
    <div className="space-y-6">
      <Hero title={heroTitle} overview={hero?.overview} backdrop_path={hero?.backdrop_path} />

      <SectionRow title="Trending Movies" endpoint="/api/movies/popular" mediaType="movie" />
      <SectionRow title="Top Rated Movies" endpoint="/api/movies/top_rated" mediaType="movie" />
      <SectionRow title="Now Playing" endpoint="/api/movies/now_playing" mediaType="movie" />
      <SectionRow title="Upcoming" endpoint="/api/movies/upcoming" mediaType="movie" />

      <SectionRow title="Popular TV" endpoint="/api/tv/popular" mediaType="tv" />
      <SectionRow title="Top Rated TV" endpoint="/api/tv/top_rated" mediaType="tv" />
      <SectionRow title="Airing Today" endpoint="/api/tv/airing_today" mediaType="tv" />
      <SectionRow title="On The Air" endpoint="/api/tv/on_the_air" mediaType="tv" />
    </div>
  );
}
