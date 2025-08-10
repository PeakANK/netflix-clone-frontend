export const formatScore = (n?: number) =>
  typeof n === 'number' ? Math.round(n * 10) / 10 : '–';

export type ListItem = { id: number; type: 'movie'|'tv'; title: string; poster: string | null };

const LS_KEY = 'my_list_v1';

export function getMyList(): ListItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch { return []; }
}

export function toggleInMyList(item: ListItem) {
  const current = getMyList();
  const exists = current.some(x => x.id === item.id && x.type === item.type);
  const next = exists ? current.filter(x => !(x.id === item.id && x.type === item.type)) : [item, ...current];
  localStorage.setItem(LS_KEY, JSON.stringify(next));
  return next;
}
