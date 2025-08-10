"use client";
import { useState } from "react";
import type { MovieListItem } from "@/types/tmdb";
import { SectionRow, MovieDetailModal } from "@/features/movies";

export default function HomeClient({
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
  const open = (x: number) => setId(x);

  return (
    <>
      <section className="-mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 relative z-10 pb-24">
        <div className="space-y-10 px-3 sm:px-4 md:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
          <SectionRow title="Popular on Netflix" items={popular}   onItemClick={open} />
          <SectionRow title="Top Rated"         items={topRated}   onItemClick={open} />
          <SectionRow title="Now Playing"       items={nowPlaying} onItemClick={open} />
          <SectionRow title="Upcoming"          items={upcoming}   onItemClick={open} />
        </div>
      </section>

      <MovieDetailModal movieId={id} open={id != null} onClose={() => setId(null)} />
    </>
  );
}
