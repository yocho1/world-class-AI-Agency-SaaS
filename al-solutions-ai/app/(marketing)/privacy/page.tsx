import Link from "next/link";
import type { Metadata } from "next";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | AL Solutions AI",
  description:
    "Privacy Policy for AL Solutions AI (Co. No. 11521309). We explain what personal data we collect, how we use it, and your rights under UK GDPR.",
  openGraph: {
    title: "Privacy Policy | AL Solutions AI",
    description:
      "Transparent privacy practices. We explain what data we collect, how we use it, and your rights under UK GDPR.",
    url: canonicalUrl("/privacy"),
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=Privacy%20Policy&subtitle=Your%20data%20rights%20explained.&tag=Legal`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: alternatesFor("/privacy"),
};

export default function PrivacyPage() {
  return (
    <main className="container py-12 sm:py-16 md:py-20">
      <article className="mx-auto max-w-3xl prose prose-invert">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Legal</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-text-tertiary">Last updated: 25 June 2026</p>
        </div>

        <div className="space-y-8 text-text-secondary">
          <section>
            <p className="leading-relaxed">
              AL Solutions AI ("we", "us", "our") is operated by <strong>Solutions AI Ltd</strong>, a company 
              registered in England and Wales (Company No. 11521309), registered office at 19 Shepiston Lane, 
              Hayes, United Kingdom, UB3 1LH.
            </p>
            <p className="mt-4 leading-relaxed">
              This policy explains what personal data we collect when you visit alsolutionsai.online or engage 
              with us as a prospective or current client, why we collect it, and what rights you have. It is 
              written to comply with the UK GDPR and the Data Protection Act 2018. If you are visiting from the 
              EU, the EU GDPR applies in the same way.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">1. Data we collect</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="px-4 py-2 text-left font-semibold text-text-primary">Source</th>
                    <th className="px-4 py-2 text-left font-semibold text-text-primary">Data collected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">Contact form</td>
                    <td className="px-4 py-3">Name, company name, email address, phone number (optional), project details</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">"Book free audit" / Calendly</td>
                    <td className="px-4 py-3">Name, email, phone, meeting time, any notes you provide</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">AI Readiness Checklist download</td>
                    <td className="px-4 py-3">Email address, marketing consent preference</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">WhatsApp</td>
                    <td className="px-4 py-3">Phone number and message content, per WhatsApp's own terms</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">Website analytics (Google Tag Manager)</td>
                    <td className="px-4 py-3">IP address, device/browser type, pages visited, referral source, approximate location</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">Live chat / demo widget</td>
                    <td className="px-4 py-3">Messages you enter into the demo chatbot</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 leading-relaxed">
              We do not knowingly collect special category data (health, religion, etc.) through the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">2. How we use your data</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>To respond to enquiries and book audit calls</li>
              <li>To deliver the AI Readiness Checklist and related resources you request</li>
              <li>To scope, deliver, and support client projects</li>
              <li>To send occasional updates if you've opted in (you can unsubscribe anytime)</li>
              <li>To understand site traffic and improve the website</li>
              <li>To meet legal and accounting obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">3. Legal basis for processing</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong>Contract</strong> — where data is needed to deliver a service you've requested (e.g. an audit call)
              </li>
              <li>
                <strong>Consent</strong> — for marketing emails and non-essential cookies
              </li>
              <li>
                <strong>Legitimate interests</strong> — for basic analytics and responding to general enquiries
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">4. Cookies</h2>
            <p className="mt-4 leading-relaxed">
              We use Google Tag Manager to load analytics and marketing tags. Cookies fall into these categories:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><strong>Necessary</strong> — required for the site to function (session, security)</li>
              <li><strong>Analytics</strong> — Google Analytics (via GTM), to understand traffic and behaviour</li>
              <li><strong>Marketing</strong> — used for retargeting/ad performance measurement, if active</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              You can control or withdraw cookie consent at any time via the cookie banner on the site, or through 
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">5. Who we share data with</h2>
            <p className="mt-4 leading-relaxed">
              We share data only where necessary, with:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><strong>Calendly</strong> — for scheduling audit calls</li>
              <li><strong>Google</strong> (Analytics, Tag Manager, Workspace) — analytics and email</li>
              <li><strong>WhatsApp Business (Meta)</strong> — if you message us via WhatsApp</li>
              <li><strong>HubSpot / Salesforce</strong> — our own CRM, to manage enquiries and client relationships</li>
              <li><strong>Our hosting and email infrastructure providers</strong></li>
            </ul>
            <p className="mt-4 leading-relaxed">
              We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">6. International transfers</h2>
            <p className="mt-4 leading-relaxed">
              Some of the providers above (e.g. Google, Meta) may process data outside the UK/EEA, including in 
              the United States. Where this happens, we rely on appropriate safeguards such as Standard 
              Contractual Clauses or the provider's equivalent data protection framework.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">7. Data retention</h2>
            <p className="mt-4 leading-relaxed">
              We keep enquiry and client data for as long as needed to deliver our services and meet legal/accounting 
              requirements (typically up to 7 years for financial records), then delete or anonymise it. Marketing list 
              data is kept until you unsubscribe or 24 months of inactivity, whichever is sooner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">8. Your rights</h2>
            <p className="mt-4 leading-relaxed">
              Under UK GDPR, you have the right to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion ("right to be forgotten")</li>
              <li>Restrict or object to processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              To exercise any of these, email{" "}
              <a 
                href="mailto:privacy@alsolutionsai.online"
                className="text-accent-400 hover:text-accent-300"
              >
                privacy@alsolutionsai.online
              </a>
              . You also have the right to complain to the UK Information Commissioner's Office 
              ({" "}
              <a 
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 hover:text-accent-300"
              >
                ico.org.uk
              </a>
              ) if you believe your data has been mishandled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">9. Children</h2>
            <p className="mt-4 leading-relaxed">
              Our services are intended for businesses and individuals aged 18+. We do not knowingly collect data 
              from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">10. Security</h2>
            <p className="mt-4 leading-relaxed">
              We use industry-standard technical and organisational measures (encryption in transit, access controls, 
              vetted sub-processors) to protect your data. No system is 100% secure, but we take this seriously.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">11. Changes to this policy</h2>
            <p className="mt-4 leading-relaxed">
              We may update this policy as our services or legal obligations change. Material changes will be 
              reflected with a new "last updated" date above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">12. Contact us</h2>
            <p className="mt-4 leading-relaxed font-semibold text-text-primary">Solutions AI Ltd</p>
            <p className="leading-relaxed">
              19 Shepiston Lane, Hayes, United Kingdom, UB3 1LH<br />
              Email:{" "}
              <a 
                href="mailto:privacy@alsolutionsai.online"
                className="text-accent-400 hover:text-accent-300"
              >
                privacy@alsolutionsai.online
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
