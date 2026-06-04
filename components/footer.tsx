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
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Play className="w-4 h-4 text-primary" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-foreground">ReelSave</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The fastest and easiest way to download Instagram content in HD quality. Free, no watermark, no login required.
            </p>
            <div className="flex gap-3 mt-5">
              <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">HD Quality</div>
              <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">No Watermark</div>
              <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">Free</div>
            </div>
          </div>

          {/* Downloaders */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Downloaders</h3>
            <ul className="space-y-2.5">
              {downloaderLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group">
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ReelSave. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center sm:text-right max-w-md leading-relaxed">
            ReelSave is not affiliated with Instagram or Meta Platforms, Inc. Only download content you have permission to use.
          </p>
        </div>
      </div>
    </footer>
  );
}
