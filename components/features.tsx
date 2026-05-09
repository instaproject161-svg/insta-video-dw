import { Zap, Shield, Smartphone, Cloud, Globe, Heart } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Download reels in seconds with our optimized servers. No waiting, no buffering.",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your privacy matters. We never store your data or require any login.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on all devices. Download on the go from your phone.",
  },
  {
    icon: Cloud,
    title: "No Installation",
    description: "Use directly in your browser. No apps or extensions required.",
  },
  {
    icon: Globe,
    title: "Works Worldwide",
    description: "Access from anywhere in the world with no restrictions.",
  },
  {
    icon: Heart,
    title: "Free Forever",
    description: "No hidden fees, no subscriptions. Completely free to use.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Why Choose ReelSave?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            The most reliable and user-friendly Instagram Reel downloader on the web.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
