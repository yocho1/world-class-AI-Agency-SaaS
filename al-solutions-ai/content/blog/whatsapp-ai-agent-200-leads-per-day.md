---
title: "How we built a WhatsApp AI agent that qualifies 200+ leads per day — and what we'd do differently"
date: "2025-09-18"
author: "Asim Jan"
authorTitle: "Founder, AL Solutions AI"
readTime: "9 min"
excerpt: "A first-person engineering breakdown of the WhatsApp AI agent we shipped for a UAE real estate group — what worked, what nearly didn't, and the two decisions that would have saved us a week."
category: "Engineering"
featured: true
---

# How we built a WhatsApp AI agent that qualifies 200+ leads per day — and what we'd do differently

In January 2025, a UAE real estate group hired us with a problem most of our clients have in some form: their leads were dying in the gap between the website form submission and the first human reply.

The average response time on their inbound enquiries was **4 to 6 hours**. Their internal data showed that buyers who waited more than 30 minutes for a reply converted to a viewing **41% less often** than those who got a response inside 10 minutes. The fix wasn't a bigger sales team — they'd already tried that. The fix was a WhatsApp AI agent that could qualify the buyer, match them to a property, route the hot ones to a human, and log everything to HubSpot, in Arabic and English, without supervision.

Twenty-six days after the kickoff call, the system was live. Eight months later it's handled over 47,000 conversations and is qualifying **200+ leads per day** on average. Below is what worked, what nearly didn't, and the two engineering decisions I'd revisit if I were starting this project from scratch today.

## The real problem (and why "just hire more reps" doesn't fix it)

Most response-time problems in real estate aren't capacity problems. They're routing problems compounded by working hours.

The client had 12 agents across two cities. Most enquiries arrived between 7pm and midnight (when buyers had time to browse listings after work). The agents were sleeping. By the time anyone replied the next morning, the buyer had already been contacted by 2–3 competitors, and the conversation was effectively dead.

You can't hire your way out of this with a night shift — the volume is too uneven. Some nights have 80 enquiries, some have 3. What you can do is have a system that:

1. **Replies in under 60 seconds, 24/7**, in the buyer's language
2. **Qualifies the lead** (budget, location, bedroom count, timeline, financing readiness)
3. **Matches against your live inventory** and surfaces 3–5 specific properties
4. **Routes the hot ones to a named human agent** with a full conversation summary
5. **Syncs everything to your CRM** with structured fields, not freeform notes

That's the AI agent we built. Below is how each step actually works.

## Step-by-step: what happens inside the conversation

**Step 1 — Detect language and intent.** When a WhatsApp message arrives, the first thing the system does is run a fast classifier (we use a fine-tuned MiniLM) to detect the message language and whether the buyer is a real lead vs. a misrouted enquiry (someone asking about a job application, a press request, etc.). Real leads route to the qualification flow. Everything else routes to a static reply with the right contact email.

**Step 2 — Open the conversation.** The agent responds in the same language the buyer messaged in. This sounds trivial. It is the single hardest engineering problem in the entire system, and I'll come back to it.

**Step 3 — Qualify with 4 questions, not 14.** Every additional question you ask drops your completion rate by 5–10 percentage points. We ask: budget range, preferred area, bedrooms, and "are you ready to view this month, this quarter, or just researching?" Four questions. Average completion time: 90 seconds.

**Step 4 — Match against live inventory.** The agent calls a property search API (HubSpot Custom Objects in our case, but it could be Salesforce, a bespoke DB, or a portal feed). It returns the top 5 matches and posts 2–3 of them inside the WhatsApp conversation as carousel cards with photos, price, and a "view details" button.

**Step 5 — Score the lead and route.** Each lead gets a score between 0 and 100 based on budget specificity, urgency, area specificity, and engagement. Anything above 70 is a "hot lead" and gets routed to a human agent in <30 seconds via a HubSpot task plus a SMS to the agent's personal phone. Anything 40–70 gets a nurture flow. Anything below 40 stays in the bot's hands for follow-up.

**Step 6 — Sync to CRM.** The full conversation, lead score, qualified fields, matched properties, and assigned agent are pushed to HubSpot as a Deal and a Contact, with custom fields for budget range, area, timeline, and language preference.

## The two engineering decisions most people get wrong

There are roughly 50 decisions you make when building one of these systems. Two of them matter more than the other 48 combined. Get these right and the rest is execution. Get them wrong and no amount of prompt engineering will rescue you.

### Decision 1: Language switching mid-conversation

Most AI chatbots in MENA fail in the same place: the buyer starts in Arabic, switches to English mid-sentence ("شو الميزانية بدها around 500k"), and the bot either freezes or replies in only one language going forward.

The mistake everyone makes is treating "language" as a session-level setting. They detect the language on the first message and lock it. This is wrong. **Real buyers switch languages constantly**, especially in the UAE where most professionals are bilingual and will throw an English number into an Arabic sentence without thinking.

What we do instead: detect language **on every single message**, and structure the prompt so the model responds in the dominant language of the most recent buyer message — not the session start. We also pre-process Arabic messages to normalize dialect markers (Gulf, Levantine, MSA) so the model doesn't get tripped up by "شو" vs "ماذا" vs "ايش".

This one change took us from ~65% conversation completion rate to ~91%.

### Decision 2: The hot-lead threshold

The instinct when you build a lead-scoring AI is to make the threshold high. "Only route the very best leads to humans, save the agents' time." This is wrong. It feels right, but it's wrong.

The reason: in the early weeks of any AI lead system, the model's scoring is calibrated against historical data that does not yet reflect how the AI itself changes the funnel. The leads the AI processes are not the same shape as the leads humans used to process — they're more qualified, more specific, and they arrived through a different intent path.

If you set the threshold too high, you starve the human agents of leads in the first 30–60 days, they lose confidence in the system, and the project gets killed politically before the data is in.

**What we do:** start the threshold at the 60th percentile of historical lead quality, not the 80th. Route more leads to humans than feels comfortable for the first month. Tune the threshold up only after you have 500+ real conversations to calibrate against.

## The result

Twenty-six days from contract to go-live (we said 30 in the SOW; we shipped early because the inventory API was simpler than expected).

After 60 days running in production:

- **−78% average response time** on inbound enquiries (from 4h 23min average to 58 seconds average)
- **+41% lead-to-viewing conversion** (from a baseline of 14.2% to 20.0%)
- **47,000+ conversations handled** in 8 months without an outage or a complaint that reached the founder
- **3 of 12 agents** reassigned to higher-value work because their previous role (first-touch qualification) was fully automated

That last number is the one that mattered most to the buyer. They didn't reduce headcount. They redeployed three people to outbound on warm referrals, which the AI couldn't do.

## What we'd do differently

In the spirit of being honest about what we got wrong:

**1. We spent too long on the qualification questions.** Our first version asked 7 questions. Completion rate was 58%. We cut it to 4 and rate jumped to 91%. We should have started with 4. Every "but what about edge case X?" question we added cost us 5 percentage points of completion and didn't materially improve the lead quality. If I built this again tomorrow, I'd ship with 3 questions, not 4.

**2. We built the property matching algorithm before we had real data.** We wrote a fairly sophisticated ranking algorithm that weighted price proximity, area match, bedroom count, and recency. Then the system went live and we discovered that buyers don't care about the "best" match — they care about variety. Showing 3 different properties at different price points converted better than showing the 3 closest matches. We had to rewrite the matching in week 2. If I built this again I'd ship with a dumb "show 3 random matches in budget range" and only optimize once we had 1,000 real conversations to learn from.

**3. We didn't build a feedback loop for the human agents.** When a human agent took over a conversation, we had no easy way for them to flag "this lead was actually cold" or "the AI missed a key detail." We added it in month 3. We should have built it in week 1. The agents are your training data — they know which AI summaries were accurate and which weren't, and that signal is gold.

## If you're considering building something like this

The three questions to ask yourself before you start:

1. **Is your problem actually a response-time problem, or is it a lead-quality problem?** If your leads are coming in qualified but converting badly, AI won't help. Fix the sales process first.
2. **Do you have a live inventory or product catalogue the AI can query?** If not, you'll need to build that first, and it's usually a bigger project than the AI itself.
3. **Will your team accept AI-qualified leads?** This is more political than technical. If your agents distrust AI scoring, the system will fail no matter how good the model is. Pilot with one team, prove the conversion lift, then expand.

---

If you're stuck on the response-time problem and want a frank conversation about whether an AI lead agent is the right answer for your business, [book a free 30-minute audit with me](https://calendly.com/achraflachgar/15min). I'll tell you what I'd build, what I wouldn't, and what it would cost — no sales pitch, no pressure to commit.

— Asim Jan, Founder, AL Solutions AI
