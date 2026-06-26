import { NextRequest, NextResponse } from "next/server";

const HIGGSFIELD_API = "https://api.higgsfield.ai";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");
  const type = searchParams.get("type") ?? "image";
  const size = searchParams.get("size") ?? "24";

  const params = new URLSearchParams({ size, type });
  if (cursor) params.set("cursor", cursor);

  const res = await fetch(`${HIGGSFIELD_API}/generation/history?${params}`, {
    headers: {
      Authorization: `Bearer ${process.env.HIGGSFIELD_API_KEY}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Upstream error: ${res.status}` },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
