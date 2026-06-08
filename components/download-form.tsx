"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Link2, Loader as Loader2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, X, Copy, RefreshCw } from "lucide-react";
import { DownloaderConfig } from "@/lib/downloader-types";
import { ResultCard, DownloadResult } from "@/components/result-card";
import { cn } from "@/lib/utils";

interface DownloadFormProps {
  config: DownloaderConfig;
}

type FormState = "idle" | "loading" | "success" | "error";

export function DownloadForm({ config }: DownloadFormProps) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [copied, setCopied] = useState(false);

  const isValidUrl = url.includes("instagram.com") || url.includes("instagr.am");

  const handleDownload = async () => {
    if (!url.trim() || !isValidUrl) return;

    setState("loading");
    setErrorMessage("");
    setResult(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(config.apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      if (!data.success || !data.result) {
        throw new Error(data.error || "Invalid response from server");
      }

      setResult(data.result as DownloadResult);
      setState("success");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setErrorMessage("Request timed out. Please try again.");
      } else {
        setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
      setState("error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleDownload();
    }
  };

  const handleClear = () => {
    setUrl("");
    setState("idle");
    setErrorMessage("");
    setResult(null);
  };

  const handleCopyUrl = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy URL");
    }
  };

  const handleRetry = () => {
    setState("idle");
    setErrorMessage("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {state !== "success" && (
        <div className="flex flex-col sm:flex-row gap-3 p-2 glass rounded-2xl shadow-xl shadow-black/20">
          <div className="relative flex-1">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <Input
              type="url"
              placeholder={config.placeholder}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (state === "error") setState("idle");
              }}
              onKeyDown={handleKeyDown}
              disabled={state === "loading"}
              aria-label="Instagram URL"
              aria-describedby="url-validation"
              aria-invalid={!isValidUrl && url.length > 0}
              className="w-full h-14 pl-11 pr-20 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60"
            />
            {url && state !== "loading" && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  onClick={handleCopyUrl}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  title="Copy URL"
                  aria-label="Copy URL to clipboard"
                  type="button"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                </button>
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  aria-label="Clear input"
                  type="button"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
          <Button
            onClick={handleDownload}
            disabled={!url.trim() || !isValidUrl || state === "loading"}
            className="h-14 px-6 rounded-xl font-semibold transition-all duration-300 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 disabled:opacity-40"
            type="button"
          >
            {state === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" aria-hidden="true" />
                {config.buttonLabel}
              </>
            )}
          </Button>
        </div>
      )}

      {state === "loading" && (
        <div className="w-full glass-card rounded-2xl p-4 animate-pulse" aria-live="polite" aria-busy="true">
          <div className="flex gap-4">
            <div className="w-32 h-28 rounded-xl bg-secondary shrink-0" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-secondary rounded-lg w-3/4" />
              <div className="h-3 bg-secondary rounded-lg w-1/2" />
              <div className="h-3 bg-secondary rounded-lg w-1/4" />
              <div className="flex gap-2 pt-2">
                <div className="h-8 w-28 bg-secondary rounded-lg" />
                <div className="h-8 w-20 bg-secondary rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      )}

      {state === "success" && result && (
        <div aria-live="polite">
          <ResultCard result={result} onReset={handleClear} />
        </div>
      )}

      <div className="min-h-[22px] px-1" id="url-validation">
        {url && !isValidUrl && state !== "loading" && (
          <p className="text-sm text-destructive flex items-center gap-1.5" role="alert">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            Please enter a valid Instagram URL
          </p>
        )}
        {url && isValidUrl && state === "idle" && (
          <p className="text-sm text-primary flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            Valid Instagram URL detected
          </p>
        )}
        {state === "error" && errorMessage && (
          <div className="flex items-center justify-between" role="alert">
            <p className="text-sm text-destructive flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              {errorMessage}
            </p>
            <button
              onClick={handleRetry}
              className={cn(
                "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary/60"
              )}
              type="button"
            >
              <RefreshCw className="w-3 h-3" aria-hidden="true" />
              Retry
            </button>
          </div>
        )}
      </div>

      {state !== "success" && (
        <div className="flex flex-wrap items-center justify-center gap-5 pt-1 text-sm text-muted-foreground" role="list" aria-label="Features">
          {["No Watermark", "HD Quality", "Free Forever", "No Login Required"].map((label) => (
            <div key={label} className="flex items-center gap-1.5" role="listitem">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { DownloadForm };
