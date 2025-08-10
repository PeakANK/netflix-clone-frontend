type Query = Record<string, string | number | boolean | undefined | null>;

const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const API_BASE  = process.env.API_BASE_URL || "http://localhost:4000";

function buildUrl(path: string, query?: Query) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = p.startsWith("/api/") ? SITE_BASE : API_BASE; // proxy vs backend
  const url = new URL(p, base);
  if (query) for (const [k, v] of Object.entries(query)) if (v != null) url.searchParams.set(k, String(v));
  return url.toString();
}

export async function apiGet<T>(path: string, query?: Query, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), { cache: "no-store", ...init });
  } catch (e: any) {
    throw new Error(`Network error: ${e?.message ?? e}`);
  }
  if (!res.ok) {
    let msg = res.statusText;
    try { const j = await res.json(); msg = (j as any)?.message || msg; } catch {}
    throw new Error(`API ${res.status} ${msg} on ${path}`);
  }
  return res.json() as Promise<T>;
}
