import { Copy, Link, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Copy,
    title: "Copy the Link",
    description: "Open Instagram and copy the link of the Reel you want to download.",
  },
  {
    step: "02",
    icon: Link,
    title: "Paste the URL",
    description: "Paste the copied URL into the input field above and click Download.",
  },
  {
    step: "03",
    icon: Download,
    title: "Download & Enjoy",
    description: "Your Reel will be processed and ready to download in seconds.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Download Instagram Reels in just 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
              )}
              
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-primary/10 border-2 border-primary/20">
                <step.icon className="w-10 h-10 text-primary" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground text-sm font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
