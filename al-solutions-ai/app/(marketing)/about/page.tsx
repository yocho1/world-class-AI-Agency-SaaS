import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui";

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M4.98 3.5A2.48 2.48 0 1 1 2.5 5.98 2.48 2.48 0 0 1 4.98 3.5Zm.02 4.5H2.5V21H7.5V8H5Zm6.5 0H16v1.77h.07c.69-1.23 2.37-2.52 4.88-2.52 5.22 0 6.18 3.43 6.18 7.89V21h-5v-6.76c0-1.61-.03-3.69-2.25-3.69-2.26 0-2.61 1.76-2.61 3.58V21h-5V8Z" />
    </svg>
  );
}

const avatarBlurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAzMic+PHJlY3Qgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyByeD0nMTYnIGZpbGw9JyNEMUQ1REInLz48Y2lyY2xlIGN4PScxNicgY3k9JzEyJyByPSc2JyBmaWxsPScjRjVCODREJy8+PHBhdGggZD0nTTEwIDIyYzAtMy4zMSAyLjY5LTYgNi02czYgMi42OSA2IDZ2MkgxMHonIGZpbGw9JyNGNUI4NEQnIG9wYWNpdHk9Jy4xOScvPjwvc3ZnPg==";

export default function AboutPage() {
  return (
    <main className="container py-20">
      <section className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">About</p>
        <div className="mt-6 grid gap-8 rounded-3xl border border-border-subtle bg-bg-surface p-8 md:grid-cols-[auto,1fr] md:items-center md:p-10">
          <div className="flex justify-center md:justify-start">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-bg-elevated shadow-lg shadow-black/10 sm:h-32 sm:w-32">
              <Image
                alt="Founder avatar placeholder"
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
              <h1 className="text-4xl font-medium tracking-tight text-text-primary md:text-5xl">[Your Name]</h1>
              <Link
                aria-label="LinkedIn profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors hover:border-accent-400 hover:text-accent-400"
                href="https://www.linkedin.com"
                rel="noreferrer"
                target="_blank"
              >
                <LinkedInIcon />
              </Link>
            </div>

            <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-accent-400">Founder & CEO, AL Solutions AI</p>

            <p className="mt-5 max-w-2xl text-text-secondary">
              Placeholder origin story text: I started AL Solutions AI after seeing too many teams lose momentum between strategy, design, and delivery. I wanted to build a studio that could move fast without sacrificing clarity, so clients could go from idea to production with fewer handoffs and less uncertainty. Replace this paragraph with your real founding story, the specific problem you saw, and why you chose this work.
            </p>
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
            <p className="mt-2 text-text-secondary">{body}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}