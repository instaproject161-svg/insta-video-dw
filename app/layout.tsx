import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ReelSave - Instagram Downloader: Videos, Reels, Photos & More',
  description: 'Download Instagram Videos, Reels, Photos, Stories, IGTV, Carousels, and Profile Pictures in HD quality. Free, fast, no watermark, no login required.',
  keywords: ['instagram downloader', 'instagram reels downloader', 'instagram video downloader', 'instagram photo downloader', 'instagram story downloader', 'igtv downloader'],
  openGraph: {
    title: 'ReelSave - Instagram Downloader',
    description: 'Download Instagram content in HD for free. Reels, Videos, Photos, Stories, IGTV, Carousels and Profile Pictures.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
