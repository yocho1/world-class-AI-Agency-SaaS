import type { Metadata } from "next";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Accessibility Statement | AL Solutions AI",
  description:
    "AL Solutions AI's commitment to web accessibility. We aim to meet WCAG 2.1 Level AA standards on alsolutionsai.online.",
  openGraph: {
    title: "Accessibility Statement | AL Solutions AI",
    description:
      "Our commitment to making alsolutionsai.online accessible to everyone, including those using assistive technology.",
    url: canonicalUrl("/accessibility-statement"),
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=Accessibility%20Statement&subtitle=Our%20commitment%20to%20accessible%20web%20design.&tag=Legal`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: alternatesFor("/accessibility-statement"),
};

export default function AccessibilityStatementPage() {
  return (
    <main className="container py-12 sm:py-16 md:py-20">
      <article className="mx-auto max-w-3xl prose prose-invert">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Legal</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Accessibility Statement
          </h1>
          <p className="mt-4 text-sm text-text-tertiary">Last updated: 25 June 2026</p>
        </div>

        <div className="space-y-8 text-text-secondary">
          <section>
            <p className="leading-relaxed">
              <strong>Solutions AI Ltd</strong> (Company No. 11521309), trading as AL Solutions AI, is committed 
              to making alsolutionsai.online accessible to as many people as possible, including those using 
              assistive technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">1. Our commitment</h2>
            <p className="mt-4 leading-relaxed">
              We aim to meet <strong>WCAG 2.1 Level AA</strong> as our target standard, covering areas such as:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Sufficient colour contrast for text and interactive elements</li>
              <li>Keyboard navigability across the Site, including the demo chatbot and booking widget</li>
              <li>Descriptive alt text for images</li>
              <li>Clear, consistent heading structure for screen readers</li>
              <li>Resizable text without loss of functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">2. Known limitations</h2>
            <p className="mt-4 leading-relaxed">
              We're continuing to improve accessibility across the Site. Some third-party embeds (the Calendly 
              booking widget, the demo chatbot, WhatsApp link) are built and maintained by external providers, 
              and their accessibility is governed by those providers' own standards rather than ours directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">3. Feedback</h2>
            <p className="mt-4 leading-relaxed">
              If you encounter any accessibility barrier using this Site, please let us know — we'll do our best 
              to fix it or provide the information you need in an alternative format.
            </p>
            <p className="mt-4 leading-relaxed">
              Email:{" "}
              <a 
                href="mailto:hello@alsolutionsai.online"
                className="text-accent-400 hover:text-accent-300"
              >
                hello@alsolutionsai.online
              </a>
              <br />
              WhatsApp: <a 
                href="https://wa.me/447418360646"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 hover:text-accent-300"
              >
                +44 7418 360646
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">4. Enforcement</h2>
            <p className="mt-4 leading-relaxed">
              This statement applies to alsolutionsai.online. We review and update our approach to accessibility 
              periodically as the Site evolves.
            </p>
            <p className="mt-6 leading-relaxed font-semibold text-text-primary">Solutions AI Ltd</p>
            <p className="leading-relaxed">
              19 Shepiston Lane, Hayes, United Kingdom, UB3 1LH
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
