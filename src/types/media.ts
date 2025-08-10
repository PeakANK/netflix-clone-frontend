export type Genre = {
  id: number;
  name: string;
};

export type Video = {
  key: string;
  site: string;
  type: string;
  official?: boolean;
};

export type Cast = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
};

export type MediaDetails = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  vote_average?: number;
  genres?: Genre[];
  overview?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  videos?: { results: Video[] };
  credits?: { cast: Cast[] };
};
