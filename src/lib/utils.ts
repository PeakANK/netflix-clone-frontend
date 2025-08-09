import type { Genre, MovieListItem, TVListItem, MovieDetail, TVDetail } from "@/types/tmdb";

type WithGenres = MovieDetail | TVDetail;
type WithGenreIds = MovieListItem | TVListItem;

export const titleOf = (x: any) => x?.title ?? x?.name ?? "Untitled";

export function getGenreNames(item: WithGenres | WithGenreIds, all: Genre[], n = 2) {
  if ("genres" in item && Array.isArray(item.genres)) return item.genres.slice(0, n).map(g => g.name);
  const ids = (item as WithGenreIds).genre_ids ?? [];
  return ids.map(id => all.find(g => g.id === id)?.name).filter(Boolean).slice(0, n) as string[];
}
