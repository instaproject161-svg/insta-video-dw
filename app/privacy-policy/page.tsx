import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | ReelSave",
  description: "Read ReelSave's Privacy Policy to understand how we collect, use, and protect your information when using our Instagram downloader service.",
  keywords: ["reelsave privacy policy", "instagram downloader privacy", "data protection"],
  openGraph: {
    title: "Privacy Policy | ReelSave",
    description: "ReelSave's Privacy Policy — how we handle your data.",
    type: "website",
  },
  twitter: { card: "summary", title: "Privacy Policy | ReelSave" },
  alternates: { canonical: "https://reelsave.app/privacy-policy" },
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

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Introduction */}
        <Section title="1. Introduction">
          <p>
            Welcome to ReelSave (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). ReelSave operates the website
            reelsave.app (the &ldquo;Service&rdquo;) — a free online tool that allows users to download publicly available
            Instagram content including videos, reels, photos, stories, and more.
          </p>
          <p>
            This Privacy Policy explains what information we collect when you use the Service, how we use that information,
            and your choices regarding your data. By using ReelSave, you agree to the collection and use of information
            in accordance with this policy.
          </p>
          <p>
            ReelSave is an independent tool and is <strong className="text-foreground">not affiliated with Instagram®,
            Meta Platforms, Inc., or any of their subsidiaries.</strong>
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect minimal information to operate the Service effectively:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">URLs you submit:</strong> When you paste an Instagram URL to download,
              that URL is temporarily processed on our servers to retrieve the content. We do not store URLs or associate
              them with any user identity after the request completes.
            </li>
            <li>
              <strong className="text-foreground">Log data:</strong> Like most web services, our servers automatically
              record standard log information including your IP address, browser type, referring URLs, pages visited, and
              timestamps. This data is retained for up to 30 days for security and diagnostic purposes.
            </li>
            <li>
              <strong className="text-foreground">Contact form submissions:</strong> If you contact us via the contact
              form, we collect your name, email address, and message content solely to respond to your inquiry.
            </li>
            <li>
              <strong className="text-foreground">Cookies and local storage:</strong> We use cookies and similar
              technologies as described in the Cookies section below.
            </li>
          </ul>
          <p>
            We do <strong className="text-foreground">not</strong> collect Instagram usernames, passwords, or account
            credentials of any kind.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, operate, and maintain the Service</li>
            <li>Process download requests in real time</li>
            <li>Monitor and analyze usage patterns to improve performance</li>
            <li>Detect and prevent fraudulent or abusive requests</li>
            <li>Respond to your support inquiries</li>
            <li>Display relevant advertisements (see Advertising section)</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>
            We do not sell, trade, or rent your personal information to third parties for marketing purposes.
          </p>
        </Section>

        <Section title="4. Cookies Policy">
          <p>
            ReelSave uses cookies — small text files placed on your device — to enhance your experience:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Essential cookies:</strong> Required for the Service to function
              correctly (e.g., session management).
            </li>
            <li>
              <strong className="text-foreground">Analytics cookies:</strong> Used by Vercel Analytics and similar
              tools to understand how visitors interact with our site. These cookies do not identify you personally.
            </li>
            <li>
              <strong className="text-foreground">Advertising cookies:</strong> If Google AdSense ads are displayed,
              Google may place cookies to serve relevant advertisements based on your browsing history.
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling certain cookies may affect the functionality
            of the Service.
          </p>
        </Section>

        <Section title="5. Analytics Usage">
          <p>
            We use <strong className="text-foreground">Vercel Analytics</strong> to collect anonymised, aggregated
            page-view data including page URLs, referrer information, and device type. This helps us understand
            which features are most useful and improve the Service.
          </p>
          <p>
            Vercel Analytics is designed to be privacy-friendly and does not use cookies or fingerprinting techniques
            to track individual users across sessions.
          </p>
        </Section>

        <Section title="6. Advertising & Google AdSense">
          <p>
            ReelSave may display advertisements served by <strong className="text-foreground">Google AdSense</strong>.
            Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to our
            website and other websites on the internet.
          </p>
          <p>
            You may opt out of personalised advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Ads Settings
            </a>
            {" "}or by visiting{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              aboutads.info
            </a>
            .
          </p>
          <p>
            Third-party advertising partners, including Google, may use cookies and web beacons to serve ads and to
            compile anonymous statistics about ad interactions. These third parties have their own privacy policies
            governing the use of that information.
          </p>
        </Section>

        <Section title="7. Third-Party Services">
          <p>Our Service may use the following third-party services, each governed by their own privacy policy:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Vercel</strong> — hosting and analytics (vercel.com/privacy)</li>
            <li><strong className="text-foreground">Google AdSense</strong> — advertising (policies.google.com/privacy)</li>
            <li>
              <strong className="text-foreground">RapidAPI / Instagram data providers</strong> — used internally to
              retrieve publicly available content metadata
            </li>
          </ul>
          <p>
            We are not responsible for the privacy practices of these third parties and encourage you to review
            their privacy policies.
          </p>
        </Section>

        <Section title="8. Data Security">
          <p>
            We implement industry-standard security measures to protect your information. All data is transmitted over
            HTTPS. We do not store downloaded media files — all processing occurs in-memory and files are served
            directly to you without being saved to our servers.
          </p>
          <p>
            However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot
            guarantee absolute security of your information.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>Depending on your jurisdiction, you may have the following rights:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Access:</strong> Request a copy of any personal data we hold about you.</li>
            <li><strong className="text-foreground">Deletion:</strong> Request deletion of personal data we hold.</li>
            <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate data.</li>
            <li><strong className="text-foreground">Objection:</strong> Object to certain processing of your data.</li>
            <li><strong className="text-foreground">Portability:</strong> Request your data in a portable format.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <Section title="10. Children's Privacy">
          <p>
            ReelSave is not directed to children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and believe your child has provided
            us with personal information, please contact us immediately and we will take steps to delete such information.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we make significant changes, we will update the
            &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this page periodically.
            Continued use of the Service after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
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
