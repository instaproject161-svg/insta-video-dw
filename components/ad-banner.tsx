interface AdBannerProps {
  slot?: "header" | "sidebar" | "in-content" | "footer";
  className?: string;
}

export function AdBanner({ slot = "in-content", className = "" }: AdBannerProps) {
  const sizeMap = {
    header: "h-[90px] max-w-[728px]",
    sidebar: "h-[250px] max-w-[300px]",
    "in-content": "h-[90px] max-w-[728px]",
    footer: "h-[90px] max-w-[728px]",
  };

  return (
    <div
      className={`w-full mx-auto flex items-center justify-center border border-dashed border-border/40 rounded-xl bg-secondary/30 text-muted-foreground text-xs ${sizeMap[slot]} ${className}`}
      aria-hidden="true"
      data-ad-slot={slot}
    >
      Advertisement ({slot})
    </div>
  );
}
