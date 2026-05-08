import type { Metadata } from "next";
import { Reveal } from "@/components/ui";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact AL Solutions AI — Book a Free AI Audit",
  description:
    "Get in touch with the AL Solutions AI team. Book a free 30-minute AI audit, WhatsApp us directly, or send us your project details.",
  alternates: { canonical: "https://www.alsolutionsai.online/contact" },
  openGraph: {
    url: "https://www.alsolutionsai.online/contact",
    title: "Contact AL Solutions AI — Book a Free AI Audit",
    description:
      "Get in touch with the AL Solutions AI team. Book a free 30-minute AI audit, WhatsApp us directly, or send us your project details.",
  },
};

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
            Get in touch
          </h1>
          <p className="mt-6 text-base text-text-secondary sm:text-lg md:text-lg">
            We respond within 4 business hours. Reach out via the form, email, WhatsApp, or schedule a call below.
          </p>
        </div>
      </div>
    </section>
  );
}

// =======================
// STEP 2: CONTACT INFO BLOCK
// =======================
function ContactInfoBlock() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Email */}
        <div className="rounded-2xl border border-border-subtle bg-bg-surface p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-default">
              <svg className="h-5 w-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">Email</p>
              <a href="mailto:hello@alsolutionsai.online" className="mt-1 block text-base font-medium text-text-primary transition-colors hover:text-accent-400">
                hello@alsolutionsai.online
              </a>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="rounded-2xl border border-border-subtle bg-bg-surface p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-default">
              <svg className="h-5 w-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.98 1.514 9.843 9.843 0 003.514-7.047c5.476 0 9.926 4.45 9.926 9.927 0 5.477-4.45 9.927-9.927 9.927s-9.928-4.45-9.928-9.927c0-1.881.608-3.623 1.635-5.074" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">WhatsApp</p>
              <a
                href="https://wa.me/212674147995?text=Hi%2C%20I%27d%20like%20to%20learn%20about%20your%20AI%20services"
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-base font-medium text-text-primary transition-colors hover:text-[#25D366]"
              >
                Chat on WhatsApp
              </a>
              <p className="mt-1 text-xs text-text-tertiary">We typically reply within 2 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-surface border border-border-subtle">
          <svg className="h-5 w-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-text-tertiary font-semibold">Business Hours</p>
          <p className="mt-1 text-base font-medium text-text-primary">Mon–Fri, 9am–6pm GST</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-surface border border-border-subtle">
          <svg className="h-5 w-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-text-tertiary font-semibold">Location</p>
          <p className="mt-1 text-base font-medium text-text-primary">Dubai, UAE</p>
        </div>
      </div>

      {/* LinkedIn */}
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-surface border border-border-subtle">
          <svg className="h-5 w-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.98 3.5A2.48 2.48 0 1 1 2.5 5.98 2.48 2.48 0 0 1 4.98 3.5Zm.02 4.5H2.5V21H7.5V8H5Zm6.5 0H16v1.77h.07c.69-1.23 2.37-2.52 4.88-2.52 5.22 0 6.18 3.43 6.18 7.89V21h-5v-6.76c0-1.61-.03-3.69-2.25-3.69-2.26 0-2.61 1.76-2.61 3.58V21h-5V8Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-text-tertiary font-semibold">LinkedIn</p>
          <a href="https://linkedin.com/company/al-solutions-ai" target="_blank" rel="noreferrer" className="mt-1 text-base font-medium text-text-primary hover:text-accent-400 transition-colors">
            Follow us
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
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Or book directly
            </h2>
            <p className="text-text-secondary mb-8">
              Schedule a free consultation at a time that works for you.
            </p>
            <a
              href="https://calendly.com/YOUR_CALENDLY_LINK"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-lg bg-accent-400 px-8 font-semibold text-bg-default transition-all hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
            >
              Schedule a call
            </a>
            <p className="mt-3 text-xs text-text-tertiary">(Replace YOUR_CALENDLY_LINK in code)</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-default">
      {/* STEP 1: Hero */}
      <HeroSection />

      {/* STEP 2: Two-Column Layout */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="grid gap-8 md:gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
              {/* Left: Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Send us a message</h2>
                <ContactForm />
              </div>

              {/* Right: Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Direct contact</h2>
                <ContactInfoBlock />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STEP 3: Calendly Section */}
      <CalendlySection />
    </main>
  );
}
