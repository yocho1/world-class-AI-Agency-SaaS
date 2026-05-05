"use client"
import React, { useState } from "react"
import {
  trackPageViewed,
  trackHeroCTAClick,
  trackServiceCardClick,
  trackCaseStudyClick,
  trackTestimonialViewed,
} from "@/lib/analytics/events"
import { usePostHog } from "posthog-js/react"

export default function AnalyticsDebugPage() {
  const [logs, setLogs] = useState<string[]>([])
  const push = (m: string) => setLogs((s) => [m, ...s])
  const posthog = usePostHog()

  if (posthog) {
    // no-op
  } else {
    push("PostHog client not available (ensure NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is set)")
  }

  const safeCall = (fn: () => Promise<void>, name: string) => {
    fn()
      .then(() => push(`OK: ${name}`))
      .catch((e) => push(`ERR: ${name} -> ${String(e)}`))
  }

  const referrer = typeof document === "undefined" ? "" : document.referrer || ""

  return (
    <div style={{ padding: 24 }}>
      <h1>Analytics Debug</h1>
      <p>Trigger analytics helper functions and view status logs below.</p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
        <button onClick={() => safeCall(async () => {
          const payload = { page: "/analytics-debug", referrer }
          if (posthog) {
            trackPageViewed(posthog, payload)
          }
        }, "trackPageViewed")}>Track Page Viewed</button>

        <button onClick={() => safeCall(async () => {
          const payload = { cta_variant: "primary" as const, scroll_depth: 0 }
          if (posthog) {
            trackHeroCTAClick(posthog, payload)
          }
        }, "trackHeroCTAClick")}>Hero CTA</button>

        <button onClick={() => safeCall(async () => {
          const payload = { service: "ai-chatbots", position: 1 }
          if (posthog) {
            trackServiceCardClick(posthog, payload)
          }
        }, "trackServiceCardClick")}>Service Card</button>

        <button onClick={() => safeCall(async () => {
          const payload = { case_study_id: "case-123", position: 1 }
          if (posthog) {
            trackCaseStudyClick(posthog, payload)
          }
        }, "trackCaseStudyClick")}>Case Study</button>

        <button onClick={() => safeCall(async () => {
          const payload = { testimonial_id: "t-1", auto_or_manual: "manual" as const }
          if (posthog) {
            trackTestimonialViewed(posthog, payload)
          }
        }, "trackTestimonialViewed")}>Testimonial Viewed</button>
      </div>

      <div style={{ marginTop: 18 }}>
        <strong>Logs</strong>
        <div style={{ marginTop: 8, maxHeight: 320, overflow: "auto", background: "#111", color: "#fff", padding: 12, borderRadius: 6 }}>
          {logs.length === 0 ? <div style={{ opacity: 0.7 }}>No logs yet</div> : logs.map((l) => <div key={`log-${l}`}>{l}</div>)}
        </div>
      </div>
    </div>
  )
}
