import { apiData } from "@/lib/api";
import type { Paginated, Media } from "@/types/media";

export const getPopularMovies = (page = 1) =>
  apiData<Paginated<Media>>(`/movies/popular?page=${page}`);

// export const getTrending = () => apiData<Paginated<Media>>(`/trending`);
// export const getTopRatedMovies = () => apiData<Paginated<Media>>(`/movies/top-rated`);
// export const getPopularTV = () => apiData<Paginated<Media>>(`/tv/popular`);
// export const getMovie = (id: string) => apiData<Media>(`/movies/${id}`);
// export const getTV = (id: string) => apiData<Media>(`/tv/${id}`);
// export const searchAll = (q: string) =>
//   apiData<Paginated<Media>>(`/search?q=${encodeURIComponent(q)}`);
