"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const CLOSED_FLAG = "leadCaptureClosedThisSession";
const SUBMITTED_FLAG = "leadCaptureSubmitted";
const FIRST_TOUCH_TRACKING_KEY = "leadCaptureFirstTouchTracking";
const SHOW_DELAY_MS = 450;

function getScrollProgress(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const maxScroll = Math.max(documentHeight - viewportHeight, 1);
  return scrollTop / maxScroll;
}

function getTrackingContext() {
  if (typeof window === "undefined") {
    return {
      source: "homepage-scroll-modal",
      path: "",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    source: "homepage-scroll-modal",
    path: window.location.pathname,
    referrer: document.referrer || "direct",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
  };
}

function getFirstTouchTrackingContext() {
  if (typeof window === "undefined") return getTrackingContext();

  const stored = sessionStorage.getItem(FIRST_TOUCH_TRACKING_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as ReturnType<typeof getTrackingContext>;
    } catch {
      sessionStorage.removeItem(FIRST_TOUCH_TRACKING_KEY);
    }
  }

  const current = getTrackingContext();
  sessionStorage.setItem(FIRST_TOUCH_TRACKING_KEY, JSON.stringify(current));
  return current;
}

export default function LeadCaptureModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [includeScopeTemplate, setIncludeScopeTemplate] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canShow = useMemo(() => {
    if (typeof window === "undefined") return false;
    const closed = sessionStorage.getItem(CLOSED_FLAG) === "1";
    const submitted = sessionStorage.getItem(SUBMITTED_FLAG) === "1";
    return !closed && !submitted;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !canShow) return;

    getFirstTouchTrackingContext();

    const onScroll = () => {
      const submitted = sessionStorage.getItem(SUBMITTED_FLAG) === "1";
      const closed = sessionStorage.getItem(CLOSED_FLAG) === "1";
      if (submitted || closed || isDismissed) {
        if (revealTimerRef.current) {
          clearTimeout(revealTimerRef.current);
          revealTimerRef.current = null;
        }
        setIsVisible(false);
        return;
      }

      const progress = getScrollProgress();
      if (progress < 0.6) return;
      if (isVisible || revealTimerRef.current) return;

      revealTimerRef.current = setTimeout(() => {
        revealTimerRef.current = null;
        const stillClosed = sessionStorage.getItem(CLOSED_FLAG) === "1";
        const stillSubmitted = sessionStorage.getItem(SUBMITTED_FLAG) === "1";
        if (!stillClosed && !stillSubmitted && !isDismissed) {
          setIsVisible(true);
        }
      }, SHOW_DELAY_MS);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
        revealTimerRef.current = null;
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [canShow, isDismissed, isVisible]);

  const handleClose = () => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem(CLOSED_FLAG, "1");
    }
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || isSubmitting) return;

    const firstTouch = getFirstTouchTrackingContext();
    const payload = {
      email: email.trim(),
      source: firstTouch.source,
      qualificationData: {
        includeScopeTemplate,
        tracking: firstTouch,
      },
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Lead API failed with ${response.status}`);
      }
    } catch {
      // Temporary fallback while endpoint wiring evolves.
      console.log("Lead capture submitted (fallback)", payload);
    } finally {
      setIsSubmitting(false);
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem(SUBMITTED_FLAG, "1");
    }

    setShowThanks(true);
    setIsVisible(false);
    setTimeout(() => setShowThanks(false), 2200);
  };

  return (
    <>
      <aside
        aria-hidden={!isVisible}
        className={`fixed z-50 w-[calc(100%-1rem)] max-w-sm rounded-2xl border border-border-subtle bg-bg-surface p-5 shadow-2xl transition-all duration-300 ease-out sm:bottom-6 sm:right-6 ${
          isVisible
            ? "bottom-4 opacity-100 translate-y-0 scale-100"
            : "pointer-events-none -bottom-40 opacity-0 translate-y-4 scale-[0.98]"
        } sm:w-full`}
      >
        <button
          aria-label="Close lead capture panel"
          className="absolute right-3 top-2 text-lg text-text-tertiary hover:text-text-primary"
          onClick={handleClose}
          type="button"
        >
          ×
        </button>

        <h3 className="pr-6 text-lg font-semibold text-text-primary">
          Free download: AI Readiness Checklist
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          The 12-point checklist we use before every client deployment. Takes 5 minutes.
        </p>

        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-lg border border-border-subtle bg-bg-default px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent-400"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            type="email"
            value={email}
            required
          />

          <label className="flex items-start gap-2 text-xs text-text-secondary">
            <input
              checked={includeScopeTemplate}
              className="mt-0.5 h-4 w-4 accent-accent-400"
              onChange={(event) => setIncludeScopeTemplate(event.target.checked)}
              type="checkbox"
            />
            Also send me the free AI audit scope template
          </label>

          <button
            className="w-full rounded-lg bg-accent-400 px-4 py-2 text-sm font-semibold text-bg-default transition-colors hover:bg-accent-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send me the checklist"}
          </button>
        </form>
      </aside>

      <div
        aria-live="polite"
        className={`fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 rounded-lg border border-border-subtle bg-bg-surface px-4 py-3 text-center text-sm font-medium text-text-primary shadow-lg transition-all duration-300 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 ${
          showThanks
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-2"
        }`}
      >
        Check your inbox!
      </div>
    </>
  );
}
