import { NextRequest, NextResponse } from "next/server";
import { DownloadResult } from "@/components/result-card";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json() as { url?: string };

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    if (!url.includes("instagram.com") && !url.includes("instagr.am")) {
      return NextResponse.json({ error: "Invalid Instagram URL" }, { status: 400 });
    }

    // Mock response — replace with real API integration (e.g., RapidAPI)
    const result: DownloadResult = {
      type: "video",
      thumbnail: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=320&h=240",
      title: "Instagram Video",
      author: "instagram_user",
      duration: "0:45",
      quality: "1080p HD",
      fileSize: "18.4 MB",
      downloadUrl: url,
      mediaType: "video",
    };

    return NextResponse.json({ success: true, result });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
