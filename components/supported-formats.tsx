import { FileVideoCamera as FileVideo, Image, Layers, BookOpen } from "lucide-react";

const formats = [
  {
    icon: FileVideo,
    title: "MP4 Videos",
    description: "Download Reels, IGTV, and video posts in MP4 format up to 1080p quality.",
    tags: ["MP4", "HD", "1080p"],
  },
  {
    icon: Image,
    title: "JPEG / PNG Photos",
    description: "Save photos and profile pictures in original resolution without compression.",
    tags: ["JPEG", "PNG", "Full Resolution"],
  },
  {
    icon: Layers,
    title: "Carousel Albums",
    description: "Download all images and videos from multi-post carousels in one click.",
    tags: ["Multiple Files", "ZIP", "Bulk Download"],
  },
  {
    icon: BookOpen,
    title: "Stories",
    description: "Save 24-hour stories (photos and videos) anonymously before they expire.",
    tags: ["Anonymous", "Photos", "Videos"],
  },
];

export function SupportedFormats() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Supported Formats
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Download any Instagram content in the highest quality available.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {formats.map((format, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <format.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{format.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{format.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {format.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
