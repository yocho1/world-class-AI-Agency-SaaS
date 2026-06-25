import Link from "next/link";
import type { Metadata } from "next";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Disclaimer | AL Solutions AI",
  description:
    "Disclaimer about content, results, and liability on alsolutionsai.online. Results vary by business. See our Terms of Service for full limitation of liability.",
  openGraph: {
    title: "Disclaimer | AL Solutions AI",
    description:
      "Important disclaimer about results, case studies, and content on our Site.",
    url: canonicalUrl("/disclaimer"),
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=Disclaimer&subtitle=Important%20information%20about%20our%20content.&tag=Legal`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: alternatesFor("/disclaimer"),
};

export default function DisclaimerPage() {
  return (
    <main className="container py-12 sm:py-16 md:py-20">
      <article className="mx-auto max-w-3xl prose prose-invert">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Legal</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Disclaimer
          </h1>
          <p className="mt-4 text-sm text-text-tertiary">Last updated: 25 June 2026</p>
        </div>

        <div className="space-y-8 text-text-secondary">
          <section>
            <p className="leading-relaxed">
              This Disclaimer applies to all content on alsolutionsai.online, operated by{" "}
              <strong>Solutions AI Ltd</strong> (Company No. 11521309), trading as AL Solutions AI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">1. Results and case studies</h2>
            <p className="mt-4 leading-relaxed">
              Performance figures shown on this Site (response-time reductions, conversion lifts, support ticket 
              reductions, and similar metrics) come from actual client engagements, named or anonymised. They are 
              historical results for those specific businesses at that specific time.
            </p>
            <p className="mt-4 leading-relaxed">
              <strong>Your results will vary.</strong> Outcomes depend on your industry, existing systems, data 
              quality, traffic volume, and how the AI system is used after launch. Nothing on this Site is a 
              guarantee of any particular result for your business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">2. Revenue & ROI calculator</h2>
            <p className="mt-4 leading-relaxed">
              The "Calculate your revenue potential" tool on this Site is an <strong>illustrative estimate only</strong>, 
              based on inputs you provide and averages drawn from past client deployments. It is not a forecast, 
              projection, or guarantee of revenue, leads, or conversion rate for your business. Treat the output as 
              a starting point for a conversation, not a financial commitment from us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">3. No professional advice</h2>
            <p className="mt-4 leading-relaxed">
              Content on this Site — including blog posts, FAQs, and responses from the demo AI chatbot — is 
              provided for general informational purposes only. It does not constitute legal, financial, tax, 
              or other professional advice. Always seek advice specific to your circumstances before making 
              business decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">4. Demo chatbot</h2>
            <p className="mt-4 leading-relaxed">
              The chatbot embedded on this Site is a demonstration of the kind of system we build. Its responses 
              are for illustration and may not always be accurate, complete, or representative of a production 
              deployment built for your specific business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">5. Third-party content and links</h2>
            <p className="mt-4 leading-relaxed">
              This Site links to or embeds third-party platforms (Google, Calendly, WhatsApp, LinkedIn) and 
              displays third-party reviews. We don't control and aren't responsible for the accuracy or 
              availability of third-party content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">6. Limitation of liability</h2>
            <p className="mt-4 leading-relaxed">
              To the extent permitted by law, Solutions AI Ltd accepts no liability for decisions made based on 
              content on this Site. See our{" "}
              <Link href="/terms" className="text-accent-400 hover:text-accent-300">
                Terms of Service
              </Link>
              {" "}for the full limitation of liability that applies to your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">7. Contact us</h2>
            <p className="mt-4 leading-relaxed">
              If you have questions about any claim made on this Site, email{" "}
              <a 
                href="mailto:hello@alsolutionsai.online"
                className="text-accent-400 hover:text-accent-300"
              >
                hello@alsolutionsai.online
              </a>
              {" "}and we'll clarify or correct it.
            </p>
            <p className="mt-4 leading-relaxed font-semibold text-text-primary">Solutions AI Ltd</p>
            <p className="leading-relaxed">
              19 Shepiston Lane, Hayes, United Kingdom, UB3 1LH
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
