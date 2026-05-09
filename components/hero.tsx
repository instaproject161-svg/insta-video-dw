"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Link2, Loader2, CheckCircle2, Play } from "lucide-react";

export function Hero() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setUrl("");
    }, 3000);
  };

  const isValidUrl = url.includes("instagram.com") || url.includes("instagr.am");

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Logo/Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-primary/10 border border-primary/20">
          <Play className="w-8 h-8 text-primary" fill="currentColor" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4 text-balance">
          Download Instagram Reels
          <span className="block text-primary mt-2">Fast & Free</span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg sm:text-xl max-w-lg mx-auto mb-10 leading-relaxed text-pretty">
          Save your favorite Instagram Reels in HD quality. No watermark, no login required.
        </p>

        {/* Download Form */}
        <div className="w-full max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl border border-border shadow-lg">
            <div className="relative flex-1">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="url"
                placeholder="Paste Instagram Reel URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-input border-0 rounded-xl text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:ring-2"
              />
            </div>
            <Button
              onClick={handleDownload}
              disabled={!url.trim() || isLoading}
              className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </>
              )}
            </Button>
          </div>

          {/* URL validation hint */}
          {url && !isValidUrl && (
            <p className="mt-3 text-sm text-destructive">
              Please enter a valid Instagram URL
            </p>
          )}
          {url && isValidUrl && !isLoading && !isSuccess && (
            <p className="mt-3 text-sm text-primary">
              Valid Instagram URL detected
            </p>
          )}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>No Watermark</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>HD Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Free Forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}
