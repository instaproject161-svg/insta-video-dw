import { NextRequest, NextResponse } from "next/server";
import { fetchInstagramMedia } from "@/lib/instagram-api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body?.url;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    if (!url.includes("instagram.com") && !url.includes("instagr.am")) {
      return NextResponse.json({ error: "Invalid Instagram URL" }, { status: 400 });
    }

    const result = await fetchInstagramMedia(url.trim(), "story");
    return NextResponse.json({ success: true, result: { ...result, type: "story" } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    const status = message.includes("Rate limit") ? 429
      : message.includes("private account") ? 403
      : message.includes("not configured") ? 503
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
