import type { Metadata } from "next";
import { alternatesFor, canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | AL Solutions AI",
  description:
    "Refund and cancellation terms for paid engagements with AL Solutions AI (Co. No. 11521309). Milestone-based billing, cancellation windows, and dispute resolution.",
  openGraph: {
    title: "Refund & Cancellation Policy | AL Solutions AI",
    description:
      "Refund and cancellation terms for paid engagements with AL Solutions AI. Milestone-based billing and cancellation windows.",
    url: canonicalUrl("/refund-cancellation-policy"),
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=Refund%20%26%20Cancellation%20Policy&subtitle=Terms%20for%20paid%20engagements.&tag=Legal`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: alternatesFor("/refund-cancellation-policy"),
};

export default function RefundCancellationPolicyPage() {
  return (
    <main className="container py-12 sm:py-16 md:py-20">
      <article className="mx-auto max-w-3xl prose prose-invert">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Legal</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-4 text-sm text-text-tertiary">Last updated: 25 June 2026</p>
        </div>

        <div className="space-y-8 text-text-secondary">
          <section>
            <p className="leading-relaxed">
              This policy applies to paid engagements with <strong>Solutions AI Ltd</strong> (Company No. 11521309), 
              trading as AL Solutions AI. It works alongside the Service Agreement signed for your specific project — 
              where the two differ, your signed Service Agreement takes priority.
            </p>
            <p className="mt-4 leading-relaxed italic text-text-tertiary">
              The numbers below (notice periods, refund %, etc.) are set to match what we actually offer, and are correct on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">1. Our payment structure</h2>
            <p className="mt-4 leading-relaxed">
              Most engagements follow a milestone-based structure:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><strong>50% deposit</strong> on signing, to begin scoping and build</li>
              <li><strong>50% on go-live</strong>, once the agreed system is live and working as scoped</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Some engagements may use a different milestone split — this will be stated in your Service Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">2. Cancelling before work begins</h2>
            <p className="mt-4 leading-relaxed">
              If you cancel within <strong>48 hours</strong> of signing and before any work has started, 
              your deposit is refunded in full, minus any payment processing fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">3. Cancelling during the build</h2>
            <p className="mt-4 leading-relaxed">
              If you cancel after work has started:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>The deposit covers engineering time already committed and is <strong>non-refundable</strong> past the cancellation-free window above</li>
              <li>Any work completed beyond the deposit value will be invoiced pro-rata for time spent, based on the agreed scope</li>
              <li>We will deliver all work completed to date in its current state</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">4. Cancelling after go-live</h2>
            <p className="mt-4 leading-relaxed">
              The system has been delivered and accepted at this point — the second-half payment is due as invoiced. 
              No refund applies, since the deliverable has been completed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">5. If we fail to deliver</h2>
            <p className="mt-4 leading-relaxed">
              If we materially fail to deliver the agreed scope (the system doesn&apos;t work as specified, or we miss the 
              go-live date by more than <strong>2 weeks</strong> without a mutually agreed extension), you&apos;re entitled 
              to a partial refund proportional to the undelivered work, per your Service Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">6. No-retainer policy</h2>
            <p className="mt-4 leading-relaxed">
              We do not lock clients into recurring retainers. Any post-launch support package beyond the included 
              30-day window is opt-in, billed separately, and cancellable with <strong>30 days</strong> notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">7. How to request a refund or cancellation</h2>
            <p className="mt-4 leading-relaxed">
              Email{" "}
              <a 
                href="mailto:billing@alsolutionsai.online"
                className="text-accent-400 hover:text-accent-300"
              >
                billing@alsolutionsai.online
              </a>
              {" "}with your project name and reason. We&apos;ll confirm receipt within 2 business hours and resolve 
              most requests within 5 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">8. Disputes</h2>
            <p className="mt-4 leading-relaxed">
              If we can&apos;t resolve a billing dispute directly, either party may escalate it through the dispute 
              resolution process set out in the Service Agreement, or as a last resort through the courts of England 
              and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary">9. Contact us</h2>
            <p className="mt-4 leading-relaxed font-semibold text-text-primary">Solutions AI Ltd</p>
            <p className="leading-relaxed">
              19 Shepiston Lane, Hayes, United Kingdom, UB3 1LH<br />
              Email:{" "}
              <a 
                href="mailto:billing@alsolutionsai.online"
                className="text-accent-400 hover:text-accent-300"
              >
                billing@alsolutionsai.online
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
