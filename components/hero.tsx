"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { DownloaderTabs } from "@/components/downloader-tabs";
import { DownloadForm } from "@/components/download-form";
import { DOWNLOADER_CONFIGS, DownloaderType } from "@/lib/downloader-types";

export function Hero() {
  const [activeTab, setActiveTab] = useState<DownloaderType>("reels");
  const config = DOWNLOADER_CONFIGS[activeTab];

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Brand icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 shadow-lg shadow-primary/10">
          <Play className="w-8 h-8 text-primary" fill="currentColor" />
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
            {config.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-primary">
              {config.heading.split(" ").slice(-1)}
            </span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed text-pretty">
            {config.subheading}
          </p>
        </div>

        {/* Tabs */}
        <DownloaderTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Form */}
        <div className="w-full">
          <DownloadForm config={config} />
        </div>
      </div>
    </section>
  );
}
