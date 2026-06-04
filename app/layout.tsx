import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://reelsave.app"),
  title: {
    default: "ReelSave — Instagram Downloader: Videos, Reels, Photos & More",
    template: "%s | ReelSave",
  },
  description: "Download Instagram Videos, Reels, Photos, Stories, IGTV, Carousels, and Profile Pictures in HD quality. Free, fast, no watermark, no login required.",
  keywords: ["instagram downloader", "instagram reels downloader", "instagram video downloader", "instagram photo downloader", "instagram story downloader", "igtv downloader", "download instagram free"],
  authors: [{ name: "ReelSave" }],
  openGraph: {
    title: "ReelSave — Instagram Downloader",
    description: "Download Instagram content in HD for free. Reels, Videos, Photos, Stories, IGTV, Carousels and Profile Pictures.",
    type: "website",
    url: "https://reelsave.app",
    siteName: "ReelSave",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReelSave — Instagram Downloader",
    description: "Download Instagram Reels, Videos, Photos, Stories, IGTV and more for free in HD quality.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ReelSave",
              url: "https://reelsave.app",
              description: "Free Instagram downloader for videos, reels, photos, stories, IGTV, carousels, and profile pictures.",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
