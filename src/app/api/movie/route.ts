import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE_URL || "http://localhost:4000";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }
  
  const r = await fetch(`${API_BASE}/movies/${id}`, { cache: "no-store" });
  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}
