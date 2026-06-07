import { DownloaderType } from "@/lib/downloader-types";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "instagram120.p.rapidapi.com";

interface RapidApiErrorResponse {
  message?: string;
  error?: string;
  status?: number;
}

function getHeaders(): Record<string, string> {
  return {
    "x-rapidapi-key": RAPIDAPI_KEY || "",
    "x-rapidapi-host": RAPIDAPI_HOST,
  };
}

async function callRapidApi(url: string): Promise<unknown> {
  if (!RAPIDAPI_KEY) {
    throw new Error("RAPIDAPI_KEY is not configured. Please add it to your .env file.");
  }

  const requestUrl = `https://${RAPIDAPI_HOST}/api/instagram/?url=${encodeURIComponent(url)}`;
  console.log("RapidAPI URL:", requestUrl);

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: getHeaders(),
    next: { revalidate: 0 },
  });

  console.log("RapidAPI Response Status:", response.status, response.statusText);

  if (response.status === 429) {
    throw new Error("Rate limit reached. Please wait a moment and try again.");
  }

  if (response.status === 403) {
    throw new Error("Access denied. The content may be from a private account or the URL is invalid.");
  }

  const responseText = await response.text();
  console.log("RapidAPI Response Body:", responseText);

  if (!response.ok) {
    let errorMsg = `API returned status ${response.status}`;
    try {
      const errBody = JSON.parse(responseText) as RapidApiErrorResponse;
      if (errBody.message || errBody.error) {
        errorMsg = errBody.message || errBody.error || errorMsg;
      }
    } catch {
      // Use response text as error if not JSON
      if (responseText) {
        errorMsg = responseText;
      }
    }
    throw new Error(errorMsg);
  }

  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error(`Failed to parse API response: ${responseText.substring(0, 200)}`);
  }
}

function extractUsername(url: string): string | null {
  const userMatch = url.match(/instagram\.com\/([A-Za-z0-9_.]+)\/?(?:\?|$|\/)/);
  if (userMatch && !["p", "reel", "reels", "tv", "stories", "explore", "accounts"].includes(userMatch[1])) {
    return userMatch[1];
  }
  return null;
}

function extractStoryUsername(url: string): string | null {
  const storyMatch = url.match(/instagram\.com\/stories\/([A-Za-z0-9_.]+)/);
  if (storyMatch) return storyMatch[1];
  return extractUsername(url);
}

function formatDuration(seconds: number | undefined): string | undefined {
  if (!seconds) return undefined;
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function estimateFileSize(type: "video" | "image", width?: number, height?: number, duration?: number): string {
  if (type === "video" && duration) {
    const mb = (duration * 2.5).toFixed(1);
    return `${mb} MB`;
  }
  const pixels = (width || 1080) * (height || 1080);
  const mb = type === "image" ? (pixels / 500000).toFixed(1) : "—";
  return `${mb} MB`;
}

export interface DownloadResult {
  thumbnail?: string;
  title?: string;
  author?: string;
  duration?: string;
  quality: string;
  fileSize?: string;
  downloadUrl: string;
  mediaType: "video" | "image" | "carousel";
}

function getVideoUrl(item: Record<string, unknown>): string | undefined {
  if (typeof item.video_url === "string") return item.video_url;
  const versions = item.video_versions as Array<Record<string, string>> | undefined;
  if (Array.isArray(versions) && versions.length > 0) return versions[0].url;
  if (typeof item.url === "string" && (item.media_type === 2 || item.type === "video")) return item.url;
  return undefined;
}

function getImageUrl(item: Record<string, unknown>): string | undefined {
  if (typeof item.display_url === "string") return item.display_url;
  if (typeof item.image_url === "string") return item.image_url;
  if (typeof item.thumbnail_url === "string") return item.thumbnail_url;
  const versions = item.image_versions as Array<Record<string, string>> | undefined;
  if (Array.isArray(versions) && versions.length > 0) return versions[0].url;
  return undefined;
}

function getUsername(data: Record<string, unknown>, item?: Record<string, unknown>): string {
  if (typeof data.username === "string") return data.username;
  const user = (item?.user ?? data.user) as Record<string, string> | undefined;
  if (user && typeof user.username === "string") return user.username;
  if (typeof data.owner_username === "string") return data.owner_username;
  return "unknown";
}

function parseMediaItem(item: Record<string, unknown>, type: DownloaderType, parentData?: Record<string, unknown>): DownloadResult {
  const videoUrl = getVideoUrl(item);
  const imageUrl = getImageUrl(item);
  const isVideo = !!(videoUrl || item.media_type === 2 || item.type === "video" || type === "video" || type === "reels" || type === "igtv");

  const downloadUrl = (isVideo && videoUrl ? videoUrl : imageUrl) || "";
  const duration = (item.video_duration ?? item.duration ?? item.length) as number | undefined;
  const width = (item.width ?? item.original_width) as number | undefined;
  const height = (item.height ?? item.original_height) as number | undefined;

  const typeLabels: Record<DownloaderType, string> = {
    video: "Instagram Video",
    photo: "Instagram Photo",
    reels: "Instagram Reel",
    story: "Instagram Story",
    igtv: "IGTV Video",
    carousel: "Instagram Carousel",
    profile: "Instagram Profile Picture",
  };

  return {
    thumbnail: (item.display_url ?? item.thumbnail_url ?? imageUrl) as string | undefined,
    title: (item.title ?? item.caption_text ?? item.caption ?? typeLabels[type]) as string | undefined,
    author: getUsername(parentData ?? {}, item),
    duration: isVideo ? formatDuration(duration) : undefined,
    quality: isVideo
      ? (width && width >= 1080 ? "1080p HD" : width && width >= 720 ? "720p HD" : "480p")
      : "Full Resolution",
    fileSize: estimateFileSize(isVideo ? "video" : "image", width, height, duration),
    downloadUrl,
    mediaType: isVideo ? "video" : "image",
  };
}

function deepGet(obj: Record<string, unknown>, ...paths: string[]): unknown {
  for (const path of paths) {
    let current: unknown = obj;
    const keys = path.split(".");
    let found = true;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        found = false;
        break;
      }
    }
    if (found && current != null) return current;
  }
  return undefined;
}

function extractMediaItems(data: Record<string, unknown>): Array<Record<string, unknown>> {
  const candidates = [
    deepGet(data, "data.items"),
    deepGet(data, "items"),
    deepGet(data, "media"),
    deepGet(data, "data"),
    deepGet(data, "result.items"),
    deepGet(data, "result.media"),
    deepGet(data, "result"),
    deepGet(data, "medias"),
    deepGet(data, "resources"),
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate as Array<Record<string, unknown>>;
    }
  }

  // Single-item response — wrap it
  if (data.video_url || data.display_url || data.image_url || data.url) {
    return [data];
  }

  return [];
}

export async function fetchInstagramMedia(
  url: string,
  type: DownloaderType
): Promise<DownloadResult> {
  if (!url.includes("instagram.com") && !url.includes("instagr.am")) {
    throw new Error("Invalid Instagram URL. Please paste a valid Instagram link.");
  }

  const trimmedUrl = url.trim();

  // Validate URL format for specific types
  if (type === "profile") {
    const username = extractUsername(trimmedUrl);
    if (!username) throw new Error("Could not extract username from URL. Use a profile URL like instagram.com/username");
  }

  if (type === "story") {
    const username = extractStoryUsername(trimmedUrl);
    if (!username) throw new Error("Could not extract username from URL. Use a story URL like instagram.com/stories/username");
  }

  // All types use the same endpoint: GET /api/instagram/?url=<url>
  const apiData = await callRapidApi(trimmedUrl);

  const response = apiData as Record<string, unknown>;

  // ---- Profile picture ----
  if (type === "profile") {
    const user = (deepGet(response, "data") ?? response) as Record<string, unknown>;
    const profilePic = (
      user.profile_pic_url_hd ??
      user.profile_pic_url ??
      user.profile_picture ??
      user.profile_pic ??
      getImageUrl(user)
    ) as string | undefined;

    if (!profilePic) throw new Error("Could not retrieve profile picture. The account may be private.");

    return {
      thumbnail: profilePic,
      title: `@${getUsername(user)}'s Profile Picture`,
      author: getUsername(user),
      quality: "Full HD",
      fileSize: "1.8 MB",
      downloadUrl: profilePic,
      mediaType: "image",
    };
  }

  // ---- Story ----
  if (type === "story") {
    const items = extractMediaItems(response);
    if (!items.length) throw new Error("No stories found. They may have expired or the account may be private.");

    const story = items[0];
    if (typeof story.url === "string" && story.url.startsWith("http")) {
      const isVideo = !!(story.media_type === 2 || story.type === "video" || story.video_url);
      const dur = (story.video_duration ?? story.duration) as number | undefined;
      return {
        thumbnail: (getImageUrl(story) ?? story.thumbnail) as string | undefined,
        title: "Instagram Story",
        author: getUsername(response, story),
        duration: isVideo ? formatDuration(dur) : undefined,
        quality: isVideo ? "720p" : "Full Resolution",
        fileSize: estimateFileSize(isVideo ? "video" : "image", undefined, undefined, dur),
        downloadUrl: story.url || (story.video_url as string) || getImageUrl(story) || "",
        mediaType: isVideo ? "video" : "image",
      };
    }

    return parseMediaItem(story, type, response);
  }

  // ---- Posts (video, photo, reels, igtv, carousel) ----
  const mediaItems = extractMediaItems(response);

  if (!mediaItems.length) throw new Error("No media found. The post may be from a private account or the URL may be invalid.");

  // Carousel with multiple items
  if (mediaItems.length > 1 && type === "carousel") {
    const firstItem = mediaItems[0];
    const isVideo = !!(getVideoUrl(firstItem));
    const downloadUrl = (isVideo ? getVideoUrl(firstItem) : getImageUrl(firstItem)) || "";

    return {
      thumbnail: (firstItem.display_url ?? firstItem.thumbnail_url ?? getImageUrl(firstItem)) as string | undefined,
      title: "Instagram Carousel Post",
      author: getUsername(response, firstItem),
      quality: "Full Resolution",
      fileSize: estimateFileSize("image"),
      downloadUrl,
      mediaType: "carousel",
    };
  }

  // Single media item (video, photo, reels, igtv, or single-item carousel)
  return parseMediaItem(mediaItems[0], type, response);
}
