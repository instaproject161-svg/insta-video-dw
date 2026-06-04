"use client";

import { Play, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

const downloaderLinks = [
  { label: "Video Downloader", href: "/video-downloader" },
  { label: "Photo Downloader", href: "/photo-downloader" },
  { label: "Reels Downloader", href: "/reels-downloader" },
  { label: "Story Downloader", href: "/story-downloader" },
  { label: "IGTV Downloader", href: "/igtv-downloader" },
  { label: "Carousel Downloader", href: "/carousel-downloader" },
  { label: "Profile Picture", href: "/profile-picture-downloader" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Play className="w-4 h-4 text-primary" fill="currentColor" />
            </div>
            <span className="text-lg font-bold text-foreground">ReelSave</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Tools dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors">
                Tools
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 glass-card rounded-xl shadow-xl overflow-hidden py-1">
                  {downloaderLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/blog" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors">
              Blog
            </Link>
            <a href="#features" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors">
              Features
            </a>
            <a href="#faq" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors">
              FAQ
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg px-5 shadow-lg shadow-primary/20"
              asChild
            >
              <a href="#downloader">Download Free</a>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-secondary/60 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <nav className="flex flex-col gap-1">
              <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">Tools</p>
              {downloaderLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border/40 my-2 mx-3" />
              <Link href="/blog" className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <a href="#features" className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#faq" className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </a>
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg mt-2"
                onClick={() => setIsMenuOpen(false)}
                asChild
              >
                <a href="#downloader">Download Free</a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
