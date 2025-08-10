import { apiGet } from "@/lib/api";
import type { PagedResponse, MovieListItem, TVListItem } from "@/types/tmdb";

export const getPopularMovies    = (page=1) => apiGet<PagedResponse<MovieListItem>>("/movies/popular",     { page });
export const getTopRatedMovies   = (page=1) => apiGet<PagedResponse<MovieListItem>>("/movies/top-rated",   { page });
export const getNowPlayingMovies = (page=1) => apiGet<PagedResponse<MovieListItem>>("/movies/now-playing", { page });
export const getUpcomingMovies   = (page=1) => apiGet<PagedResponse<MovieListItem>>("/movies/upcoming",    { page });

// (Optional TV list fetchers if you need them on server pages too)
export const getPopularTV        = (page=1) => apiGet<PagedResponse<TVListItem>>("/tv/popular",    { page });
export const getTopRatedTV       = (page=1) => apiGet<PagedResponse<TVListItem>>("/tv/top-rated",  { page });
export const getOnTheAirTV       = (page=1) => apiGet<PagedResponse<TVListItem>>("/tv/on-the-air", { page });
