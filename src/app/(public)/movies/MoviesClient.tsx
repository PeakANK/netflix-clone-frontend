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
      <main className="mt-16 relative z-10 pb-20 space-y-10 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionRow title="Popular Movies" items={popular} onItemClick={handleOpen} />
        <SectionRow title="Top Rated Movies" items={topRated} onItemClick={handleOpen} />
        <SectionRow title="Now Playing Movies" items={nowPlaying} onItemClick={handleOpen} />
        <SectionRow title="Upcoming Movies" items={upcoming} onItemClick={handleOpen} />
      </main>

      <MovieDetailModal movieId={selectedId} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
