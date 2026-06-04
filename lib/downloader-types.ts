import { Video, Image, Film, BookOpen, Tv, LayoutGrid, User } from "lucide-react";

export type DownloaderType =
  | "video"
  | "photo"
  | "reels"
  | "story"
  | "igtv"
  | "carousel"
  | "profile";

export interface DownloaderConfig {
  type: DownloaderType;
  label: string;
  title: string;
  heading: string;
  subheading: string;
  placeholder: string;
  buttonLabel: string;
  description: string;
  keywords: string[];
  icon: typeof Video;
  apiPath: string;
}

export const DOWNLOADER_CONFIGS: Record<DownloaderType, DownloaderConfig> = {
  video: {
    type: "video",
    label: "Video",
    title: "Instagram Video Downloader",
    heading: "Download Instagram Videos",
    subheading: "Save any Instagram video in HD quality. Free, fast, and no watermark.",
    placeholder: "Paste Instagram video URL here...",
    buttonLabel: "Download Video",
    description: "Download Instagram videos in HD quality for free. No login required, no watermark.",
    keywords: ["instagram video downloader", "download instagram video", "save instagram video", "instagram video download free"],
    icon: Video,
    apiPath: "/api/download/video",
  },
  photo: {
    type: "photo",
    label: "Photo",
    title: "Instagram Photo Downloader",
    heading: "Download Instagram Photos",
    subheading: "Save full-resolution Instagram photos instantly. Free and no login required.",
    placeholder: "Paste Instagram photo URL here...",
    buttonLabel: "Download Photo",
    description: "Download Instagram photos in full resolution. Free, fast, and no watermark.",
    keywords: ["instagram photo downloader", "download instagram photo", "save instagram image", "instagram picture download"],
    icon: Image,
    apiPath: "/api/download/photo",
  },
  reels: {
    type: "reels",
    label: "Reels",
    title: "Instagram Reels Downloader",
    heading: "Download Instagram Reels",
    subheading: "Save your favorite Instagram Reels in HD quality. No watermark, no login.",
    placeholder: "Paste Instagram Reel URL here...",
    buttonLabel: "Download Reel",
    description: "Download Instagram Reels in HD quality for free. No login required, no watermark.",
    keywords: ["instagram reels downloader", "download instagram reels", "save instagram reel", "instagram reel download free"],
    icon: Film,
    apiPath: "/api/download/reels",
  },
  story: {
    type: "story",
    label: "Story",
    title: "Instagram Story Downloader",
    heading: "Download Instagram Stories",
    subheading: "Save Instagram Stories before they disappear. Anonymous and free.",
    placeholder: "Paste Instagram story URL here...",
    buttonLabel: "Download Story",
    description: "Download Instagram Stories anonymously for free. Save before they expire.",
    keywords: ["instagram story downloader", "download instagram story", "save instagram story", "instagram story saver"],
    icon: BookOpen,
    apiPath: "/api/download/story",
  },
  igtv: {
    type: "igtv",
    label: "IGTV",
    title: "Instagram IGTV Downloader",
    heading: "Download IGTV Videos",
    subheading: "Save full-length IGTV videos in high quality. Fast and completely free.",
    placeholder: "Paste IGTV URL here...",
    buttonLabel: "Download IGTV",
    description: "Download IGTV videos in high quality for free. No login required.",
    keywords: ["igtv downloader", "download igtv video", "save igtv", "instagram tv downloader"],
    icon: Tv,
    apiPath: "/api/download/igtv",
  },
  carousel: {
    type: "carousel",
    label: "Carousel",
    title: "Instagram Carousel Downloader",
    heading: "Download Instagram Carousels",
    subheading: "Download all photos and videos from carousel posts at once.",
    placeholder: "Paste carousel post URL here...",
    buttonLabel: "Download Carousel",
    description: "Download all images and videos from Instagram carousel posts for free.",
    keywords: ["instagram carousel downloader", "download instagram album", "save carousel post", "instagram multi-photo download"],
    icon: LayoutGrid,
    apiPath: "/api/download/carousel",
  },
  profile: {
    type: "profile",
    label: "Profile Pic",
    title: "Instagram Profile Picture Downloader",
    heading: "Download Instagram Profile Pictures",
    subheading: "View and download any Instagram profile picture in full HD resolution.",
    placeholder: "Paste Instagram profile URL here...",
    buttonLabel: "Download Profile Pic",
    description: "Download Instagram profile pictures in full HD resolution for free.",
    keywords: ["instagram profile picture downloader", "download instagram profile pic", "save instagram avatar", "instagram dp downloader"],
    icon: User,
    apiPath: "/api/download/profile",
  },
};

export const DOWNLOADER_TABS: DownloaderType[] = [
  "video",
  "photo",
  "reels",
  "story",
  "igtv",
  "carousel",
  "profile",
];
