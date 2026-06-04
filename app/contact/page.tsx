import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactPage } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | ReelSave",
  description: "Get in touch with the ReelSave team. We're here to help with questions, feedback, DMCA requests, and more.",
  keywords: ["contact reelsave", "instagram downloader support", "reelsave help"],
  openGraph: {
    title: "Contact Us | ReelSave",
    description: "Reach out to the ReelSave team — we respond within 48 hours.",
    type: "website",
  },
  twitter: { card: "summary", title: "Contact Us | ReelSave" },
  alternates: { canonical: "https://reelsave.app/contact" },
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactPage />
      <Footer />
    </main>
  );
}
