import { DownloaderType } from "@/lib/downloader-types";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "instagram120.p.rapidapi.com";

interface MediaItem {
  url: string;
  type: "video" | "image";
  width?: number;
  height?: number;
  duration?: number;
  thumbnail?: string;
}

interface InstagramApiResponse {
  success: boolean;
  username?: string;
  fullName?: string;
  profilePicUrl?: string;
  thumbnail?: string;
  title?: string;
  media: MediaItem[];
}

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

async function callRapidApi(endpoint: string, params: Record<string, string>): Promise<unknown> {
  if (!RAPIDAPI_KEY) {
    throw new Error("RAPIDAPI_KEY is not configured. Please add it to your .env file.");
  }

  const url = new URL(`https://${RAPIDAPI_HOST}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: getHeaders(),
    next: { revalidate: 0 },
  });

  if (response.status === 429) {
    throw new Error("Rate limit reached. Please wait a moment and try again.");
  }

  if (response.status === 403) {
    throw new Error("Access denied. The content may be from a private account or the URL is invalid.");
  }

  if (!response.ok) {
    let errorMsg = `API returned status ${response.status}`;
    try {
      const errBody = (await response.json()) as RapidApiErrorResponse;
      if (errBody.message || errBody.error) {
        errorMsg = errBody.message || errBody.error || errorMsg;
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

function extractShortcode(url: string): string | null {
  // Match /p/SHORTCODE, /reel/SHORTCODE, /tv/SHORTCODE
  const postMatch = url.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (postMatch) return postMatch[1];
  return null;
}

function extractUsername(url: string): string | null {
  const userMatch = url.match(/instagram\.com\/([A-Za-z0-9_.]+)\/?(?:\?|$|\/)/);
  if (userMatch && !["p", "reel", "reels", "tv", "stories", "explore"].includes(userMatch[1])) {
    return userMatch[1];
  }
  return null;
}

function extractStoryId(url: string): { username: string; storyId?: string } | null {
  const storyMatch = url.match(/instagram\.com\/stories\/([A-Za-z0-9_.]+)\/(\d+)/);
  if (storyMatch) return { username: storyMatch[1], storyId: storyMatch[2] };

  const storyUserMatch = url.match(/instagram\.com\/stories\/([A-Za-z0-9_.]+)/);
  if (storyUserMatch) return { username: storyUserMatch[1] };

  return null;
}

function formatDuration(seconds: number | undefined): string {
  if (!seconds) return undefined as unknown as string;
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

export async function fetchInstagramMedia(
  url: string,
  type: DownloaderType
): Promise<{
  thumbnail?: string;
  title?: string;
  author?: string;
  duration?: string;
  quality: string;
  fileSize?: string;
  downloadUrl: string;
  mediaType: "video" | "image" | "carousel";
}> {
  // Validate URL
  if (!url.includes("instagram.com") && !url.includes("instagr.am")) {
    throw new Error("Invalid Instagram URL. Please paste a valid Instagram link.");
  }

  let apiData: unknown;

  switch (type) {
    case "profile": {
      const username = extractUsername(url);
      if (!username) throw new Error("Could not extract username from URL. Use a profile URL like instagram.com/username");
      apiData = await callRapidApi("/api/v1/user/info", { username });
      break;
    }
    case "story": {
      const storyInfo = extractStoryId(url);
      if (!storyInfo) throw new Error("Could not extract story info from URL. Use a story URL like instagram.com/stories/username");
      apiData = await callRapidApi("/api/v1/stories", { username: storyInfo.username });
      break;
    }
    default: {
      // video, photo, reels, igtv, carousel — all use the post/media endpoint
      const shortcode = extractShortcode(url);
      if (!shortcode) throw new Error("Could not extract post ID from URL. Please use a valid Instagram post, reel, or video URL.");
      apiData = await callRapidApi("/api/v1/media", { shortcode });
      break;
    }
  }

  // Parse the response into our standard format
  return parseApiResponse(apiData, type, url);
}

function parseApiResponse(
  data: unknown,
  type: DownloaderType,
  originalUrl: string
): {
  thumbnail?: string;
  title?: string;
  author?: string;
  duration?: string;
  quality: string;
  fileSize?: string;
  downloadUrl: string;
  mediaType: "video" | "image" | "carousel";
} {
  const response = data as Record<string, unknown>;

  // Profile picture
  if (type === "profile") {
    const user = (response.data || response) as Record<string, unknown>;
    const profilePic = (user.profile_pic_url || user.profile_pic_url_hd || user.profile_picture) as string;
    if (!profilePic) throw new Error("Could not retrieve profile picture. The account may be private.");
    return {
      thumbnail: profilePic,
      title: `@${user.username || "user"}'s Profile Picture`,
      author: (user.username || "unknown") as string,
      quality: "Full HD",
      fileSize: "1.8 MB",
      downloadUrl: profilePic,
      mediaType: "image",
    };
  }

  // Story
  if (type === "story") {
    const items = (response.data || response.items || response.stories) as Array<Record<string, unknown>>;
    if (!items || !items.length) throw new Error("No stories found. They may have expired or the account may be private.");
    const story = items[0];
    const isVideo = (story.media_type === 2 || story.type === "video") as boolean;
    const videoUrl = (story.video_url || story.video_versions?.[0]?.url) as string | undefined;
    const imageUrl = (story.display_url || story.thumbnail_url || story.image_versions?.[0]?.url) as string | undefined;
    const downloadUrl = isVideo && videoUrl ? videoUrl : imageUrl || originalUrl;
    const duration = (story.video_duration || story.duration) as number | undefined;

    return {
      thumbnail: (story.display_url || imageUrl) as string,
      title: "Instagram Story",
      author: (story.user?.username || response.username || "unknown") as string,
      duration: isVideo ? formatDuration(duration) : undefined,
      quality: isVideo ? "720p" : "Full Resolution",
      fileSize: estimateFileSize(isVideo ? "video" : "image", undefined, undefined, duration),
      downloadUrl,
      mediaType: isVideo ? "video" : "image",
    };
  }

  // Posts (video, photo, reels, igtv, carousel)
  const mediaItems = (response.data?.items || response.items || response.media || [response.data || response]) as Array<Record<string, unknown>>;
  if (!mediaItems || !mediaItems.length) {
    // Try single-item response
    const singleMedia = (response.data || response) as Record<string, unknown>;
    if (singleMedia.video_url || singleMedia.display_url || singleMedia.image_url) {
      return parseSingleMedia(singleMedia, type, originalUrl);
    }
    throw new Error("No media found. The post may be from a private account or the URL may be invalid.");
  }

  // Carousel
  if (mediaItems.length > 1 && type === "carousel") {
    const firstItem = mediaItems[0];
    const isVideo = !!(firstItem.video_url || firstItem.video_versions);
    const downloadUrl = (isVideo
      ? firstItem.video_url || (firstItem.video_versions as Array<Record<string, string>>)?.[0]?.url
      : firstItem.display_url || firstItem.image_url || (firstItem.image_versions as Array<Record<string, string>>)?.[0]?.url) as string;

    return {
      thumbnail: (firstItem.display_url || firstItem.thumbnail_url) as string,
      title: "Instagram Carousel Post",
      author: (response.username || (firstItem.user as Record<string, string>)?.username || "unknown") as string,
      quality: "Full Resolution",
      fileSize: estimateFileSize("image"),
      downloadUrl: downloadUrl || originalUrl,
      mediaType: "carousel",
    };
  }

  // Single media (video, photo, reels, igtv)
  const item = mediaItems[0];
  return parseSingleMedia(item, type, originalUrl, response);
}

function parseSingleMedia(
  item: Record<string, unknown>,
  type: DownloaderType,
  originalUrl: string,
  parentResponse?: Record<string, unknown>
): {
  thumbnail?: string;
  title?: string;
  author?: string;
  duration?: string;
  quality: string;
  fileSize?: string;
  downloadUrl: string;
  mediaType: "video" | "image" | "carousel";
} {
  const isVideo = !!(item.video_url || item.video_versions || item.media_type === 2 || type === "video" || type === "reels" || type === "igtv");
  const videoUrl = (item.video_url || (item.video_versions as Array<Record<string, string>>)?.[0]?.url) as string | undefined;
  const imageUrl = (item.display_url || item.image_url || (item.image_versions as Array<Record<string, string>>)?.[0]?.url) as string | undefined;
  const downloadUrl = isVideo && videoUrl ? videoUrl : imageUrl || originalUrl;
  const duration = (item.video_duration || item.duration) as number | undefined;
  const width = (item.width || item.original_width) as number | undefined;
  const height = (item.height || item.original_height) as number | undefined;

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
    thumbnail: (item.display_url || item.thumbnail_url || imageUrl) as string,
    title: (item.title || item.caption_text || typeLabels[type]) as string,
    author: (parentResponse?.username || (item.user as Record<string, string>)?.username || "unknown") as string,
    duration: isVideo ? formatDuration(duration) : undefined,
    quality: isVideo
      ? (width && width >= 1080 ? "1080p HD" : width && width >= 720 ? "720p HD" : "480p")
      : "Full Resolution",
    fileSize: estimateFileSize(isVideo ? "video" : "image", width, height, duration),
    downloadUrl,
    mediaType: isVideo ? "video" : "image",
  };
}
