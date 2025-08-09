"use client";
import RowCard from "@/components/unit/RowCard";

type Item = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average?: number;
};

export default function SectionRow({ title, items }: { title: string; items: Item[] }) {
  return (
    <section className="space-y-3">
      <h2 className="px-4 md:px-0 text-lg md:text-xl font-semibold">{title}</h2>
      <div className="group relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-neutral-950 to-transparent z-10" />
        <div className="flex gap-3 overflow-x-auto scroll-smooth px-4 md:px-0 snap-x snap-mandatory scrollbar-hide">
          {items?.map(m => <RowCard key={m.id} item={m} />)}
        </div>
      </div>
    </section>
  );
}
