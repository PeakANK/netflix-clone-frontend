"use client";

import { useState } from "react";
import type { MovieListItem } from "@/types/tmdb";
import SectionRow from "@/components/composite/SectionRow";
import MovieDetailModal from "@/components/composite/MovieDetailModal";

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
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  return (
    <>
      <section className="-mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 relative z-10 pb-24">
        <div className="space-y-10 px-3 sm:px-4 md:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
          <SectionRow title="Popular on Netflix" items={popular} onItemClick={handleOpen} />
          <SectionRow title="Top Rated" items={topRated} onItemClick={handleOpen} />
          <SectionRow title="Now Playing" items={nowPlaying} onItemClick={handleOpen} />
          <SectionRow title="Upcoming" items={upcoming} onItemClick={handleOpen} />
        </div>
      </section>

      <MovieDetailModal
        movieId={selectedId}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
