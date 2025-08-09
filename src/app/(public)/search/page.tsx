import { searchMovies } from "@/lib/movies";
import SectionRow from "@/components/composite/SectionRow";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? "";
  const data = q ? await searchMovies(q) : { results: [] };
  return (
    <div className="px-4 md:px-8">
      <h1 className="mb-4 text-2xl font-semibold">Search: {q || "—"}</h1>
      <SectionRow title="Results" items={data.results} />
    </div>
  );
}
