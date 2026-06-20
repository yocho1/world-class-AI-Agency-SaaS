import type { Metadata } from "next";
import { Reveal } from "@/components/ui";
import ContactForm from "@/components/forms/ContactForm";
import CopyEmailButton from "@/components/contact/CopyEmailButton";
import WhatsAppLink from "@/components/contact/WhatsAppLink";
import CalendlyEmbed from "@/components/contact/CalendlyEmbed";
import Script from "next/script";
import contactSchema from "@/lib/schemas/contactSchema.json";
import { alternatesFor } from "@/lib/seo";
import FAQAccordion from "@/components/contact/FAQAccordion";

export const metadata: Metadata = {
  title: "Contact AL Solutions AI — Book a Free AI Audit | UK & MENA",
  description:
    "Talk directly to the engineer who will build your system. Book a free 30-minute AI audit or reach us by email, WhatsApp, or LinkedIn. UK-registered. Co. No. 11521309.",
  openGraph: {
    title: "Contact AL Solutions AI — Book a Free AI Audit",
    description:
      "Talk directly to the engineer who will build your system. 30-minute audit, written scope in 48 hours.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/en/contact`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=Contact%20AL%20Solutions%20AI&subtitle=Talk%20to%20the%20engineer%20who%20will%20build%20your%20system.&tag=Contact`,
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: alternatesFor("/contact"),
};

const FAQS = [
  {
    question: "How quickly will you reply?",
    answer: "We reply within 2 hours during UK office hours. For urgent UAE requests, message via WhatsApp and we'll respond as arranged.",
  },
  {
    question: "Can we schedule a technical discovery call?",
    answer: "Yes — use the Calendly booking on this page to pick a time with an engineer. Meetings are focused, technical, and action-oriented.",
  },
  {
    question: "Do you sign NDAs and handle sensitive data?",
    answer: "We can sign an NDA before discovery. We follow secure handling practices and can discuss hosting and data residency during the call.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers and card payments; contract and payment terms are agreed during scoping.",
  },
];

// =======================
// STEP 1: HERO SECTION
// =======================
function HeroSection() {
  return (
    <section className="border-b border-border-subtle bg-gradient-to-b from-bg-surface to-bg-default py-12 sm:py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Contact</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            Talk to the engineer who&apos;ll build your system.
          </h1>
          <p className="mt-6 text-base text-text-secondary sm:text-lg md:text-lg">
            Not a sales rep. Not an account manager. The person writing the code. Book a free 30-minute audit or reach us directly — we reply fast.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <span className="inline-flex items-center rounded-full border border-border-subtle bg-bg-surface px-3 py-1 text-xs font-medium text-text-tertiary">
              Reply within 2 hours
            </span>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-bg-surface/60 px-3 py-2 text-xs font-medium text-text-primary">
              ✓ UK-registered · Co. No. 11521309
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-bg-surface/60 px-3 py-2 text-xs font-medium text-text-primary">
              ✓ Written scope report within 48 hours
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-bg-surface/60 px-3 py-2 text-xs font-medium text-text-primary">
              ✓ No sales pitch · No follow-up spam
            </span>
          </div>
 
        </div>
      </div>
    </section>
  );
}

// =======================
// STEP 2: CONTACT INFO BLOCK
// =======================
function ContactInfoBlock() {
  const cardBase =
    "rounded-2xl border border-border-subtle border-opacity-40 bg-bg-default/90 p-5 shadow-sm transition-all hover:border-opacity-70 hover:shadow-md h-full flex flex-col justify-between";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Email */}
        <div className={`${cardBase} bg-gradient-to-br from-accent-400/10 via-bg-default to-bg-default`}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-surface">
              <svg className="h-5 w-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">Email</p>
              <div className="mt-1 flex items-center gap-2 group">
                <a
                  href="mailto:hello@alsolutionsai.online"
                  className="block text-sm font-medium text-text-primary transition-colors hover:text-accent-400 break-all sm:break-words"
                >
                  hello@alsolutionsai.online
                </a>
                <CopyEmailButton email="hello@alsolutionsai.online" />
              </div>
              <div className="mt-1.5">
                <span className="text-xs text-text-tertiary">We reply within 2 hours.</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className={`${cardBase} bg-gradient-to-br from-[#25D366]/12 via-bg-default to-bg-default`}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-surface">
              <svg className="h-5 w-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.98 1.514 9.843 9.843 0 003.514-7.047c5.476 0 9.926 4.45 9.926 9.927 0 5.477-4.45 9.927-9.927 9.927s-9.928-4.45-9.928-9.927c0-1.881.608-3.623 1.635-5.074" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">WhatsApp</p>
              <WhatsAppLink
                href="https://wa.me/447418360646?text=Hi%2C%20I%27d%20like%20to%20learn%20about%20your%20AI%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm font-medium text-text-primary transition-colors hover:text-[#25D366]"
                buttonLocation="contact_page"
              >
                Chat on WhatsApp
              </WhatsAppLink>
              <p className="mt-1 text-sm font-medium text-text-primary">+44 7418 360646</p>
              <p className="mt-1 text-xs text-text-tertiary">We typically reply within 2 hours.</p>
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className={`${cardBase} bg-gradient-to-br from-[#0A66C2]/12 via-bg-default to-bg-default`}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A66C2] text-bg-default">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5A2.48 2.48 0 1 1 2.5 5.98 2.48 2.48 0 0 1 4.98 3.5Zm.02 4.5H2.5V21H7.5V8H5Zm6.5 0H16v1.77h.07c.69-1.23 2.37-2.52 4.88-2.52 5.22 0 6.18 3.43 6.18 7.89V21h-5v-6.76c0-1.61-.03-3.69-2.25-3.69-2.26 0-2.61 1.76-2.61 3.58V21h-5V8Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">LinkedIn</p>
              <a
                href="https://www.linkedin.com/company/alsolutionsai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center text-sm font-medium text-text-primary transition-colors hover:text-[#0A66C2]"
              >
                Follow AL Solutions AI
              </a>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className={`${cardBase} bg-gradient-to-br from-bg-surface to-bg-default`}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-surface">
              <svg className="h-5 w-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">Business Hours</p>
              <div className="mt-1 text-sm text-text-primary">
                <p className="font-medium">UK Office — Mon–Fri, 9am–6pm GMT · London, England · Co. No. 11521309</p>
                <p className="mt-1">UAE clients: available during GST hours by arrangement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={`${cardBase} bg-gradient-to-br from-bg-surface to-bg-default`}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-surface">
              <svg className="h-5 w-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">Location</p>
              <p className="mt-1 text-sm font-medium text-text-primary">London, England · Co. No. 11521309</p>
            </div>
          </div>
        </div>
      </div>
      {/* Google Reviews trust strip */}
      <div className="pt-4 flex items-center justify-center">
        <div className="inline-flex w-full max-w-full items-center justify-between gap-4 rounded-2xl border border-border-subtle border-opacity-50 bg-bg-default/80 px-4 py-3 sm:px-5">
          <svg className="h-5 w-5 text-accent-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.9 6.59L22 9.27l-5 4.87L18.18 22 12 18.9 5.82 22 7 14.14 2 9.27l7.1-0.68L12 2z" />
          </svg>
          <div className="min-w-0 flex-1 text-sm">
            <div className="font-medium text-text-primary">Verified Google Reviews</div>
            <div className="text-text-secondary">Real clients. Real results. No invented quotes.</div>
          </div>
          <a
            href="https://share.google/fbV7KIkCqTxJP3FyO"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center rounded-md bg-accent-400 px-3 py-2 text-sm font-semibold text-bg-default hover:bg-accent-300"
          >
            Read our reviews →
          </a>
        </div>
      </div>
    </div>

  );
}

// =======================
// STEP 3: CALENDLY SECTION
// =======================
function CalendlySection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-border-subtle bg-bg-surface">
      <div className="container">
        <Reveal>
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[65%_35%]">
            <div className="rounded-3xl border border-border-subtle bg-bg-default p-8 pr-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">Calendar</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-text-primary">
                Book a strategy call
              </h2>
              <p className="mt-4 text-text-secondary">
                Pick a time that works for you and walk away with a clear AI roadmap for your business.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-text-secondary">
                <li>• 30-minute consultation with a solutions lead</li>
                <li>• Review your workflow and data readiness</li>
                <li>• Clear next steps and estimated ROI</li>
              </ul>
              {/* Removed duplicate schedule button and note since the calendar is embedded on the right */}
            </div>
            <div className="rounded-3xl border border-border-subtle bg-bg-default shadow-sm overflow-hidden">
              <CalendlyEmbed
                url="https://calendly.com/achraflachgar/15min?hide_event_type_details=1&hide_gdpr_banner=1"
                height={600}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// contactSchema is stored as JSON in lib/schemas/contactSchema.json

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-default">
      <Script id="contact-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      {/* STEP 1: Hero */}
      <HeroSection />

      {/* STEP 2: Two-Column Layout */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="grid gap-8 md:gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
              {/* Left: Contact Form */}
              <div className="rounded-3xl border border-border-subtle bg-bg-surface p-6 sm:p-8 shadow-sm h-full flex flex-col">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">Send us a message</h2>
                    <p className="mt-2 text-sm text-text-secondary">
                      Tell us about your goals and timeline. We will reply with a plan.
                    </p>
                  </div>
                  <span className="inline-flex h-8 items-center rounded-full border border-border-subtle bg-bg-default px-3 text-xs font-medium text-text-tertiary">
                    Reply within 2 hours
                  </span>
                </div>
                <div className="mt-6 flex-1">
                  <ContactForm />
                </div>
              </div>

              {/* Right: Contact Info */}
              <div className="rounded-3xl border border-border-subtle bg-bg-surface p-6 sm:p-8 shadow-sm h-full flex flex-col">
                <h2 className="text-2xl font-bold text-text-primary">Contact an engineer directly</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Prefer email or WhatsApp? Use these channels for the fastest response.
                </p>
                <div className="mt-6 flex-1">
                  <ContactInfoBlock />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STEP 3: Calendly Section */}
      <div className="py-16">
        <FAQAccordion faqs={FAQS} />
      </div>
      <CalendlySection />
    </main>
  );
}
