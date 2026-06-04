"use client";

import { DOWNLOADER_CONFIGS, DOWNLOADER_TABS, DownloaderType } from "@/lib/downloader-types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface DownloaderTabsProps {
  activeTab: DownloaderType;
  onTabChange?: (tab: DownloaderType) => void;
  navigateOnChange?: boolean;
}

export function DownloaderTabs({ activeTab, onTabChange, navigateOnChange = false }: DownloaderTabsProps) {
  const router = useRouter();

  const handleClick = (tab: DownloaderType) => {
    if (navigateOnChange) {
      router.push(DOWNLOADER_CONFIGS[tab].pageRoute);
    } else {
      onTabChange?.(tab);
    }
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-1 min-w-max mx-auto p-1 bg-card/80 rounded-2xl border border-border backdrop-blur-sm">
        {DOWNLOADER_TABS.map((tab) => {
          const config = DOWNLOADER_CONFIGS[tab];
          const Icon = config.icon;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => handleClick(tab)}
              className={cn(
                "relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{config.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
