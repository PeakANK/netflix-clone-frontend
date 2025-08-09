import { apiGet } from "./api";
import type { PagedResponse, MovieListItem, TVListItem, MovieDetail, TVDetail, GenreList } from "@/types/tmdb";

// Movies
export const getPopularMovies    = (page=1) => apiGet<PagedResponse<MovieListItem>>("/movies/popular",   { page });
export const getTopRatedMovies   = (page=1) => apiGet<PagedResponse<MovieListItem>>("/movies/top-rated", { page });
export const getNowPlayingMovies = (page=1) => apiGet<PagedResponse<MovieListItem>>("/movies/now-playing",{ page });
export const getUpcomingMovies   = (page=1) => apiGet<PagedResponse<MovieListItem>>("/movies/upcoming",  { page });

// TV
export const getPopularTV        = (page=1) => apiGet<PagedResponse<TVListItem>>("/tv/popular",    { page });
export const getTopRatedTV       = (page=1) => apiGet<PagedResponse<TVListItem>>("/tv/top-rated",  { page });
export const getOnTheAirTV       = (page=1) => apiGet<PagedResponse<TVListItem>>("/tv/on-the-air", { page });

// Details
export const getMovieDetails     = (id:number) => apiGet<MovieDetail>(`/movies/${id}`);
export const getTVDetails        = (id:number) => apiGet<TVDetail>(`/tv/${id}`);

// Genres
export const getGenres           = () => apiGet<GenreList>("/movies/genres/list");

// Combined (optional)
export const getNewAndPopular    = (page=1) => apiGet<{ movies: MovieListItem[]; tv: TVListItem[] }>("/new-and-popular", { page });
