const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL?.startsWith("http")) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL must include protocol, e.g. http://localhost:4000");
}

type Query = Record<string, string | number | boolean | undefined>;

function buildUrl(path: string, query?: Query) {
  const url = new URL(path.replace(/^\/+/, ""), BASE_URL);
  if (query) Object.entries(query).forEach(([k, v]) => v != null && url.searchParams.set(k, String(v)));
  return url.toString();
}

export async function apiGet<T>(path: string, query?: Query, init?: RequestInit): Promise<T> {
  const url = buildUrl(path, query);
  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store", ...init });
  } catch (e: any) {
    throw new Error(`Fetch to ${url} failed: ${(e?.code || "")} ${e?.message || e}`);
  }
  if (!res.ok) {
    let msg = res.statusText;
    try { const b = await res.json(); msg = b?.message || msg; } catch {}
    throw new Error(`API ${res.status} ${msg} on ${path}`);
  }
  return res.json() as Promise<T>;
}
