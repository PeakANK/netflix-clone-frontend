export type Genre = { id: number; name: string };

export interface MovieListItem {
  id: number;
  title: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average?: number;
  release_date?: string;
  genre_ids: number[];
  popularity?: number;
}

export interface TVListItem {
  id: number;
  name: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average?: number;
  first_air_date?: string;
  genre_ids: number[];
  popularity?: number;
}

export interface MovieDetail
  extends Omit<MovieListItem, "genre_ids"> { genres: Genre[]; runtime?: number; }

export interface TVDetail
  extends Omit<TVListItem, "genre_ids"> { genres: Genre[]; episode_run_time?: number[]; }

export type PagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type GenreList = { genres: Genre[] };
