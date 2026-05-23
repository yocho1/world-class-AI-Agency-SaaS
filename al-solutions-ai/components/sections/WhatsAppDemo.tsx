"use client";

/**
 * Hero visual: WhatsApp AI agent in action.
 * Shows a multilingual real estate qualification conversation
 * with 3 callout annotations pointing to key AI behaviours.
 *
 * Usage: place inside Hero, right column. Default width ~480px container,
 * phone frame ~300px wide. Scales down gracefully on mobile.
 */
export function WhatsAppDemo() {
  return (
    <div
      className="relative mx-auto w-full max-w-[480px] animate-fade-in-right"
      aria-label="Example WhatsApp AI conversation: bilingual Arabic-English lead qualification with HubSpot sync"
    >
      {/* Phone frame */}
      <div className="relative mx-auto w-[300px] rounded-[2.25rem] bg-[#1a1a1a] p-3 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/5">
        {/* Inner screen */}
        <div className="overflow-hidden rounded-[1.75rem] bg-[#ECE5DD]">
          {/* WhatsApp header */}
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold">
              AI
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">Property AI · AL Solutions</p>
              <p className="truncate text-[11px] leading-tight text-white/70">online · replies instantly</p>
            </div>
            <svg className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.58l2.2-2.21a1 1 0 0 0 .24-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
            </svg>
          </div>

          {/* Chat area */}
          <div className="relative flex flex-col gap-2 px-3 py-4">
            {/* Message 1 — Buyer Arabic (RTL, sent right, green) */}
            <div className="flex justify-end" id="wa-msg-1">
              <div className="relative max-w-[80%] rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-3 py-2 shadow-sm">
                <p dir="rtl" lang="ar" className="text-right text-[13px] leading-snug text-[#111B21]">
                  مرحبا، أريد معرفة المزيد عن الشقق المتاحة في دبي
                </p>
                <p className="mt-1 text-right text-[10px] text-[#667781]">
                  10:42 <span aria-hidden="true">✓✓</span>
                </p>
              </div>
            </div>

            {/* Message 2 — AI Arabic (RTL, received left, white) */}
            <div className="flex justify-start">
              <div className="relative max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                <p dir="rtl" lang="ar" className="text-right text-[13px] leading-snug text-[#111B21]">
                  أهلاً وسهلاً! سأساعدك في العثور على الشقة المثالية. ما هي ميزانيتك التقريبية؟
                </p>
                <p className="mt-1 text-right text-[10px] text-[#667781]">10:42</p>
              </div>
            </div>

            {/* Message 3 — Buyer English (sent right, green) */}
            <div className="flex justify-end" id="wa-msg-3">
              <div className="relative max-w-[80%] rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-3 py-2 shadow-sm">
                <p className="text-[13px] leading-snug text-[#111B21]">
                  My budget is around $500k. Looking for 2 bedrooms
                </p>
                <p className="mt-1 text-right text-[10px] text-[#667781]">
                  10:43 <span aria-hidden="true">✓✓</span>
                </p>
              </div>
            </div>

            {/* Message 4 — AI English (received left, white) */}
            <div className="flex justify-start" id="wa-msg-4">
              <div className="relative max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                <p className="text-[13px] leading-snug text-[#111B21]">
                  Perfect. I found 4 properties matching your criteria. I&apos;m sending details to your
                  agent now and logging this conversation to CRM.
                </p>
                <p className="mt-1 text-right text-[10px] text-[#667781]">10:43</p>
              </div>
            </div>

            {/* Typing indicator */}
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-sm">
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-[#667781] [animation-delay:0ms]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-[#667781] [animation-delay:150ms]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-[#667781] [animation-delay:300ms]" />
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 border-t border-black/5 bg-[#F0F0F0] px-3 py-2">
            <div className="flex-1 rounded-full bg-white px-3 py-1.5 text-[11px] text-[#667781]">
              Type a message
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#075E54]">
              <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Phone notch */}
        <div className="absolute left-1/2 top-1 h-1 w-12 -translate-x-1/2 rounded-full bg-white/10" />
      </div>

      {/* Callout 1 — Arabic detected, RTL enabled */}
      <Callout
        className="left-0 top-[110px] sm:-left-2"
        text="Arabic detected · RTL enabled"
        arrowDirection="right"
      />

      {/* Callout 2 — Language switch */}
      <Callout
        className="right-0 top-[230px] sm:-right-4"
        text="Language switch: Arabic → English"
        arrowDirection="left"
      />

      {/* Callout 3 — HubSpot CRM sync */}
      <Callout
        className="left-0 bottom-[80px] sm:-left-6"
        text="HubSpot CRM sync triggered"
        arrowDirection="right"
        accent
      />

      {/* Local animation styles */}
      <style jsx>{`
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-right {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

interface CalloutProps {
  readonly text: string;
  readonly className?: string;
  readonly arrowDirection: "left" | "right";
  readonly accent?: boolean;
}

function Callout({ text, className = "", arrowDirection, accent = false }: CalloutProps) {
  const arrowSize = 32;
  return (
    <div
      className={`pointer-events-none absolute z-10 hidden items-center gap-1 sm:flex ${className}`}
      aria-hidden="true"
    >
      {arrowDirection === "right" && (
        <>
          <Pill text={text} accent={accent} />
          <svg width={arrowSize} height="20" viewBox="0 0 32 20" className="text-accent-400">
            <path
              d="M0 10 H24 M20 6 L24 10 L20 14"
              stroke="currentColor"
              strokeWidth="1.25"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}
      {arrowDirection === "left" && (
        <>
          <svg width={arrowSize} height="20" viewBox="0 0 32 20" className="text-accent-400">
            <path
              d="M32 10 H8 M12 6 L8 10 L12 14"
              stroke="currentColor"
              strokeWidth="1.25"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Pill text={text} accent={accent} />
        </>
      )}
    </div>
  );
}

function Pill({ text, accent }: { readonly text: string; readonly accent: boolean }) {
  const baseClasses =
    "whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold backdrop-blur-sm shadow-lg";
  const themeClasses = accent
    ? "border-[#FF7A00]/40 bg-[#FF7A00]/15 text-[#FFB066]"
    : "border-accent-400/30 bg-bg-elevated/90 text-accent-400";
  return <span className={`${baseClasses} ${themeClasses}`}>{text}</span>;
}
