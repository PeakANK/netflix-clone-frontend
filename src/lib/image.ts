const IMG = process.env.NEXT_PUBLIC_IMG_BASE ?? "https://image.tmdb.org/t/p";
export const poster = (p?: string | null, size: "w185"|"w342"|"w500" = "w342") =>
  p ? `${IMG}/${size}${p}` : "/logo.svg";
export const backdrop = (p?: string | null, size: "w780"|"w1280" = "w1280") =>
  p ? `${IMG}/${size}${p}` : "/logo.svg";
