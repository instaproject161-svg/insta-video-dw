import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { FAQ } from "@/components/faq";
import { SupportedFormats } from "@/components/supported-formats";
import { Testimonials } from "@/components/testimonials";
import { AdBanner } from "@/components/ad-banner";
import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      <section id="features">
        <Features />
      </section>

      <div className="py-4 px-4 max-w-3xl mx-auto">
        <AdBanner slot="in-content" />
      </div>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="formats">
        <SupportedFormats />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <div className="py-6 px-4 max-w-3xl mx-auto">
        <AdBanner slot="footer" />
      </div>

      <Footer />
      <BackToTop />
    </main>
  );
}
