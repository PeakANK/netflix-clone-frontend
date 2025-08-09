import { apiGet } from "./api";
import type { PagedResponse, Movie, GenreList } from "@/types/tmdb";

export const getPopularMovies = (page=1) => apiGet<PagedResponse<Movie>>("/movies/popular", { page });
export const getTopRatedMovies = (page=1) => apiGet<PagedResponse<Movie>>("/movies/top-rated", { page });
export const getUpcomingMovies = (page=1) => apiGet<PagedResponse<Movie>>("/movies/upcoming", { page });
export const getNowPlayingMovies = (page=1) => apiGet<PagedResponse<Movie>>("/movies/now-playing", { page });
export const getTrendingMovies = (window:"day"|"week"="day", page=1) =>
  apiGet<PagedResponse<Movie>>(`/movies/trending/${window}`, { page });

export const searchMovies = (q:string, page=1) =>
  apiGet<PagedResponse<Movie>>("/movies/search", { q, page });

export const getMovieDetails = (id:number, append?:string[]) =>
  apiGet<any>(`/movies/${id}`, { append: append?.join(",") });

export const getMovieCredits = (id:number) =>
  apiGet<any>(`/movies/${id}/credits`);

export const getMovieVideos  = (id:number) =>
  apiGet<any>(`/movies/${id}/videos`);

export const getGenres = () =>
  apiGet<GenreList>("/movies/genres/list");

export const discoverMovies = (params: { page?:number; with_genres?:string; sort_by?:string; year?:number; lang?:string } = {}) =>
  apiGet<PagedResponse<Movie>>("/movies/discover/list", params as any);
