import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service | ReelSave",
  description: "Read ReelSave's Terms of Service. Understand your rights and responsibilities when using our free Instagram downloader tool.",
  keywords: ["reelsave terms of service", "instagram downloader terms", "user agreement"],
  openGraph: {
    title: "Terms of Service | ReelSave",
    description: "ReelSave Terms of Service — your rights and responsibilities.",
    type: "website",
  },
  twitter: { card: "summary", title: "Terms of Service | ReelSave" },
  alternates: { canonical: "https://reelsave.app/terms-of-service" },
};

const CONTACT_EMAIL = "instaproject161@gmail.com";
const LAST_UPDATED = "June 4, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border/50">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed text-[0.9375rem]">{children}</div>
    </section>
  );
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Terms of Service</h1>
          <p className="text-muted-foreground text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using ReelSave (&ldquo;the Service&rdquo;) at reelsave.app, you agree to be bound by these
            Terms of Service (&ldquo;Terms&rdquo;). If you do not agree with any part of these Terms, you may not access
            or use the Service.
          </p>
          <p>
            These Terms apply to all visitors, users, and any others who access or use the Service. We reserve the right
            to update these Terms at any time. Continued use of the Service after any changes constitutes your
            acceptance of the new Terms.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            ReelSave is a free, web-based tool that allows users to download publicly available media content from
            Instagram, including videos, reels, photos, stories, IGTV videos, carousel posts, and profile pictures.
          </p>
          <p>
            ReelSave is an <strong className="text-foreground">independent service</strong> and is not affiliated with,
            endorsed by, or connected to Instagram®, Meta Platforms, Inc., or any of their subsidiaries or affiliates
            in any way.
          </p>
          <p>
            The Service is provided free of charge and &ldquo;as is&rdquo; without any guarantees of uptime,
            availability, or continued operation.
          </p>
        </Section>

        <Section title="3. User Responsibilities">
          <p>By using the Service, you represent and warrant that:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You are at least 13 years of age, or the applicable age of digital consent in your jurisdiction.</li>
            <li>
              You have the legal right to download the content you submit to the Service, or you have obtained
              explicit permission from the content creator to do so.
            </li>
            <li>
              You will use downloaded content only for personal, non-commercial purposes unless you have explicit
              written permission from the original content creator.
            </li>
            <li>
              You will credit the original creator when sharing or reposting downloaded content on any platform.
            </li>
            <li>Your use of the Service complies with all applicable local, national, and international laws.</li>
            <li>
              You will not use the Service to harass, harm, defame, or infringe upon the rights of any person
              or entity.
            </li>
          </ul>
        </Section>

        <Section title="4. Prohibited Uses">
          <p>You are expressly prohibited from using the Service to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Download content from private accounts without the account holder&apos;s consent</li>
            <li>Download, distribute, or commercialise content that infringes third-party intellectual property rights</li>
            <li>Use automated bots, scrapers, or scripts to access the Service at scale</li>
            <li>Circumvent or attempt to circumvent any technical measures or rate limits</li>
            <li>Re-sell or commercialise the Service or access to the Service</li>
            <li>Engage in any activity that disrupts, damages, or impairs the Service</li>
            <li>Download content for the purpose of harassment, stalking, or harm to any individual</li>
            <li>Violate Instagram&apos;s Terms of Service or Community Guidelines</li>
            <li>Engage in any unlawful activity through or in connection with the Service</li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All content available for download via the Service is the intellectual property of the original content
            creators and/or rights holders. ReelSave does not claim ownership of any Instagram content processed
            through the Service.
          </p>
          <p>
            The ReelSave website, including its design, code, branding, and written content, is owned by ReelSave
            and protected by applicable intellectual property laws. You may not reproduce, distribute, or create
            derivative works without our express written permission.
          </p>
          <p>
            If you believe any content available through the Service infringes your intellectual property rights,
            please contact us immediately at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <Section title="6. Disclaimer of Warranties">
          <p>
            THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT ANY WARRANTIES
            OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, error-free, secure, or free of viruses.
            We do not guarantee the accuracy, completeness, or quality of any content retrieved through the Service.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, REELSAVE AND ITS OPERATORS SHALL NOT BE LIABLE FOR
            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS
            OF PROFITS, DATA, USE, OR GOODWILL, ARISING FROM OR RELATED TO YOUR USE OF THE SERVICE.
          </p>
          <p>
            IN NO EVENT SHALL REELSAVE&apos;S TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT PAID BY YOU,
            IF ANY, FOR ACCESSING THE SERVICE IN THE PAST SIX MONTHS. SINCE THE SERVICE IS FREE, THIS EFFECTIVELY
            MEANS OUR LIABILITY IS LIMITED TO $0 USD.
          </p>
        </Section>

        <Section title="8. Service Availability">
          <p>
            We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time,
            with or without notice, for any reason including maintenance, legal compliance, or business decisions.
          </p>
          <p>
            We are not liable to you or any third party for any modification, suspension, or discontinuation
            of the Service.
          </p>
        </Section>

        <Section title="9. Third-Party Links">
          <p>
            The Service may contain links to third-party websites, including Instagram. These links are provided
            for convenience only and do not imply our endorsement of those sites. We have no control over the
            content or practices of third-party sites and are not responsible for them.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising
            under these Terms shall be resolved through good-faith negotiation. If negotiation fails, disputes shall
            be submitted to binding arbitration in accordance with applicable arbitration rules.
          </p>
        </Section>

        <Section title="11. Changes to Terms">
          <p>
            We reserve the right to update these Terms at any time. Material changes will be indicated by an
            updated &ldquo;Last updated&rdquo; date. Your continued use of the Service after changes are posted
            constitutes your acceptance of the revised Terms. We recommend reviewing these Terms periodically.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="mt-3 p-4 glass-card rounded-xl">
            <p className="text-foreground font-medium">ReelSave</p>
            <p>
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>Response time: within 48 business hours</p>
          </div>
        </Section>
      </div>

      <Footer />
    </main>
  );
}
