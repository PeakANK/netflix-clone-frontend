import { apiGet } from "@/lib/api";
import type { PagedResponse, TVListItem } from "@/types/tmdb";

export const getPopularTV  = (page=1) => apiGet<PagedResponse<TVListItem>>("/tv/popular",    { page });
export const getTopRatedTV = (page=1) => apiGet<PagedResponse<TVListItem>>("/tv/top-rated",  { page });
export const getOnTheAirTV = (page=1) => apiGet<PagedResponse<TVListItem>>("/tv/on-the-air", { page });
// (add airing_today if your API supports it)
