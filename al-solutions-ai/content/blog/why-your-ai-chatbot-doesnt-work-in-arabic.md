---
title: "Why your AI chatbot doesn't work in Arabic (and the 3 things that actually fix it)"
date: "2025-11-04"
author: "Asim Jan"
authorTitle: "Founder, AL Solutions AI"
readTime: "8 min"
excerpt: "Most AI chatbots in the MENA region fail in Arabic for the same three reasons — and none of them are about the language model itself. A direct breakdown for technical buyers."
category: "Engineering"
featured: true
---

# Why your AI chatbot doesn't work in Arabic (and the 3 things that actually fix it)

If you've deployed an AI chatbot for a business that serves Arabic-speaking customers and it isn't working, I can guess what's happening without seeing your stack.

Your bot probably works fine in English. Your bot probably works okay-ish in Modern Standard Arabic — the formal written language no one actually speaks. And your bot probably falls apart the moment a real customer types something like "شو في عندكم 2 bedroom في الجميرا" — a Gulf dialect with code-switched English, the way real bilingual buyers actually message on WhatsApp.

This isn't your prompt's fault. It isn't even really the language model's fault. It's three specific engineering decisions that almost every vendor outside the MENA region gets wrong, and that are fixable if you know what to look for.

This article is for technical decision-makers — CTOs, heads of digital, founders — at MENA businesses who are evaluating AI chatbot vendors or trying to figure out why the one they just bought is converting at half the rate it should.

## Why standard LLMs underperform in Arabic

The big LLMs (GPT-4o, Claude Sonnet, Gemini) are all multilingual. They will all produce grammatically correct Arabic output. They will all read Arabic input without complaining. On a benchmark of "does it understand the language at all," they pass.

The problem is that "Arabic" is not one language for the purposes of chatbot UX. It's at least four:

**1. Modern Standard Arabic (MSA).** The version used in news, official documents, and formal writing. Roughly 0% of casual WhatsApp conversations are in MSA. Most LLMs default to MSA when generating Arabic responses, which sounds to a Gulf buyer roughly the way a contract lawyer's voice would sound replying to your weekend dinner reservation enquiry. Stiff. Wrong register.

**2. Gulf Arabic (Khaleeji).** Used in UAE, Saudi, Kuwait, Bahrain, Qatar, Oman. Specific vocabulary ("شو" instead of MSA "ماذا"), specific verb conjugations, specific particles. Buyers in Dubai will message in Gulf, not MSA.

**3. Levantine Arabic.** Used in Lebanon, Jordan, Syria, Palestine. Different vocabulary again ("شو" same as Gulf, but "هلق" instead of Gulf "هاللحظة"). A bot trained or prompted only on Gulf will sound foreign to a Beirut buyer.

**4. Maghrebi Arabic (Darija).** Used in Morocco, Algeria, Tunisia. Heavily influenced by French and Berber. So divergent from MSA that fluent MSA speakers often struggle to understand it.

The LLMs handle MSA well. They handle Gulf and Levantine adequately if you prompt carefully. They handle Darija badly enough that for Maghrebi clients we usually combine the LLM with custom-trained Darija classifiers and post-processing rules.

If your chatbot vendor doesn't know which of these four your customers speak, they're going to ship you a bot that produces grammatically perfect MSA replies to buyers who wrote in dialect, and your buyers will assume the bot is a poorly translated foreign system and will disengage.

## The mid-conversation language switch problem

Here's the issue almost no one outside MENA gets right.

In the UAE, Saudi Arabia, Lebanon, and most major MENA business centers, the typical professional is bilingual or trilingual. They switch languages mid-sentence without thinking. A real WhatsApp message from a real buyer (this is paraphrased from one we processed last month):

> "مرحبا، أبحث عن villa في dubai marina, budget around 3 million AED, do you have anything available?"

That's Arabic → English → Arabic → English → English. One sentence. Four switches.

Most commercial chatbots handle this in one of two ways, both wrong:

**Wrong approach 1: Detect language at session start, lock it.** First message was Arabic, so all replies are Arabic. Result: when the buyer's next message is "Do you have any 2-bedroom apartments in Marina?", the bot replies in Arabic, the buyer is confused, the conversation dies.

**Wrong approach 2: Require explicit language switch.** "Type EN for English, AR for Arabic." This is the equivalent of a 1995 IVR phone system. Real buyers will never type a language code. They will just leave.

The right approach (and the one we use): **detect language on every single message, weighted toward the most recent message's dominant language, and respond in whatever the buyer just used.** If the buyer types a mostly-English message with one Arabic word, respond in English. If they type a mostly-Arabic message with one English number, respond in Arabic. Mirror their pattern.

This sounds simple. It requires careful prompt engineering, a per-message language classifier (not session-level), and explicit instructions in the system prompt about what counts as the "dominant" language in mixed input. We do it with a 4-step preprocessor before the message ever reaches the LLM. Most off-the-shelf chatbot platforms can't do it at all because their architecture assumes language is a session property.

## The 3 engineering decisions that actually fix it

### 1. Dialect classifier as a preprocessing step

Before any message reaches your LLM, run it through a lightweight classifier that labels:

- **Language(s) present in the message** (Arabic, English, French, mixed)
- **If Arabic: dialect family** (Gulf, Levantine, Maghrebi, MSA)
- **Dominant language by token count** (which language has more words)

We use a fine-tuned distilled model for this — fast enough to run on every incoming message with <50ms overhead. The output of the classifier is injected into the LLM system prompt as a "respond in [language] using [dialect family] register" instruction.

This is the difference between a bot that sounds local and a bot that sounds like a Google Translate output.

### 2. Prompt structure designed for RTL

If you ask GPT-4o to generate an Arabic response, the model produces correctly-formatted Arabic. The problem isn't the model. The problem is everything downstream: your chat UI, your WhatsApp template renderer, your email notifications to internal staff.

Three specific issues you need to handle:

**RTL rendering in mixed content.** Arabic text needs `dir="rtl"` on the containing element. English or numeric content embedded inside Arabic text needs to be wrapped in `<bdi>` tags or similar to prevent the browser's bidirectional algorithm from reordering things wrong. Most off-the-shelf chat widgets produce subtly broken Arabic where prices ("AED 3,200,000") appear before the word "السعر" instead of after.

**Quoted snippets in CRM notifications.** When your AI sends a summary to a human agent via Slack or email, that summary contains Arabic. If your notification template doesn't explicitly set RTL direction on Arabic blocks, your agent sees garbled text. We've audited internal tools at three different MENA clients where this was happening and no one had noticed because the agents had stopped reading the AI summaries.

**Numeric formats.** Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) vs. Western digits (0123456789). Buyers will use either or both, often in the same message. Your system needs to normalize to one format before parsing budgets and prices, then format display back to the buyer's apparent preference.

### 3. Fallback handling for low-confidence inputs

The single biggest difference between a chatbot that works and one that doesn't is what happens when the bot doesn't understand.

Default LLM behavior: hallucinate a confident-sounding answer. This is catastrophic in a sales context — the bot tells a buyer that a property exists when it doesn't, or quotes a price it invented, and the human agent inherits a destroyed conversation.

The right approach: structured uncertainty handling. The LLM returns both an answer and a confidence score. If confidence is below threshold, the bot says something like "I want to make sure I get this right — let me connect you with a specialist," and routes to a human. We tune the threshold per client. For real estate it sits around 0.7. For healthcare-adjacent enquiries we run it at 0.85 because the cost of a wrong answer is higher.

## How to test any vendor's Arabic capability before signing

If a vendor is pitching you an Arabic-capable chatbot, here are 5 specific test messages to send through their demo before you sign anything. If any of them produce a broken or off-tone response, that's your answer.

**Test 1 — Code-switched message:** Send: "شو في عندكم apartments في dubai marina budget around 2 mil?"

A working bot replies in mostly-Arabic with the English words preserved as English. A broken bot either replies entirely in formal MSA, asks you to choose a language, or replies in English ignoring the Arabic context.

**Test 2 — Pure Gulf dialect:** Send: "ياهلا، ودي أعرف عن الشقق المتوفرة"

A working bot replies in Gulf dialect ("ياهلا فيك، أكيد، شو نوع الشقة اللي تبحث عنها؟"). A broken bot replies in MSA ("أهلا بك. نعم، يسرنا تقديم المعلومات حول الشقق المتوفرة لدينا.") — grammatically perfect but in a register that sounds foreign in a casual WhatsApp context.

**Test 3 — Mid-conversation switch:** Send first: "أبحث عن فيلا"  
Then: "Actually, can you tell me which neighborhoods you have available?"

A working bot replies in English to the second message without confusion. A broken bot replies in Arabic to the English question, or asks you to confirm your language preference.

**Test 4 — Arabic-Indic numerals:** Send: "ميزانيتي ٢ مليون درهم"

A working bot parses ٢ as 2 and confirms the budget understanding. A broken bot either ignores the number, mis-parses it, or returns "I didn't understand your budget."

**Test 5 — Out-of-scope question:** Send: "هل تقبلون التمويل البنكي من بنك أبوظبي الأول؟"

A working bot acknowledges the question, says it doesn't have specific information on that bank's financing terms, and offers to connect you with a human. A broken bot hallucinates a confident-sounding policy that may or may not be accurate.

Send all five. If the vendor passes 4 or 5, they understand the problem. If they pass 2 or fewer, they don't.

## What we do at AL Solutions AI

We've been building AI systems for MENA businesses since 2018, when most of the current generation of LLM tooling didn't exist yet. Arabic is a core competency for us, not an internationalization checkbox. Every AI agent we ship runs through the three-step architecture above — dialect classifier, language-mirroring system prompt, confidence-gated fallbacks — and we ship in Gulf, Levantine, Maghrebi, MSA, English, and French.

Our current production systems handle conversations across all six dialect families with switching mid-message. Real example from a current client (paraphrased, NDA): a Saudi buyer messaged in Gulf, switched to English for the budget number, switched back to Gulf for the area, and the AI mirrored each turn. Conversation completion rate on that client: 91%.

If you're evaluating Arabic AI capability and want to see this working in a live conversation rather than a sales demo — [test our Arabic AI on the homepage](/#live-demo). Type a real message in whatever dialect or language combination you use with your buyers. The bot responds the same way it would in production.

— Asim Jan, Founder, AL Solutions AI
