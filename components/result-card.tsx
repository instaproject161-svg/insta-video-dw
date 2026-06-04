import { Download, ExternalLink, Film, Image, FileVideoCamera as FileVideo, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloaderType } from "@/lib/downloader-types";
import { cn } from "@/lib/utils";

export interface DownloadResult {
  type: DownloaderType;
  thumbnail?: string;
  title?: string;
  author?: string;
  duration?: string;
  quality: string;
  fileSize?: string;
  downloadUrl: string;
  mediaType: "video" | "image" | "carousel";
}

interface ResultCardProps {
  result: DownloadResult;
  onReset: () => void;
}

const typeIcon: Record<DownloadResult["mediaType"], typeof Film> = {
  video: Film,
  image: Image,
  carousel: FileVideo,
};

export function ResultCard({ result, onReset }: ResultCardProps) {
  const Icon = typeIcon[result.mediaType];

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-2xl overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-400">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-32 h-40 sm:h-28 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
          {result.thumbnail ? (
            <img
              src={result.thumbnail}
              alt={result.title ?? "Download preview"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="w-10 h-10 text-muted-foreground" />
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-xs font-medium text-foreground">
            {result.quality}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-2 justify-between">
          <div>
            {result.title && (
              <p className="text-foreground font-semibold text-sm line-clamp-2 leading-snug mb-1">
                {result.title}
              </p>
            )}
            {result.author && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <User className="w-3 h-3" />
                <span>@{result.author}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={cn(
                "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium",
                "bg-primary/10 text-primary border border-primary/20"
              )}>
                <Icon className="w-3 h-3" />
                {result.mediaType.charAt(0).toUpperCase() + result.mediaType.slice(1)}
              </span>
              {result.duration && (
                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
                  {result.duration}
                </span>
              )}
              {result.fileSize && (
                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
                  {result.fileSize}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-1.5 shadow-lg shadow-primary/20"
              asChild
            >
              <a href={result.downloadUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4" />
                Download Now
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 border-border/60"
              asChild
            >
              <a href={result.downloadUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={onReset}
            >
              New Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
