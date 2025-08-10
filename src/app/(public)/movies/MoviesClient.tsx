"use client";
import { useState } from "react";
import type { MovieListItem } from "@/types/tmdb";
import { SectionRow, MovieDetailModal } from "@/features/movies";

export default function MoviesClient({
  popular,
  topRated,
  nowPlaying,
  upcoming,
}: {
  popular: MovieListItem[];
  topRated: MovieListItem[];
  nowPlaying: MovieListItem[];
  upcoming: MovieListItem[];
}) {
  const [id, setId] = useState<number | null>(null);

  return (
    <>
      <main className="mt-16 relative z-10 pb-20 space-y-10 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionRow title="Popular Movies" items={popular}   onItemClick={(id) => setId(id)} />
        <SectionRow title="Top Rated Movies" items={topRated} onItemClick={(id) => setId(id)} />
        <SectionRow title="Now Playing Movies" items={nowPlaying} onItemClick={(id) => setId(id)} />
        <SectionRow title="Upcoming Movies" items={upcoming}   onItemClick={(id) => setId(id)} />
      </main>

      <MovieDetailModal movieId={id} open={id != null} onClose={() => setId(null)} />
    </>
  );
}
