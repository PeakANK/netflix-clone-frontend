import { apiGet } from "@/lib/api";
import type { TVDetail } from "@/types/tmdb";

export const getTVDetailsClient = (id: number) =>
  apiGet<TVDetail>("/api/tv", { id }); // only send the id
