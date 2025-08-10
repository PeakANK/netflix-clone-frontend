// src/lib/api.ts

const BASE = process.env.NEXT_PUBLIC_API_BASE!;
const KEY = process.env.NEXT_PUBLIC_API_KEY!;

if (!BASE) console.warn('Missing NEXT_PUBLIC_API_BASE');
if (!KEY) console.warn('Missing NEXT_PUBLIC_API_KEY');

type Q = Record<string, string | number | boolean | undefined>;

/**
 * GET wrapper that:
 * - sends x-api-key header
 * - unpacks { statusCode, message, data } -> returns data
 * - still supports raw JSON (returns it as-is)
 * - throws Error with the best available message on non-2xx
 */
export async function apiGet<T>(path: string, query?: Q, opts?: RequestInit): Promise<T> {
  const url = new URL(path, BASE);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }

  const res = await fetch(url.toString(), {
    ...opts,
    headers: {
      ...(opts?.headers || {}),
      'x-api-key': KEY,
    },
    cache: 'no-store',
  });

  // Try to parse JSON either way
  let json: any = null;
  try {
    json = await res.json();
  } catch {
    // ignore parse errors; json stays null
  }

  if (!res.ok) {
    // Prefer backend "message" if present
    const message =
      json?.message ||
      json?.error ||
      `Request failed: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }

  // Unwrap { data } if present (your backend format)
  if (json && typeof json === 'object' && 'data' in json) {
    return json.data as T;
  }

  // Fallback: raw JSON (e.g., calling TMDB directly someday)
  return json as T;
}
