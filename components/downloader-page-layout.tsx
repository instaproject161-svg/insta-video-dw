import { FAQ } from "@/components/faq";
import { Features } from "@/components/features";
import { SupportedFormats } from "@/components/supported-formats";
import { AdBanner } from "@/components/ad-banner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { DownloaderHero } from "@/components/downloader-hero";
import { DOWNLOADER_CONFIGS, DownloaderType } from "@/lib/downloader-types";

interface DownloaderPageProps {
  type: DownloaderType;
}

export function DownloaderPageLayout({ type }: DownloaderPageProps) {
  const config = DOWNLOADER_CONFIGS[type];

  return (
    <main className="min-h-screen">
      <Header />
      <DownloaderHero type={type} />
      <section id="features"><Features /></section>
      <section id="formats"><SupportedFormats /></section>
      <section id="faq">
        <FAQ faqs={config.faqs} />
      </section>
      <div className="py-8 px-4 max-w-3xl mx-auto">
        <AdBanner slot="footer" />
      </div>
      <Footer />
      <BackToTop />
    </main>
  );
}
