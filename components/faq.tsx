"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is ReelSave free to use?",
    answer: "Yes, ReelSave is completely free to use. There are no hidden fees, subscriptions, or premium features. You can download unlimited Instagram Reels without paying anything.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No, you don&apos;t need to create an account or log in. Simply paste the Instagram Reel URL and download directly. We believe in making things simple.",
  },
  {
    question: "What video quality can I download?",
    answer: "We provide the highest quality available for each Reel, typically in HD (1080p) or the original resolution uploaded by the creator.",
  },
  {
    question: "Is it safe to use ReelSave?",
    answer: "Absolutely. We don&apos;t store any personal data, we don&apos;t require login credentials, and we don&apos;t install anything on your device. Your privacy is our priority.",
  },
  {
    question: "Can I download Reels on my phone?",
    answer: "Yes! ReelSave works perfectly on all devices including iPhones, Android phones, tablets, and computers. No app installation required.",
  },
  {
    question: "Why did my download fail?",
    answer: "Downloads may fail if the Reel is from a private account, has been deleted, or if the URL is incorrect. Make sure to copy the complete URL and try again.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors duration-300"
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
