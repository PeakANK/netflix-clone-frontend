import TVClient from "./TVClient";
import type { PagedResponse, TVListItem } from "@/types/tmdb";
import { getPopularTV, getTopRatedTV, getOnTheAirTV } from "@/features/tv";

export default async function TVPage() {
  const [popular, topRated, onTheAir]: [
    PagedResponse<TVListItem>,
    PagedResponse<TVListItem>,
    PagedResponse<TVListItem>
  ] = await Promise.all([
    getPopularTV(1),
    getTopRatedTV(1),
    getOnTheAirTV(1),
  ]);

  return (
    <div className="bg-black text-white min-h-screen">
      <TVClient
        popular={popular.results}
        topRated={topRated.results}
        onTheAir={onTheAir.results}
      />
    </div>
  );
}
