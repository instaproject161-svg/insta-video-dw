import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sofia Martinez",
    handle: "@sofia_creates",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2",
    text: "Best Instagram downloader I have used. Zero watermarks and the HD quality is perfect for my content library.",
    stars: 5,
  },
  {
    name: "James Chen",
    handle: "@jamesshots",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2",
    text: "Downloaded hundreds of Reels for my research. Fast, clean, and completely free. ReelSave is unbeatable.",
    stars: 5,
  },
  {
    name: "Amara Okonkwo",
    handle: "@amara.art",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2",
    text: "I save inspiration carousels all the time. The carousel downloader gets every image in one shot. Game changer.",
    stars: 5,
  },
  {
    name: "Luca Ferreira",
    handle: "@luca.films",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2",
    text: "No sign-up, no annoying pop-ups, no watermarks. Just paste the link and download. Exactly what I needed.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    handle: "@priya.style",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2",
    text: "The Story downloader is amazing. I can save stories anonymously before they disappear. Works flawlessly!",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    handle: "@marcuswebb",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2",
    text: "Tried every Instagram downloader out there. ReelSave is the only one that consistently delivers HD quality.",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Loved by Millions
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            Join over 5 million users who trust ReelSave every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="text-foreground text-sm font-semibold">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
