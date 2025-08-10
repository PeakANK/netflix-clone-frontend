// src/lib/api.ts
type Query = Record<string, string | number | boolean | undefined | null>;

// Where to send the request:
// - Next.js own API routes:   /api/...  -> go to this site (3000 in dev)
// - Your NestJS backend:      /movies..., /tv... -> go to API_BASE_URL (4000 in dev)
const SITE_BASE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "http://localhost:3000";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "http://localhost:4000";

function buildUrl(path: string, query?: Query) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const isNextApi = p.startsWith("/api/");
  const base = isNextApi ? SITE_BASE : API_BASE;

  const url = new URL(p, base);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  return url.toString(); // absolute URL for server fetch
}

export async function apiGet<T>(
  path: string,
  query?: Query,
  init?: RequestInit
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), { cache: "no-store", ...init });
  } catch (e: any) {
    throw new Error(`Network error: ${e?.message ?? e}`);
  }
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const j = await res.json();
      msg = (j as any)?.message || msg;
    } catch {}
    throw new Error(`API ${res.status} ${msg} on ${path}`);
  }
  return res.json() as Promise<T>;
}
