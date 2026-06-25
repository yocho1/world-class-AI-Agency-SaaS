import Link from "next/link";
import type { Metadata } from "next";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Policy | AL Solutions AI",
  description:
    "Information about how AL Solutions AI (Co. No. 11521309) uses cookies and similar technologies on alsolutionsai.online.",
  openGraph: {
    title: "Cookie Policy | AL Solutions AI",
    description:
      "Information about how AL Solutions AI uses cookies and similar technologies on alsolutionsai.online.",
    url: canonicalUrl("/cookie-policy"),
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=Cookie%20Policy&subtitle=How%20we%20use%20cookies%20and%20tracking.&tag=Legal`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: alternatesFor("/cookie-policy"),
};

export default function CookiePolicyPage() {
  return (
    <main className="container py-12 sm:py-16 md:py-20">
      <article className="mx-auto max-w-3xl prose prose-invert">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Legal</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-text-tertiary">Last updated: 25 June 2026</p>
        </div>

        <div className="space-y-8 text-text-secondary">
          <section>
            <p className="leading-relaxed">
              This Cookie Policy explains how <strong>Solutions AI Ltd</strong> (Company No. 11521309), 
              trading as AL Solutions AI, uses cookies and similar technologies on alsolutionsai.online 
              (the "Site"). It should be read alongside our{" "}
              <Link href="/privacy" className="text-accent-400 hover:text-accent-300">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">1. What are cookies?</h2>
            <p className="mt-4 leading-relaxed">
              Cookies are small text files placed on your device when you visit a website. They help 
              the site function, remember preferences, and allow us to understand how visitors use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">2. Categories of cookies we use</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="px-4 py-2 text-left font-semibold text-text-primary">Category</th>
                    <th className="px-4 py-2 text-left font-semibold text-text-primary">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold text-text-primary">Can you disable it?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">Strictly necessary</td>
                    <td className="px-4 py-3">Core site functionality, security, load balancing</td>
                    <td className="px-4 py-3">No — required for the Site to work</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">Analytics</td>
                    <td className="px-4 py-3">
                      Understand traffic, page views, and behaviour (via Google Tag Manager / Google Analytics)
                    </td>
                    <td className="px-4 py-3">Yes, via cookie banner</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">Functional</td>
                    <td className="px-4 py-3">Remember choices (e.g. language, form progress)</td>
                    <td className="px-4 py-3">Yes, via cookie banner</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-text-primary">Marketing / advertising</td>
                    <td className="px-4 py-3">Measure ad performance and retargeting, where active</td>
                    <td className="px-4 py-3">Yes, via cookie banner</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">3. Cookies we typically use</h2>
            <p className="mt-4 leading-relaxed">
              This table covers the cookies most commonly set through our current setup. Exact names can 
              change as we update tooling — run a scan (e.g. via Cookiebot) periodically to keep this list current.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="px-4 py-2 text-left font-semibold text-text-primary">Cookie</th>
                    <th className="px-4 py-2 text-left font-semibold text-text-primary">Set by</th>
                    <th className="px-4 py-2 text-left font-semibold text-text-primary">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold text-text-primary">Typical duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  <tr>
                    <td className="px-4 py-3 font-mono text-accent-400">_ga</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">Distinguishes users for analytics</td>
                    <td className="px-4 py-3">Up to 2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-accent-400">_ga_*</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">Distinguishes users for analytics</td>
                    <td className="px-4 py-3">Up to 2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-accent-400">_gid</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">Distinguishes users (short-term)</td>
                    <td className="px-4 py-3">24 hours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-accent-400">_gat</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">Throttles request rate</td>
                    <td className="px-4 py-3">1 minute</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">GTM container cookies</td>
                    <td className="px-4 py-3">Google Tag Manager</td>
                    <td className="px-4 py-3">Loads and manages other tags</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Calendly session cookies</td>
                    <td className="px-4 py-3">Calendly</td>
                    <td className="px-4 py-3">Enables booking widget functionality</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Consent preference cookie</td>
                    <td className="px-4 py-3">Our cookie banner tool</td>
                    <td className="px-4 py-3">Remembers your cookie choices</td>
                    <td className="px-4 py-3">Up to 12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 leading-relaxed">
              We do not use cookies to collect sensitive personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">4. Managing your cookie preferences</h2>
            <p className="mt-4 leading-relaxed">
              When you first visit the Site, a cookie banner lets you accept or reject non-essential cookies. 
              You can change your preference at any time by:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Clicking "Cookie Settings" in the site footer</li>
              <li>Clearing cookies in your browser and revisiting the Site</li>
              <li>Adjusting your browser settings to block cookies generally (note: this may affect site functionality)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">5. Third-party cookies</h2>
            <p className="mt-4 leading-relaxed">
              Some cookies are set by third parties we embed on the Site (Google, Calendly, WhatsApp/Meta, 
              LinkedIn). We don't control these directly — refer to each provider's own cookie/privacy policy for details:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-400 hover:text-accent-300"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://calendly.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-400 hover:text-accent-300"
                >
                  Calendly Privacy Notice
                </a>
              </li>
              <li>
                <a 
                  href="https://www.whatsapp.com/legal/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-400 hover:text-accent-300"
                >
                  Meta/WhatsApp Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/legal/cookie-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-400 hover:text-accent-300"
                >
                  LinkedIn Cookie Policy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">6. Changes to this policy</h2>
            <p className="mt-4 leading-relaxed">
              We may update this policy as our tooling changes. Check back periodically for the latest version.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">7. Contact us</h2>
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
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
