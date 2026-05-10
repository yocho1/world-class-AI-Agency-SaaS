import Image from "next/image";
import Link from "next/link";

export interface TestimonialCardData {
  readonly id: number;
  readonly quote: string;
  readonly name: string;
  readonly title: string;
  readonly company: string;
  readonly avatarSrc?: string;
  readonly initials: string;
  readonly linkedinUrl?: string;
  readonly metric: string;
  readonly metricNote: string;
}

interface TestimonialCardProps {
  readonly data: TestimonialCardData;
}

export function TestimonialCard({ data }: TestimonialCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border-subtle bg-gradient-to-br from-bg-surface to-bg-surface/50 p-6 transition-all duration-300 hover:border-accent-400 hover:shadow-xl hover:shadow-accent-400/10 sm:p-8">
      {/* Quote */}
      <blockquote className="flex-1 text-base leading-relaxed italic text-text-primary sm:text-lg">
        &quot;{data.quote}&quot;
      </blockquote>

      {/* Metric badge */}
      <div className="mt-6 inline-flex rounded-pill border-[0.5px] border-[rgba(0,217,126,0.3)] bg-[rgba(0,217,126,0.1)] px-3 py-1.5 sm:px-4">
        <span className="text-metric text-xs font-semibold text-[#00D97E]">{data.metric}</span>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-border-subtle" />

      {/* Author section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border-subtle sm:h-14 sm:w-14">
            {data.avatarSrc ? (
              <Image alt={data.name} className="object-cover" fill sizes="56px" src={data.avatarSrc} />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-400/20 to-accent-400/10 text-sm font-semibold text-accent-400 sm:text-base">
                {data.initials}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-text-primary">{data.name}</p>
            <p className="text-sm text-text-secondary">{data.title}</p>
            <p className="text-xs text-text-tertiary">{data.company}</p>
          </div>
        </div>

        {/* LinkedIn link */}
        {data.linkedinUrl && (
          <Link
            aria-label={`${data.name} on LinkedIn`}
            className="shrink-0 text-text-tertiary transition-colors hover:text-accent-400"
            href={data.linkedinUrl}
            rel="noreferrer"
            target="_blank"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5A2.48 2.48 0 1 1 2.5 5.98 2.48 2.48 0 0 1 4.98 3.5Zm.02 4.5H2.5V21H7.5V8H5Zm6.5 0H16v1.77h.07c.69-1.23 2.37-2.52 4.88-2.52 5.22 0 6.18 3.43 6.18 7.89V21h-5v-6.76c0-1.61-.03-3.69-2.25-3.69-2.26 0-2.61 1.76-2.61 3.58V21h-5V8Z" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
