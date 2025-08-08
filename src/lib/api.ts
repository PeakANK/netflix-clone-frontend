import type { BackendEnvelope } from "@/types/http";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function apiData<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 },
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) throw new Error(`API ${res.status} ${res.statusText} on ${path}`);

  const body = (await res.json()) as BackendEnvelope<T> | T;

  // If backend wraps the response, unwrap .data
  if (typeof body === "object" && body && "data" in (body as any) && "statusCode" in (body as any)) {
    return (body as BackendEnvelope<T>).data;
  }
  return body as T;
}
