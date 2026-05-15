"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Card, Input } from "@/components/ui";
import Link from "next/link";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const TRUST_ITEMS = [
  { icon: "🚀", title: "30-day delivery", desc: "From contract to live AI" },
  { icon: "📋", title: "Written report", desc: "Concrete roadmap with ROI" },
  { icon: "🤝", title: "No commitment", desc: "Free 30-min strategy call" },
  { icon: "🔒", title: "NDA on request", desc: "Your data stays private" },
];

const GOAL_OPTIONS = [
  "Lead response speed",
  "Conversion rate",
  "Customer support automation",
  "Internal operations",
  "WhatsApp automation",
  "Arabic AI chatbot",
  "Something else",
];

const TESTIMONIAL = {
  quote: "The audit was genuinely useful — not a sales pitch disguised as advice. We got a 12-page document with 3 specific automation opportunities and a 90-day roadmap.",
  author: "Sarah Chen",
  role: "Head of Digital, FinEdge",
  result: "31% lower support costs in 22 days",
};

export default function FreeAIAuditPage() {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspace_id");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    goal: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.company.trim()) next.company = "Company is required";
    if (!formData.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Enter a valid work email";
    }
    if (!formData.goal.trim()) next.goal = "Select or describe your goal";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const key = id.replace("audit-", "");
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const payload: Record<string, unknown> = { ...formData };
      if (workspaceId) payload.workspace_id = workspaceId;

      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(error.error || "Failed to submit audit request");
      }

      await res.json();
      setMessage({
        type: "success",
        text: "Thanks! We've received your request. Check your email within 5 minutes for next steps.",
      });
      setFormData({ name: "", company: "", email: "", goal: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container py-16 md:py-24">
      {/* HERO */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full bg-accent-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-400">
          Free AI audit — limited to 5 per week
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
          Get a practical AI roadmap in 30 minutes.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          We review your current customer touchpoints, identify three specific automation opportunities, and send you a written scope report — no commitment required.
        </p>
      </div>

      {/* TRUST BADGES */}
      <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 md:grid-cols-4">
        {TRUST_ITEMS.map((t) => (
          <div
            key={t.title}
            className="rounded-2xl border border-border-subtle bg-bg-surface p-5 text-center"
          >
            <div className="text-2xl">{t.icon}</div>
            <p className="mt-2 text-sm font-semibold text-text-primary">{t.title}</p>
            <p className="mt-1 text-xs text-text-tertiary">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* FORM + SIDEBAR */}
      <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-5">
        {/* Form */}
        <Card className="bg-bg-overlay/70 p-8 lg:col-span-3">
          {message && (
            <div
              className={`mb-6 rounded-lg p-4 text-sm ${
                message.type === "success"
                  ? "bg-accent-400/10 text-accent-400"
                  : "bg-error/10 text-error"
              }`}
            >
              {message.text}
            </div>
          )}

          <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-name">
                Name
              </label>
              <Input
                id="audit-name"
                placeholder="Sarah Chen"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />
              {errors.name ? <p className="mt-1 text-xs text-error">{errors.name}</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-company">
                Company
              </label>
              <Input
                id="audit-company"
                placeholder="FinEdge Ltd"
                value={formData.company}
                onChange={handleChange}
                aria-invalid={!!errors.company}
              />
              {errors.company ? <p className="mt-1 text-xs text-error">{errors.company}</p> : null}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-email">
                Work email
              </label>
              <Input
                id="audit-email"
                placeholder="sarah@company.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email ? <p className="mt-1 text-xs text-error">{errors.email}</p> : null}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="audit-goal">
                What do you want to improve?
              </label>
              <select
                id="audit-goal"
                value={formData.goal}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-border-subtle bg-bg-elevated px-4 text-sm text-text-primary focus:border-accent-400 focus:outline-none"
                aria-invalid={!!errors.goal}
              >
                <option value="">Select your primary goal...</option>
                {GOAL_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {errors.goal ? <p className="mt-1 text-xs text-error">{errors.goal}</p> : null}
            </div>

            <Button className="sm:col-span-2 w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </span>
              ) : (
                "Request my free AI audit"
              )}
            </Button>

            <p className="sm:col-span-2 text-center text-xs text-text-tertiary">
              We usually respond within 4 hours. No spam. Unsubscribe anytime.
            </p>
          </form>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-2">
          {/* What's included */}
          <Card className="bg-bg-surface p-6">
            <h3 className="text-lg font-semibold text-text-primary">What you get</h3>
            <ul className="mt-4 space-y-3">
              {[
                "30-minute strategy call with our AI team",
                "Review of your current customer touchpoints",
                "3 specific automation opportunities identified",
                "Written scope report with ROI estimates",
                "90-day implementation roadmap",
                "No commitment required",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Testimonial */}
          <Card className="bg-gradient-to-br from-accent-400/10 to-accent-400/0 p-6">
            <p className="text-sm leading-relaxed text-text-secondary">&ldquo;{TESTIMONIAL.quote}&rdquo;</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-400/20 text-sm font-bold text-accent-400">
                {TESTIMONIAL.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{TESTIMONIAL.author}</p>
                <p className="text-xs text-text-tertiary">{TESTIMONIAL.role}</p>
              </div>
            </div>
            <p className="mt-3 text-xs font-medium text-accent-400">{TESTIMONIAL.result}</p>
          </Card>

          {/* Urgency */}
          <div className="rounded-2xl border border-accent-400/20 bg-accent-400/5 p-5 text-center">
            <p className="text-sm font-medium text-text-primary">Limited availability</p>
            <p className="mt-1 text-xs text-text-secondary">
              We only conduct 5 audits per week to ensure every report gets the attention it deserves.
            </p>
            <p className="mt-2 text-xs font-semibold text-accent-400">3 slots remaining this week</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-16 max-w-2xl text-center">
        <p className="text-sm text-text-tertiary">
          Prefer to talk?{" "}
          <Link href="/contact" className="text-accent-400 hover:text-accent-300 underline">
            Contact us directly
          </Link>{" "}
          or call{" "}
          <a href="tel:+442038871234" className="text-accent-400 hover:text-accent-300 underline">
            +44 20 3887 1234
          </a>
        </p>
      </div>
    </main>
  );
}