// src/lib/api.ts

type Wrapped<T> = { statusCode: number; message?: string; data: T };

// Fallback base (dev) if env is missing
const DEFAULT_BASE = 'http://localhost:4000';

// Read base from env and validate protocol
const ENV_BASE = process.env.NEXT_PUBLIC_API_BASE?.trim();
const BASE = ENV_BASE && /^(https?:)\/\//i.test(ENV_BASE) ? ENV_BASE : DEFAULT_BASE;

/**
 * Build a full URL from a base and a path.
 * - If `path` is absolute (starts with http/https), return as-is.
 * - Otherwise, join with BASE and ensure a single slash.
 */
function buildUrl(path: string, params?: Record<string, string | number>): string {
  // Absolute URL? Use directly
  if (/^https?:\/\//i.test(path)) {
    const u = new URL(path);
    if (params) {
      Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)));
    }
    return u.toString();
  }

  // Ensure leading slash on path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  const u = new URL(normalizedPath, BASE);
  if (params) {
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)));
  }
  return u.toString();
}

function isWrapped<T>(x: unknown): x is Wrapped<T> {
  return typeof x === 'object' && x !== null && 'statusCode' in x && 'data' in x;
}

/**
 * GET helper that:
 * - Sends x-api-key
 * - Returns `data` if server responds with { statusCode, message, data }
 * - Throws with a clean message on HTTP error
 */
export async function apiGet<T = unknown>(
  path: string,
  params?: Record<string, string | number>
): Promise<T> {
  const url = buildUrl(path, params);

  const res = await fetch(url, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
    },
    cache: 'no-store',
  });

  // HTTP-level error
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body: unknown = await res.json();
      if (typeof body === 'object' && body && 'message' in body) {
        msg = String((body as { message?: unknown }).message ?? msg);
      }
    } catch {
      // ignore JSON parse error
    }
    throw new Error(msg);
  }

  // Success: unwrap if needed
  const json: unknown = await res.json();
  return isWrapped<T>(json) ? json.data : (json as T);
}
