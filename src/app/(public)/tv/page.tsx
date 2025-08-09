import { getPopularTV, getTopRatedTV, getOnTheAirTV } from "@/lib/movies";
import SectionRow from "@/components/composite/SectionRow";
import type { PagedResponse, TVListItem } from "@/types/tmdb";

export default async function TVPage() {
  const [popular, topRated, onAir]: [
    PagedResponse<TVListItem>,
    PagedResponse<TVListItem>,
    PagedResponse<TVListItem>
  ] = await Promise.all([getPopularTV(1), getTopRatedTV(1), getOnTheAirTV(1)]);

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="mt-16 relative z-10 pb-20 space-y-10 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionRow title="Popular TV Shows" items={popular.results} />
        <SectionRow title="Top Rated TV Shows" items={topRated.results} />
        <SectionRow title="Currently Airing" items={onAir.results} />
      </main>
    </div>
  );
}
