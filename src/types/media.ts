export interface Media {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  media_type?: "movie" | "tv";
}

export interface Paginated<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
