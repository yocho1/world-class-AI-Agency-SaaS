import Link from "next/link";
import type { Metadata } from "next";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service | AL Solutions AI",
  description:
    "Terms of Service for alsolutionsai.online and AL Solutions AI (Co. No. 11521309). Covers website use, intellectual property, and paid engagements.",
  openGraph: {
    title: "Terms of Service | AL Solutions AI",
    description:
      "Terms of Service covering website use, intellectual property, and paid engagements with AL Solutions AI.",
    url: canonicalUrl("/terms"),
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=Terms%20of%20Service&subtitle=Legal%20terms%20governing%20your%20use.&tag=Legal`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: alternatesFor("/terms"),
};

export default function TermsPage() {
  return (
    <main className="container py-12 sm:py-16 md:py-20">
      <article className="mx-auto max-w-3xl prose prose-invert">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Legal</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-text-tertiary">Last updated: 25 June 2026</p>
        </div>

        <div className="space-y-8 text-text-secondary">
          <section>
            <p className="leading-relaxed">
              These Terms govern your use of alsolutionsai.online (the "Site"), operated by{" "}
              <strong>Solutions AI Ltd</strong> (Company No. 11521309, registered office 19 Shepiston Lane, 
              Hayes, United Kingdom, UB3 1LH), trading as "AL Solutions AI". By using the Site, you agree to 
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">1. About these Terms</h2>
            <p className="mt-4 leading-relaxed">
              These Terms cover use of the <strong>website</strong> — browsing, the live chatbot demo, booking 
              calls, and downloading resources. Any actual project we deliver for you (AI chatbots, automation, 
              CRM integration, etc.) is governed by a separate signed <strong>Service Agreement / Statement of 
              Work</strong>, which takes priority over these Terms for that engagement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">2. Using the Site</h2>
            <p className="mt-4 leading-relaxed">
              You may browse the Site, use the demo chatbot, book audit calls, and download resources for your 
              own evaluation. You may not:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Scrape, copy, or republish Site content without permission</li>
              <li>Reverse-engineer the demo chatbot or use it to build a competing product</li>
              <li>Use the Site to transmit unlawful, harmful, or abusive content</li>
              <li>Attempt to gain unauthorised access to our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">3. Intellectual property</h2>
            <p className="mt-4 leading-relaxed">
              All content on the Site — text, design, logos, case study write-ups, and the demo chatbot itself — is 
              owned by Solutions AI Ltd or licensed to us, and protected by copyright and other IP laws. Client 
              logos and testimonials shown on the Site are used with permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">4. Case studies, results & testimonials</h2>
            <p className="mt-4 leading-relaxed">
              Performance figures (e.g. response-time reductions, conversion lifts) reflect actual results from 
              named or anonymised client engagements at the time stated. Results vary by business, market, and 
              implementation — past performance is not a guarantee of future results for your project.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">5. Free audits & enquiries</h2>
            <p className="mt-4 leading-relaxed">
              Booking a free audit or submitting the contact form does not create any binding obligation on 
              either side. The written scope report we provide afterwards is non-binding guidance, not a contract, 
              until both parties sign a Service Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">6. Paid engagements</h2>
            <p className="mt-4 leading-relaxed">
              Where you engage us for a project:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Payment terms (e.g. deposit and milestone structure) are set out in your specific Service Agreement</li>
              <li>We do not lock clients into ongoing retainers; any post-launch support package is opt-in</li>
              <li>Deliverable ownership and IP transfer terms are defined per project and confirmed in writing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">7. Third-party services</h2>
            <p className="mt-4 leading-relaxed">
              The Site links to or embeds third-party services, including Calendly, WhatsApp, Google, and LinkedIn. 
              Your use of those services is subject to their own terms — we're not responsible for their availability 
              or content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">8. Disclaimers</h2>
            <p className="mt-4 leading-relaxed">
              The Site and demo chatbot are provided "as is." We don't guarantee the Site will be uninterrupted or 
              error-free, and the demo chatbot is for illustrative purposes — outputs should not be relied on as 
              professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">9. Limitation of liability</h2>
            <p className="mt-4 leading-relaxed">
              To the fullest extent permitted by law, Solutions AI Ltd is not liable for any indirect, incidental, 
              or consequential loss arising from your use of the Site. Nothing in these Terms limits liability that 
              cannot be excluded under English law (e.g. for fraud or death/personal injury caused by negligence). 
              Liability arising from a paid engagement is governed by that engagement's Service Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">10. Governing law</h2>
            <p className="mt-4 leading-relaxed">
              These Terms are governed by the laws of England and Wales. Any disputes will be subject to the 
              exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">11. Changes to these Terms</h2>
            <p className="mt-4 leading-relaxed">
              We may update these Terms from time to time. Continued use of the Site after changes are posted means 
              you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">12. Contact us</h2>
            <p className="mt-4 leading-relaxed font-semibold text-text-primary">Solutions AI Ltd</p>
            <p className="leading-relaxed">
              19 Shepiston Lane, Hayes, United Kingdom, UB3 1LH<br />
              Email:{" "}
              <a 
                href="mailto:legal@alsolutionsai.online"
                className="text-accent-400 hover:text-accent-300"
              >
                legal@alsolutionsai.online
              </a>
              <br />
              WhatsApp:{" "}
              <a 
                href="https://wa.me/447418360646"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 hover:text-accent-300"
              >
                +44 7418 360646
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
