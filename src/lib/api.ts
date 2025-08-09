type Query = Record<string, string | number | boolean | undefined>;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
function url(path: string, query?: Query) {
  const u = new URL(path.replace(/^\/+/, ""), BASE_URL);
  if (query) for (const [k, v] of Object.entries(query)) if (v != null) u.searchParams.set(k, String(v));
  return u.toString();
}
export async function apiGet<T>(path: string, query?: Query, init?: RequestInit): Promise<T> {
  const res = await fetch(url(path, query), { cache: "no-store", ...init });
  if (!res.ok) {
    let msg = res.statusText;
    try { const j = await res.json(); msg = (j as any)?.message || msg; } catch {}
    throw new Error(`API ${res.status} ${msg}`);
  }
  return res.json() as Promise<T>;
}
