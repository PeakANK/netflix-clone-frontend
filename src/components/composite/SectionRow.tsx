import MediaCard from "@/components/MediaCard";
import type { Media } from "@/types/media";

export default function SectionRow({ title, items }: { title: string; items: Media[] }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-700">
        {items.map((m) => (
          <MediaCard key={`${m.media_type ?? "m"}-${m.id}`} item={m} />
        ))}
      </div>
    </section>
  );
}
