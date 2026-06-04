import type { Metadata } from "next";
import { DOWNLOADER_CONFIGS } from "@/lib/downloader-types";
import { DownloaderPageLayout } from "@/components/downloader-page-layout";

const config = DOWNLOADER_CONFIGS.video;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  keywords: config.keywords,
  openGraph: { title: config.title, description: config.description, type: "website" },
  twitter: { card: "summary_large_image", title: config.title, description: config.description },
  alternates: { canonical: "https://reelsave.app/video-downloader" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: config.title,
            description: config.description,
            url: "https://reelsave.app/video-downloader",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <DownloaderPageLayout type="video" />
    </>
  );
}
