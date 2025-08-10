import { apiGet } from "@/lib/api";
import type { MovieDetail, TVDetail } from "@/types/tmdb";

export const getMovieDetailsClient = (id: number) =>
  apiGet<MovieDetail>("/api/movie", { id }); // only send id

// Optional (if you build TV modal later)
export const getTVDetailsClient = (id: number) =>
  apiGet<TVDetail>("/api/tv", { id });
