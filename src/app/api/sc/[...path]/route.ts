/**
 * Gateway proxy: forwards authenticated requests to the Superclip API.
 *
 * Any request to /api/sc/<anything> is forwarded to
 * NEXT_PUBLIC_API_URL/api/<anything> with the browser's session cookie
 * attached so Superclip can authorize it.
 */
import { type NextRequest, NextResponse } from "next/server";

const SUPERCLIP_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3200";

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const upstream = `${SUPERCLIP_BASE}/api/${path.join("/")}${req.nextUrl.search}`;

  const cookieHeader = req.headers.get("cookie") ?? "";

  const init: RequestInit = {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    cache: "no-store",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    const body = await req.text();
    if (body) init.body = body;
  }

  const upstream_res = await fetch(upstream, init);

  const data = await upstream_res.text();
  return new NextResponse(data, {
    status: upstream_res.status,
    headers: {
      "Content-Type": upstream_res.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
