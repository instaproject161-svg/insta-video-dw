import { Video, Image, Film, BookOpen, Tv, LayoutGrid, User } from "lucide-react";

export type DownloaderType =
  | "video"
  | "photo"
  | "reels"
  | "story"
  | "igtv"
  | "carousel"
  | "profile";

export interface FAQItem {
  question: string;
  answer: string;
}

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
  pageRoute: string;
  faqs: FAQItem[];
}

const commonFaqs: FAQItem[] = [
  {
    question: "Is ReelSave completely free?",
    answer: "Yes, ReelSave is 100% free with no hidden fees, subscriptions, or premium tiers. Download unlimited content at no cost.",
  },
  {
    question: "Do I need to create an account or log in?",
    answer: "No account or login is required. Just paste the URL and download instantly.",
  },
  {
    question: "Is it safe to use ReelSave?",
    answer: "Absolutely. We never store your personal data, require credentials, or install anything on your device.",
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Yes, ReelSave is fully responsive and works on iOS, Android, tablets, and all modern browsers.",
  },
  {
    question: "Can I download from private accounts?",
    answer: "No. We can only process publicly available content to respect user privacy and Instagram's terms of service.",
  },
];

export const DOWNLOADER_CONFIGS: Record<DownloaderType, DownloaderConfig> = {
  video: {
    type: "video",
    label: "Video",
    title: "Instagram Video Downloader — Save Videos in HD | ReelSave",
    heading: "Download Instagram Videos",
    subheading: "Save any Instagram video in full HD quality. Free, fast, and completely watermark-free.",
    placeholder: "Paste Instagram video URL here...",
    buttonLabel: "Download Video",
    description: "Download Instagram videos in HD quality for free. No login, no watermark, no limits.",
    keywords: ["instagram video downloader", "download instagram video", "save instagram video free", "instagram video download hd"],
    icon: Video,
    apiPath: "/api/download/video",
    pageRoute: "/video-downloader",
    faqs: [
      { question: "What video formats can I download from Instagram?", answer: "Instagram videos are available in MP4 format. We provide the highest resolution available, typically 720p or 1080p HD." },
      { question: "How do I get the Instagram video URL?", answer: "Open the post, tap the three dots (•••), select 'Copy Link', then paste it here." },
      { question: "Can I download Instagram Live videos?", answer: "Live videos can be downloaded after the broadcast ends if the creator saves them to their profile." },
      { question: "What is the maximum video length I can download?", answer: "There is no length restriction. You can download short clips, long videos, and everything in between." },
      { question: "Why is my video download low quality?", answer: "The quality depends on what the creator uploaded. We always provide the highest available resolution." },
      ...commonFaqs,
    ],
  },
  photo: {
    type: "photo",
    label: "Photo",
    title: "Instagram Photo Downloader — Save Full-Resolution Photos | ReelSave",
    heading: "Download Instagram Photos",
    subheading: "Save full-resolution Instagram photos instantly. No compression, no login, completely free.",
    placeholder: "Paste Instagram photo URL here...",
    buttonLabel: "Download Photo",
    description: "Download Instagram photos in original full resolution. Free, fast, no watermark.",
    keywords: ["instagram photo downloader", "download instagram photos", "save instagram images", "instagram picture download free"],
    icon: Image,
    apiPath: "/api/download/photo",
    pageRoute: "/photo-downloader",
    faqs: [
      { question: "In what format are Instagram photos downloaded?", answer: "Photos are downloaded in JPEG or PNG format, matching the original file the creator uploaded." },
      { question: "Can I download multiple photos at once?", answer: "For single photo posts, one image is downloaded. For carousel posts, use our Carousel Downloader to get all images." },
      { question: "Will the image quality be reduced?", answer: "No. We download photos in their original resolution as uploaded by the creator, without any compression." },
      { question: "Can I download photos from Instagram Stories?", answer: "Yes, use our dedicated Story Downloader for story photos. This tool is optimized for regular post photos." },
      { question: "How do I copy the photo URL from Instagram?", answer: "On the post, tap the three-dot menu and choose 'Copy Link'. On desktop, copy the URL from the address bar." },
      ...commonFaqs,
    ],
  },
  reels: {
    type: "reels",
    label: "Reels",
    title: "Instagram Reels Downloader — Save Reels in HD | ReelSave",
    heading: "Download Instagram Reels",
    subheading: "Save your favorite Instagram Reels in HD with no watermark. Free and no login needed.",
    placeholder: "Paste Instagram Reel URL here...",
    buttonLabel: "Download Reel",
    description: "Download Instagram Reels in HD for free. No watermark, no login, unlimited downloads.",
    keywords: ["instagram reels downloader", "download instagram reels", "save reels without watermark", "instagram reel download free hd"],
    icon: Film,
    apiPath: "/api/download/reels",
    pageRoute: "/reels-downloader",
    faqs: [
      { question: "Can I download Instagram Reels without watermark?", answer: "Yes! All downloaded Reels are completely watermark-free in their original quality." },
      { question: "What quality are downloaded Reels?", answer: "Reels are downloaded at the highest available quality, typically 1080p Full HD when available." },
      { question: "Can I download Reels from other people's accounts?", answer: "You can download Reels from any public account. Private account Reels cannot be downloaded." },
      { question: "How do I find the Reel URL?", answer: "On the Reel, tap the three-dot menu and select 'Copy Link'. On desktop, copy from the browser address bar." },
      { question: "Can I re-upload downloaded Reels to other platforms?", answer: "You may download for personal use. Always credit the original creator and check platform terms before re-uploading." },
      ...commonFaqs,
    ],
  },
  story: {
    type: "story",
    label: "Story",
    title: "Instagram Story Downloader — Save Stories Anonymously | ReelSave",
    heading: "Download Instagram Stories",
    subheading: "Save Instagram Stories before they disappear — anonymously and completely free.",
    placeholder: "Paste Instagram story URL here...",
    buttonLabel: "Download Story",
    description: "Download Instagram Stories anonymously. Save photo and video stories before they expire.",
    keywords: ["instagram story downloader", "save instagram stories", "instagram story saver anonymous", "download stories instagram free"],
    icon: BookOpen,
    apiPath: "/api/download/story",
    pageRoute: "/story-downloader",
    faqs: [
      { question: "Can I download Instagram Stories anonymously?", answer: "Yes. The story creator will not be notified when you view or download their story using our tool." },
      { question: "Do I need to follow an account to download their story?", answer: "No following is required. You can download stories from any public account without following them." },
      { question: "Can I download expired stories?", answer: "No. Stories are only accessible for 24 hours. Once expired, they cannot be retrieved unless saved as a Highlight." },
      { question: "Can I download Instagram Story Highlights?", answer: "Yes! Highlights are permanently available and can be downloaded the same way as regular stories." },
      { question: "What format are story downloads?", answer: "Photo stories download as JPEG, and video stories download as MP4 files." },
      ...commonFaqs,
    ],
  },
  igtv: {
    type: "igtv",
    label: "IGTV",
    title: "IGTV Downloader — Download Instagram TV Videos Free | ReelSave",
    heading: "Download IGTV Videos",
    subheading: "Save full-length IGTV videos in high quality. Fast, free, and no watermark.",
    placeholder: "Paste IGTV URL here...",
    buttonLabel: "Download IGTV",
    description: "Download IGTV videos in HD quality for free. No login or watermark required.",
    keywords: ["igtv downloader", "download igtv video", "instagram tv downloader", "save igtv free hd"],
    icon: Tv,
    apiPath: "/api/download/igtv",
    pageRoute: "/igtv-downloader",
    faqs: [
      { question: "What is IGTV?", answer: "IGTV (Instagram TV) is Instagram's long-form video platform where creators can upload videos up to 60 minutes long." },
      { question: "What is the maximum IGTV video length I can download?", answer: "There's no download length restriction from our side. Full IGTV episodes of any duration can be downloaded." },
      { question: "What quality are IGTV downloads?", answer: "IGTV videos download in the highest available quality, which can be up to 1080p Full HD." },
      { question: "How do I find the IGTV video URL?", answer: "Open the IGTV video, tap the three-dot menu, and select 'Copy Link'. You can also copy the URL from your desktop browser." },
      { question: "Can I download IGTV series episodes?", answer: "Yes, each episode has its own URL. Download them one at a time using each episode's link." },
      ...commonFaqs,
    ],
  },
  carousel: {
    type: "carousel",
    label: "Carousel",
    title: "Instagram Carousel Downloader — Save All Photos & Videos | ReelSave",
    heading: "Download Instagram Carousels",
    subheading: "Download all photos and videos from carousel posts in one click. Free and watermark-free.",
    placeholder: "Paste carousel post URL here...",
    buttonLabel: "Download Carousel",
    description: "Download all images and videos from Instagram carousel posts for free. Bulk download in one click.",
    keywords: ["instagram carousel downloader", "download instagram album", "bulk instagram download", "instagram multi-photo downloader"],
    icon: LayoutGrid,
    apiPath: "/api/download/carousel",
    pageRoute: "/carousel-downloader",
    faqs: [
      { question: "Can I download all images from a carousel at once?", answer: "Yes! Our tool downloads all photos and videos from a carousel post in a single operation." },
      { question: "How many images can a carousel have?", answer: "Instagram allows up to 20 items per carousel. Our tool handles the full 20-item maximum." },
      { question: "Can a carousel contain both photos and videos?", answer: "Yes, Instagram carousels support mixed media. We download all items regardless of type." },
      { question: "Will files be delivered as a ZIP archive?", answer: "Individual files are provided for download. You can use a download manager to batch-save them." },
      { question: "How do I identify a carousel post?", answer: "Carousel posts have multiple image icons (stacked squares) in the top-right corner when browsing your feed." },
      ...commonFaqs,
    ],
  },
  profile: {
    type: "profile",
    label: "Profile Pic",
    title: "Instagram Profile Picture Downloader — Full HD DP | ReelSave",
    heading: "Download Instagram Profile Pictures",
    subheading: "View and download any Instagram profile picture in full HD resolution. No login required.",
    placeholder: "Paste Instagram profile URL here...",
    buttonLabel: "Download Profile Pic",
    description: "Download Instagram profile pictures in full HD. View any public profile picture in original size.",
    keywords: ["instagram profile picture downloader", "download instagram dp", "instagram avatar downloader", "save instagram profile pic full size"],
    icon: User,
    apiPath: "/api/download/profile",
    pageRoute: "/profile-picture-downloader",
    faqs: [
      { question: "Can I download a profile picture in full size?", answer: "Yes! Instagram normally shows profile pictures in small sizes. Our tool fetches the full-resolution version." },
      { question: "Do I need to follow the person to download their profile picture?", answer: "No. You can download profile pictures from any public Instagram account without following them." },
      { question: "What format is the profile picture downloaded in?", answer: "Profile pictures are downloaded as JPEG files in the highest available resolution." },
      { question: "Can I download my own profile picture in full size?", answer: "Yes, simply enter your own Instagram profile URL to download your profile picture at full resolution." },
      { question: "Can I download profile pictures from private accounts?", answer: "No. Private account profile pictures are protected and cannot be accessed without following the account and being accepted." },
      ...commonFaqs,
    ],
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
