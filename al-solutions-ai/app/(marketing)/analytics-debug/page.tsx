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

  if (!posthog) {
    // provide a clear log if PostHog isn't initialized in the environment
    push("PostHog client not available (ensure NEXT_PUBLIC_POSTHOG_KEY is set)")
  }

  const safeCall = (fn: () => void | Promise<void>, name: string) => {
    try {
      const res = fn()
      if (res && typeof (res as Promise<void>).then === "function") {
        ;(res as Promise<void>)
          .then(() => push(`OK: ${name}`))
          .catch((e) => push(`ERR: ${name} -> ${String(e)}`))
      } else {
        push(`OK: ${name}`)
      }
    } catch (e) {
      push(`ERR: ${name} -> ${String(e)}`)
    }
  }

  const mirrorToServer = async (eventName: string, payload: Record<string, unknown>) => {
    const response = await fetch("/api/debug/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: eventName, payload, at: new Date().toISOString() }),
    })
    if (!response.ok) {
      throw new Error(`Debug endpoint returned ${response.status}`)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Analytics Debug</h1>
      <p>Trigger analytics helper functions and view status logs below.</p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
        <button onClick={() => safeCall(async () => {
          const payload = { page: "/analytics-debug", referrer: typeof document !== "undefined" ? document.referrer || "" : "" }
          if (posthog) trackPageViewed(posthog, payload)
          await mirrorToServer("page_viewed", payload)
        }, "trackPageViewed")}>Track Page Viewed</button>

        <button onClick={() => safeCall(async () => {
          const payload = { cta_variant: "primary" as const, scroll_depth: 0 }
          if (posthog) trackHeroCTAClick(posthog, payload)
          await mirrorToServer("hero_cta_clicked", payload)
        }, "trackHeroCTAClick")}>Hero CTA</button>

        <button onClick={() => safeCall(async () => {
          const payload = { service: "ai-chatbots", position: 1 }
          if (posthog) trackServiceCardClick(posthog, payload)
          await mirrorToServer("service_card_clicked", payload)
        }, "trackServiceCardClick")}>Service Card</button>

        <button onClick={() => safeCall(async () => {
          const payload = { case_study_id: "case-123", position: 1 }
          if (posthog) trackCaseStudyClick(posthog, payload)
          await mirrorToServer("case_study_clicked", payload)
        }, "trackCaseStudyClick")}>Case Study</button>

        <button onClick={() => safeCall(async () => {
          const payload = { testimonial_id: "t-1", auto_or_manual: "manual" as const }
          if (posthog) trackTestimonialViewed(posthog, payload)
          await mirrorToServer("testimonial_viewed", payload)
        }, "trackTestimonialViewed")}>Testimonial Viewed</button>
      </div>

      <div style={{ marginTop: 18 }}>
        <strong>Logs</strong>
        <div style={{ marginTop: 8, maxHeight: 320, overflow: "auto", background: "#111", color: "#fff", padding: 12, borderRadius: 6 }}>
          {logs.length === 0 ? <div style={{ opacity: 0.7 }}>No logs yet</div> : logs.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  )
}
