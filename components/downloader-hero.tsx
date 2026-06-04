"use client";

import { DownloaderTabs } from "@/components/downloader-tabs";
import { DownloadForm } from "@/components/download-form";
import { AdBanner } from "@/components/ad-banner";
import { DOWNLOADER_CONFIGS, DownloaderType } from "@/lib/downloader-types";

interface DownloaderHeroProps {
  type: DownloaderType;
}

export function DownloaderHero({ type }: DownloaderHeroProps) {
  const config = DOWNLOADER_CONFIGS[type];
  const Icon = config.icon;

  return (
    <section
      id="downloader"
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 shadow-xl shadow-primary/10 animate-float">
          <Icon className="w-8 h-8 text-primary" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/20 text-xs font-semibold text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Free • No Watermark • HD Quality • No Login
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground text-balance leading-tight">
            {config.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-text">{config.heading.split(" ").slice(-1)}</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed text-pretty">
            {config.subheading}
          </p>
        </div>

        <DownloaderTabs activeTab={type} navigateOnChange />
        <DownloadForm config={config} />
        <AdBanner slot="in-content" className="mt-2" />
      </div>
    </section>
  );
}
