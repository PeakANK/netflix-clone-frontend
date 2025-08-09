export const tmdb = {
  original: (path?: string | null) => (path ? `https://image.tmdb.org/t/p/original${path}` : ""),
  w342:     (path?: string | null) => (path ? `https://image.tmdb.org/t/p/w342${path}` : ""),
  w185:     (path?: string | null) => (path ? `https://image.tmdb.org/t/p/w185${path}` : "")
};
