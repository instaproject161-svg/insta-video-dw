import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!url.includes("instagram.com") && !url.includes("instagr.am")) {
      return NextResponse.json({ error: "Invalid Instagram URL" }, { status: 400 });
    }

    // TODO: Integrate with a real Instagram download API (e.g., RapidAPI)
    return NextResponse.json({
      success: true,
      message: "Download processed",
      url,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
