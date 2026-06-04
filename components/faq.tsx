"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItem } from "@/lib/downloader-types";

const defaultFaqs: FAQItem[] = [
  {
    question: "Is ReelSave free to use?",
    answer: "Yes, ReelSave is completely free to use. There are no hidden fees, subscriptions, or premium tiers. You can download unlimited Instagram content without paying anything.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account or login is needed. Simply paste the Instagram URL and download directly. We believe in making things as simple as possible.",
  },
  {
    question: "What content types can I download?",
    answer: "You can download Instagram Reels, Videos, Photos, Stories, IGTV videos, Carousel posts (all images/videos at once), and full-size Profile Pictures.",
  },
  {
    question: "What video quality can I download?",
    answer: "We provide the highest quality available for each piece of content, typically HD (1080p) or the original resolution uploaded by the creator.",
  },
  {
    question: "Is it safe to use ReelSave?",
    answer: "Absolutely. We never store your personal data, we do not require login credentials, and nothing is installed on your device. Your privacy is our priority.",
  },
  {
    question: "Can I download on my phone?",
    answer: "Yes! ReelSave works perfectly on all devices including iPhones, Android phones, tablets, and desktop computers. No app installation required.",
  },
  {
    question: "Can I download from private accounts?",
    answer: "No. We can only process publicly available content. Downloading from private accounts is not supported and would violate Instagram's terms of service.",
  },
  {
    question: "Why did my download fail?",
    answer: "Downloads may fail if the content is from a private account, has been deleted, or if the URL is incorrect. Make sure to copy the full URL and try again.",
  },
];

interface FAQProps {
  faqs?: FAQItem[];
}

export function FAQ({ faqs = defaultFaqs }: FAQProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Got questions? We have answers.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card rounded-xl px-6 data-[state=open]:border-primary/40 transition-colors duration-200"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 text-base sm:text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
