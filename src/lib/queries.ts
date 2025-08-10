export const imageUrl = (
  path?: string | null,
  size: 'w342' | 'w500' | 'original' = 'w500'
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder.png');
