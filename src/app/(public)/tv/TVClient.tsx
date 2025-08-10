"use client";

import { useState } from "react";
import type { TVListItem } from "@/types/tmdb";
import { SectionRow } from "@/features/movies";    // SectionRow handles Movie | TV
import { TVDetailModal } from "@/features/tv";

export default function TVClient({
  popular,
  topRated,
  onTheAir,
}: {
  popular: TVListItem[];
  topRated: TVListItem[];
  onTheAir: TVListItem[];
}) {
  const [id, setId] = useState<number | null>(null);

  return (
    <>
      <main className="mt-16 relative z-10 pb-20 space-y-10 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionRow title="Popular TV" items={popular} onItemClick={(id) => setId(id)} />
        <SectionRow title="Top Rated TV" items={topRated} onItemClick={(id) => setId(id)} />
        <SectionRow title="On The Air"   items={onTheAir} onItemClick={(id) => setId(id)} />
      </main>

      <TVDetailModal tvId={id} open={id != null} onClose={() => setId(null)} />
    </>
  );
}
