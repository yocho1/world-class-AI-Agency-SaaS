"use client";

interface ClutchBadgeProps {
  readonly profileUrl: string;
  readonly rating?: number;
  readonly reviewCount?: number;
}

/**
 * Clutch verification badge.
 * Activate by setting NEXT_PUBLIC_CLUTCH_PROFILE_URL once your Clutch profile is live.
 *
 * Brand colour: Clutch red #FF3D2E
 * Place in the Testimonials section in the same horizontal row as the Google reviews CTA.
 */
export function ClutchBadge({
  profileUrl,
  rating = 5,
  reviewCount,
}: ClutchBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Verified on Clutch — view our profile"
        className="inline-flex items-center gap-3 rounded-full border border-border-subtle bg-bg-elevated px-5 py-2.5 transition-colors hover:border-[#FF3D2E]"
      >
        {/* Clutch wordmark (simplified, Clutch red) */}
        <span
          aria-hidden="true"
          className="text-base font-bold tracking-tight"
          style={{ color: "#FF3D2E" }}
        >
          clutch
        </span>

        {/* Clutch-style 5 star row (red squares with star cutout effect via gradient) */}
        <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="#FF3D2E"
              aria-hidden="true"
            >
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </span>

        <span className="text-xs font-semibold text-text-primary">
          Verified on Clutch
        </span>
      </a>

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-text-secondary transition-colors hover:text-[#FF3D2E]"
      >
        View our Clutch profile {reviewCount ? `(${reviewCount} reviews) ` : ""}→
      </a>
    </div>
  );
}
