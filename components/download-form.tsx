"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Link2, Loader as Loader2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, X } from "lucide-react";
import { DownloaderConfig } from "@/lib/downloader-types";
import { cn } from "@/lib/utils";

interface DownloadFormProps {
  config: DownloaderConfig;
}

type FormState = "idle" | "loading" | "success" | "error";

export function DownloadForm({ config }: DownloadFormProps) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidUrl = url.includes("instagram.com") || url.includes("instagr.am");

  const handleDownload = async () => {
    if (!url.trim() || !isValidUrl) return;

    setState("loading");
    setErrorMessage("");

    try {
      const response = await fetch(config.apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to process the URL. Please try again.");
      }

      setState("success");
      setTimeout(() => {
        setState("idle");
        setUrl("");
      }, 4000);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleDownload();
  };

  const handleClear = () => {
    setUrl("");
    setState("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {/* Input Row */}
      <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl border border-border shadow-lg">
        <div className="relative flex-1">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            type="url"
            placeholder={config.placeholder}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (state === "error") setState("idle");
            }}
            onKeyDown={handleKeyDown}
            disabled={state === "loading" || state === "success"}
            className="w-full h-14 pl-12 pr-10 bg-input border-0 rounded-xl text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:ring-2 disabled:opacity-60"
          />
          {url && state !== "loading" && state !== "success" && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          onClick={handleDownload}
          disabled={!url.trim() || !isValidUrl || state === "loading" || state === "success"}
          className={cn(
            "h-14 px-6 rounded-xl font-semibold transition-all duration-300 shrink-0",
            state === "success"
              ? "bg-green-600 hover:bg-green-600 text-white"
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
          )}
        >
          {state === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : state === "success" ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Downloaded!
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              {config.buttonLabel}
            </>
          )}
        </Button>
      </div>

      {/* Validation / Status Messages */}
      <div className="min-h-[24px] px-1">
        {url && !isValidUrl && state !== "loading" && (
          <p className="text-sm text-destructive flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Please enter a valid Instagram URL
          </p>
        )}
        {url && isValidUrl && state === "idle" && (
          <p className="text-sm text-primary flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Valid Instagram URL detected
          </p>
        )}
        {state === "error" && errorMessage && (
          <p className="text-sm text-destructive flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMessage}
          </p>
        )}
        {state === "success" && (
          <p className="text-sm text-green-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Your download is ready!
          </p>
        )}
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-sm text-muted-foreground">
        {[
          { label: "No Watermark" },
          { label: "HD Quality" },
          { label: "Free Forever" },
          { label: "No Login Required" },
        ].map(({ label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
