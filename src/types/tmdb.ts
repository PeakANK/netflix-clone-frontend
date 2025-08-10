export interface PagedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieListItem {
  id: number;
  title?: string;          // movie
  name?: string;           // tv
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview: string;
  media_type?: 'movie' | 'tv' | 'person';
}
