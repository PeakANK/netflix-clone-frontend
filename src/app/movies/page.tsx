import SectionRow from '@/components/SectionRow';

export default function MoviesPage() {
  return (
    <div className="space-y-2">
      <h1 className="px-6 text-2xl font-bold mt-4">Movies</h1>
      <SectionRow title="Popular" endpoint="/api/movies/popular" mediaType="movie" />
      <SectionRow title="Top Rated" endpoint="/api/movies/top_rated" mediaType="movie" />
      <SectionRow title="Now Playing" endpoint="/api/movies/now_playing" mediaType="movie" />
      <SectionRow title="Upcoming" endpoint="/api/movies/upcoming" mediaType="movie" />
    </div>
  );
}
