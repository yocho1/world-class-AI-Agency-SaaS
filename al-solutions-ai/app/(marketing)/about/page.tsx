import Image from "next/image";
import Link from "next/link";
import { Card, Reveal } from "@/components/ui";

export const metadata = {
  title: "About AL Solutions AI | Founded 2018 | Asim Jan | UK AI Agency",
  description:
    "AL Solutions AI (Reg. No. 11521309) founded by Asim Jan in 2018. Production-ready AI chatbots and automation for MENA and European businesses.",
  alternates: {
    canonical: "https://www.alsolutionsai.online/about",
    languages: {
      en: "https://www.alsolutionsai.online/en/about",
    },
  },
  openGraph: {
    url: "https://www.alsolutionsai.online/about",
    title: "About AL Solutions AI | Founded 2018 | Asim Jan | UK AI Agency",
    description:
      "AL Solutions AI (Reg. No. 11521309) founded by Asim Jan in 2018. Production-ready AI chatbots and automation for MENA and European businesses.",
    images: [
      {
        url: "https://www.alsolutionsai.online/og?title=About AL Solutions AI&subtitle=Founded 2018 by Asim Jan. AI for MENA and Europe.&tag=About",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.alsolutionsai.online/og?title=About AL Solutions AI&subtitle=Founded 2018 by Asim Jan. AI for MENA and Europe.&tag=About",
    ],
  },
};

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M4.98 3.5A2.48 2.48 0 1 1 2.5 5.98 2.48 2.48 0 0 1 4.98 3.5Zm.02 4.5H2.5V21H7.5V8H5Zm6.5 0H16v1.77h.07c.69-1.23 2.37-2.52 4.88-2.52 5.22 0 6.18 3.43 6.18 7.89V21h-5v-6.76c0-1.61-.03-3.69-2.25-3.69-2.26 0-2.61 1.76-2.61 3.58V21h-5V8Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

const avatarBlurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAzMic+PHJlY3Qgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyByeD0nMTYnIGZpbGw9JyNEMUQ1REInLz48Y2lyY2xlIGN4PScxNicgY3k9JzEyJyByPSc2JyBmaWxsPScjRjVCODREJy8+PHBhdGggZD0nTTEwIDIyYzAtMy4zMSAyLjY5LTYgNi02czYgMi42OSA2IDZ2MkgxMHonIGZpbGw9JyNGNUI4NEQnIG9wYWNpdHk9Jy4xOScvPjwvc3ZnPg==";

// Team member placeholder data for cards 2 & 3
type TeamMember = {
  initials: string;
  name: string;
  role: string;
  bio: string;
  bgColor: string;
};

const teamMembers: TeamMember[] = [
  {
    initials: "AJ",
    name: "Asim Jan",
    role: "Founder & Director",
    bio: "7 years building AI automation systems for MENA and European growth companies.",
    bgColor: "bg-accent-400",
  },
  {
    initials: "HL",
    name: "Hamza Laaich",
    role: "AI Engineer",
    bio: "Builds production LLM pipelines, RAG systems, and chatbot orchestration for client deployments.",
    bgColor: "bg-blue-500",
  },
  {
    initials: "AS",
    name: "Abderrahmane Sadak",
    role: "AI Engineer",
    bio: "Designs multilingual NLP workflows and CRM integrations across HubSpot, Salesforce, and WhatsApp.",
    bgColor: "bg-purple-500",
  },
  {
    initials: "AW",
    name: "Antoine Willerval",
    role: "Developer",
    bio: "Ships the web platforms and dashboards that put our AI systems in front of customers.",
    bgColor: "bg-emerald-500",
  },
];

export default function AboutPage() {
  return (
    <main className="container py-20">
      <section className="mx-auto max-w-4xl">
        <h1 className="sr-only">About AL Solutions AI</h1>
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">About</p>
        <div className="mt-6 grid gap-8 rounded-3xl border border-border-subtle bg-bg-surface p-8 md:grid-cols-[auto,1fr] md:items-center md:p-10">
          <div className="flex justify-center md:justify-start">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-bg-elevated shadow-lg shadow-black/10 sm:h-32 sm:w-32">
              <Image
                alt="Founder avatar"
                className="object-cover"
                fill
                placeholder="blur"
                blurDataURL={avatarBlurDataURL}
                sizes="(max-width: 640px) 7rem, 8rem"
                src="/images/about-founder-avatar.svg"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-medium tracking-tight text-text-primary md:text-5xl">
                Asim Jan
              </h1>
              <Link
                aria-label="LinkedIn profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-accent-400 hover:text-accent-400"
                href="https://www.linkedin.com/in/asimjan"
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedInIcon />
              </Link>
            </div>

            <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-accent-400">
              Founder & Director, AL Solutions AI
            </p>

            <div className="mt-5 max-w-2xl space-y-4 text-text-secondary">
              <p className="max-w-prose">
                AL Solutions AI was founded in 2018 with one observation: most businesses were
                spending months and significant budget on AI projects that never reached production.
                Too many handoffs, too little accountability, and no clear owner for go-live.
              </p>
              <p className="max-w-prose">
                We built a different kind of studio — one where product strategy, AI engineering,
                and CRM integration sit in a single accountable team. Our clients get a working
                system live in 30 days, not a slide deck six months later.
              </p>
              <p className="max-w-prose">
                Today we serve growth-stage companies across MENA and Europe, deploying AI chatbots,
                WhatsApp automation, and lead conversion systems that generate measurable revenue
                from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Speed", "Production-first delivery in 30 days or less."],
          ["Clarity", "Every engagement starts with a concrete scope and measurable KPIs."],
          ["Support", "We stay close through launch, tuning, and iteration."],
        ].map(([title, body]) => (
          <Card key={title}>
            <h2 className="text-xl font-medium text-text-primary">{title}</h2>
            <p className="mt-2 max-w-prose text-text-secondary">{body}</p>
          </Card>
        ))}
      </section>

      {/* SECTION 3: Leadership Team */}
      <section className="mt-16">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Our team
            </h2>
            <p className="mt-3 max-w-prose text-base text-text-secondary">
              A small, senior team that ships production AI — no juniors, no hand-off chains.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="group rounded-2xl border border-border-subtle bg-bg-surface p-6 transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/5 hover:-translate-y-0.5"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${member.bgColor} text-sm font-bold text-white`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">{member.name}</h3>
                  <p className="text-xs font-medium uppercase tracking-wider text-accent-400">
                    {member.role}
                  </p>
                  <p className="mt-3 max-w-prose text-sm text-text-secondary">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 4: Location Line */}
      <section className="mt-12 text-center">
        <p className="inline-flex items-center gap-2 text-sm text-text-secondary">
          <MapPinIcon />
          Registered in England & Wales · Serving MENA and Europe
        </p>
      </section>

      {/* SECTION 5: Why We Exist */}
      <section className="mt-16 border-t border-border-subtle pt-16">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border-l-2 border-accent-400 pl-6">
                <p className="text-3xl font-bold text-text-primary sm:text-4xl">
                  3 of 4 AI projects never reach production.
                </p>
                <p className="mt-3 text-xs uppercase tracking-wider text-text-tertiary font-semibold">
                  Execution — not ideas — is the bottleneck.
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="max-w-prose text-base text-text-secondary leading-relaxed">
                  We exist to close that gap: AI systems that ship to production, integrate with
                  your existing stack, and generate measurable revenue within 30 days of contract.
                  No prototypes. No decks. Live systems only.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 6: Company Credentials */}
      <section className="mt-16">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: "🏢", text: "Registered in England & Wales" },
            { icon: "📋", text: "Company No. 11521309" },
            { icon: "📅", text: "Founded 2018" },
            { icon: "🌍", text: "Serving MENA & Europe" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-overlay px-3.5 py-1.5 text-xs font-medium text-text-secondary"
            >
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
