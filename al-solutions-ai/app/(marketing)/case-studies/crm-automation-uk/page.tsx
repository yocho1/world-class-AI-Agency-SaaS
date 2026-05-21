import type { Metadata } from "next";
import { CaseStudyLayout, type CaseStudyData } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "−89% CRM Admin Time for a UK Professional Services Firm | Case Study | AL Solutions AI",
  description:
    "How a 12-person UK sales team eliminated manual CRM updates with an AI agent that auto-logs calls, extracts deal context, and updates HubSpot — reviewed and approved in one click.",
};

const CASE_STUDY: CaseStudyData = {
  slug: "crm-automation-uk",
  industry: "Professional Services",
  headline: "UK professional services firm: −89% CRM admin time with AI call logging",
  description:
    "An AI agent listens to call recordings, extracts deal stage, next steps, and objections, then auto-updates HubSpot with a structured summary — reviewed and approved by the rep in one click.",
  metrics: [
    { label: "CRM admin time per rep", value: "−89%", note: "From 45 min/day to under 5 min/day" },
    { label: "Pipeline accuracy", value: "61% → 94%", note: "Before vs. after AI logging" },
    { label: "Time to go-live", value: "19 days", note: "Fastest deployment to date" },
  ],
  challenge: {
    statement:
      "A 12-person sales team at a UK professional services firm was spending an average of 45 minutes per rep per day on manual CRM admin in HubSpot. Pipeline accuracy was low — 61% — because updates were delayed, skipped, or inconsistent. Reps hated the work, managers could not trust the data for forecasting, and the firm's CRM investment was generating diminishing returns. The team had tried templated note-taking tools but nothing that actually understood deal context or extracted actionable next steps.",
    painPoints: [
      "45 minutes per rep per day on manual HubSpot updates",
      "Pipeline accuracy at 61% — forecasts unreliable",
      "Reps skipping CRM updates after busy days",
      "No structured next-step extraction from calls",
      "Management unable to identify stalled deals early",
      "Previous note-taking tools only transcribed — did not extract deal context",
    ],
  },
  solution: {
    intro:
      "We built an AI call-logging agent powered by GPT-4o and Whisper. The system ingests call recordings via API, transcribes with speaker diarization, extracts deal stage, contact updates, next steps, and objections, then generates a structured HubSpot update. The rep reviews and approves in one click before any data is written.",
    features: [
      {
        title: "Auto call transcription",
        description: "Whisper-based transcription with speaker diarization (rep vs. prospect). Handles industry jargon and multiple accents common in UK professional services.",
        icon: "🎙️",
      },
      {
        title: "Deal context extraction",
        description: "AI identifies deal stage, budget signals, timeline, decision-makers, objections, and next steps. Structures them into HubSpot-compatible fields.",
        icon: "📊",
      },
      {
        title: "One-click approval",
        description: "Reps receive a structured summary via email or Slack within 5 minutes of call end. One click approves the update. Two clicks to edit before posting.",
        icon: "✅",
      },
    ],
  },
  results: [
    { stat: "−89%", label: "CRM admin time per rep", note: "From 45 min/day to under 5 min/day" },
    { stat: "61% → 94%", label: "Pipeline accuracy", note: "Before vs. after AI logging" },
    { stat: "3.5", label: "Hours recovered per week", note: "Per rep, reallocated to selling" },
    { stat: "19", label: "Days to go-live", note: "Fastest deployment to date" },
  ],
  processSteps: [
    { step: 1, title: "Day 1–3: Call audit & HubSpot mapping", body: "Reviewed 20 recent call recordings with the sales manager. Mapped HubSpot deal stages, contact fields, and activity types. Identified the 8 data points that would have the highest forecasting impact if consistently logged." },
    { step: 2, title: "Day 4–7: Transcription pipeline", body: "Set up call recording ingestion via the firm's existing call recording provider API. Configured Whisper for speaker diarization. Tested transcription accuracy on 50 calls across different rep accents and speaking speeds." },
    { step: 3, title: "Day 8–12: Extraction engine build", body: "Built the GPT-4o prompt chain for deal context extraction: stage identification, next-step extraction, objection detection, and contact update suggestions. Tuned output format to match HubSpot's activity and contact API structures." },
    { step: 4, title: "Day 13–16: Approval workflow & integration", body: "Built the one-click approval UI (email + Slack). Integrated with HubSpot API for read-before-write updates. Added a 'skip this update' button so reps maintain full control." },
    { step: 5, title: "Day 17–19: Pilot & go-live", body: "Ran with 3 reps for 2 days. Gathered feedback on summary accuracy. Adjusted the prompt to better handle ambiguous next steps ('I'll think about it'). Full team rollout. Delivered training session and playbook." },
  ],
  technicalDetails: {
    intro: "The system touches sensitive client conversation data — security and accuracy were the two top priorities.",
    items: [
      { title: "Transcription: OpenAI Whisper", description: "State-of-the-art speech recognition with speaker diarization. 94% word accuracy on the firm's call samples. Audio deleted immediately after transcription." },
      { title: "Extraction: GPT-4o", description: "Structured output (JSON mode) for reliable parsing. Custom system prompt trained on 50 annotated calls from the firm. Temperature 0.2 for maximum consistency." },
      { title: "CRM: HubSpot API", description: "Activities, contacts, and deals updated via official HubSpot API. All writes go through the approval layer — no auto-posting without human review." },
      { title: "Approval: Slack + Email", description: "Reps receive a formatted summary in Slack or email. One-click approval triggers the HubSpot write. Edit mode allows corrections before posting." },
      { title: "Security: End-to-end encryption", description: "Call recordings encrypted at rest (AES-256) and in transit (TLS 1.3). Transcription data retained for 7 days then purged. No audio stored long-term." },
      { title: "Monitoring: Accuracy dashboard", description: "Weekly accuracy report: extraction correctness rate, rep approval rate, and average time from call end to approved update." },
    ],
  },
  lessonsLearned: [
    "Making the rep's one-click approval mandatory before any CRM update was the single most important design decision. It maintained trust in the system and prevented AI errors from corrupting clean data. In week 1, reps edited 23% of AI-generated summaries. By week 4, that dropped to 8% — the AI was learning from corrections.",
    "We initially built the extraction to guess deal stage from conversation content alone. Reps told us this was wrong 40% of the time because stage is as much about buyer behaviour as conversation content. We added a 'stage confidence' score and only auto-suggest stage changes above 0.85 confidence.",
    "The biggest time saving came from next-step extraction, not contact updates. Reps were spending 15+ minutes per call trying to remember and phrase next steps. The AI's structured 'Next step: [action] by [date] with [stakeholder]' format was adopted immediately.",
    "One rep was initially resistant — he saw it as surveillance, not assistance. We showed him his personal time savings: 3.5 hours per week. He became the system's biggest advocate and helped onboard the rest of the team.",
  ],
  testimonial: {
    quote:
      "We went from reps skipping CRM updates because they were too busy, to every call being logged with structured next steps within 5 minutes. Pipeline accuracy jumped from 61% to 94%. The one-click approval meant reps trusted the system from day one.",
    author: "Sales Director",
    title: "Professional Services Firm",
    company: "UK — name withheld by NDA",
  },
  companyName: "UK Professional Services Firm",
  relatedCaseStudies: [
    { title: "WhatsApp AI for a UAE real estate agency", metric: "−78% response time", slug: "real-estate-uae" },
    { title: "AI support agent for a UK trading platform", metric: "−68% ticket volume", slug: "trading-platform-uk" },
  ],
  ctaSections: [
    {
      title: "Similar to your business?",
      body: "If your sales team is losing selling time to CRM admin, we can scope an AI call-logging system that recovers 3+ hours per week per rep — with full human approval on every update.",
      linkHref: "https://calendly.com/achraflachgar/15min",
      linkText: "Book free AI audit",
    },
  ],
};

export default function CRMAutomationCaseStudyPage() {
  return <CaseStudyLayout data={CASE_STUDY} />;
}
