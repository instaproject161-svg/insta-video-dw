import Link from "next/link";
import { Play, ExternalLink } from "lucide-react";

const downloaderLinks = [
  { label: "Video Downloader", href: "/video-downloader" },
  { label: "Photo Downloader", href: "/photo-downloader" },
  { label: "Reels Downloader", href: "/reels-downloader" },
  { label: "Story Downloader", href: "/story-downloader" },
  { label: "IGTV Downloader", href: "/igtv-downloader" },
  { label: "Carousel Downloader", href: "/carousel-downloader" },
  { label: "Profile Picture", href: "/profile-picture-downloader" },
];

const companyLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label="ReelSave Home">
              <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Play className="w-4 h-4 text-primary" fill="currentColor" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-foreground">ReelSave</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The fastest and easiest way to download Instagram content in HD quality. Free, no watermark, no login required.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">HD Quality</div>
              <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">No Watermark</div>
              <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">Free</div>
            </div>
          </div>

          <nav aria-label="Downloader tools">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Downloaders</h3>
            <ul className="space-y-2.5" role="list">
              {downloaderLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group">
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company links">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5" role="list">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} ReelSave. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-3xl mx-auto">
            ReelSave is an independent tool and is not affiliated with Instagram&reg;, Meta Platforms, Inc., or their subsidiaries.
            Users are responsible for ensuring they have permission to download and use any content.
          </p>
        </div>
      </div>
    </footer>
  );
}
