import sgMail from "@sendgrid/mail";

const sg = sgMail;
if (process.env.SENDGRID_API_KEY) {
  sg.setApiKey(process.env.SENDGRID_API_KEY);
}

function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "https://www.alsolutionsai.online";
}

function getAppName(): string {
  return process.env.NEXT_PUBLIC_APP_NAME || "AL Solutions AI";
}

export interface NurtureLead {
  email: string;
  name?: string;
  company?: string;
  source: "audit_request" | "chatbot" | "contact_form" | "newsletter";
  requestedAt: string;
}

export interface NurtureEmail {
  id: number;
  subject: (lead: NurtureLead) => string;
  html: (lead: NurtureLead) => string;
  sendAfterDays: number;
}

function emailWrapper(content: string, lead: NurtureLead): string {
  const appName = getAppName();
  const appUrl = getAppUrl();
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; margin: 0; padding: 0; }
.container { max-width: 600px; margin: 0 auto; background: #ffffff; }
.header { background: linear-gradient(135deg, #5B21F6 0%, #7C3AED 100%); padding: 32px 24px; text-align: center; }
.header h1 { color: #ffffff; font-size: 20px; font-weight: 600; margin: 0; }
.content { padding: 32px 24px; }
.content p { margin: 0 0 16px; font-size: 15px; color: #334155; }
.cta { display: inline-block; background: #5B21F6; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 8px 0 24px; }
.footer { padding: 24px; text-align: center; border-top: 1px solid #e2e8f0; }
.footer p { font-size: 12px; color: #94a3b8; margin: 4px 0; }
.footer a { color: #5B21F6; text-decoration: none; }
</style>
</head>
<body>
<div class="container">
<div class="header"><h1>${appName}</h1></div>
<div class="content">${content}</div>
<div class="footer">
<p>&copy; ${year} ${appName}. All rights reserved.</p>
<p><a href="${appUrl}">Visit our website</a> · <a href="${appUrl}/unsubscribe?email=${encodeURIComponent(lead.email)}">Unsubscribe</a></p>
</div>
</div>
</body>
</html>`;
}

export const NURTURE_SEQUENCE: NurtureEmail[] = [
  {
    id: 1,
    sendAfterDays: 0,
    subject: () => "Your AI audit request is received — here's what happens next",
    html: (lead) =>
      emailWrapper(
        `<p>Hi${lead.name ? ` ${lead.name}` : ""},</p>
<p>Thanks for requesting a free AI audit. We&apos;ve received your details and will be in touch within 24 hours to schedule your 30-minute strategy call.</p>
<p><strong>What happens next:</strong></p>
<ul>
<li>We review your current website, customer touchpoints, and automation gaps</li>
<li>During the call, we identify 3 specific AI opportunities for your business</li>
<li>You receive a written scope report with estimated ROI and timeline — no commitment required</li>
</ul>
<p>In the meantime, here are a few resources that might interest you:</p>
<p><a href="${getAppUrl()}/case-studies" class="cta">Read our case studies</a></p>
<p><a href="${getAppUrl()}/blog/ai-chatbot-cost-mena" class="cta">See AI chatbot pricing guide</a></p>
<p>Talk soon,<br>AL Solutions AI Team</p>`,
        lead
      ),
  },
  {
    id: 2,
    sendAfterDays: 2,
    subject: () => "The #1 mistake businesses make with AI chatbots",
    html: (lead) =>
      emailWrapper(
        `<p>Hi${lead.name ? ` ${lead.name}` : ""},</p>
<p>We speak with businesses every week about AI chatbots. The most common mistake we see?</p>
<p><strong>Treating the chatbot as a FAQ bot instead of a lead-qualification engine.</strong></p>
<p>A well-built AI chatbot does three things a basic FAQ bot cannot:</p>
<ol>
<li><strong>Qualifies leads in real time</strong> — capturing budget, timeline, and intent before a human ever sees the inquiry</li>
<li><strong>Routes hot leads instantly</strong> — sending qualified prospects to the right sales rep with full conversation context</li>
<li><strong>Recovers abandoned conversations</strong> — following up on WhatsApp with visitors who started but didn't complete</li>
</ol>
<p>Most businesses see a 2–3x lift in qualified leads within 60 days of deploying a properly scoped chatbot.</p>
<p><a href="${getAppUrl()}/free-ai-audit" class="cta">Book your free audit</a></p>
<p>Best,<br>AL Solutions AI Team</p>`,
        lead
      ),
  },
  {
    id: 3,
    sendAfterDays: 5,
    subject: (lead) => `Case study: How a ${lead.company || "retail client"} cut support costs by 31%`,
    html: (lead) =>
      emailWrapper(
        `<p>Hi${lead.name ? ` ${lead.name}` : ""},</p>
<p>We wanted to share a recent client result that might be relevant to your business.</p>
<p><strong>FinEdge (fintech, UK)</strong> came to us after a failed chatbot deployment from a previous vendor. Their support team was drowning in routine queries, and compliance wouldn't approve the generic responses their old bot was giving.</p>
<p><strong>What we built:</strong></p>
<ul>
<li>Compliance-aware guardrails reviewed against FCA guidance</li>
<li>Tier-1 support deflection for statement, transaction, and eligibility queries</li>
<li>WhatsApp Business API with full audit logging</li>
</ul>
<p><strong>Result:</strong> 31% lower operational support costs in 22 days. 100% of conversations audit-logged by default.</p>
<p><a href="${getAppUrl()}/case-studies/fintech-automation" class="cta">Read the full case study</a></p>
<p>Questions? Just reply to this email.</p>
<p>Best,<br>AL Solutions AI Team</p>`,
        lead
      ),
  },
  {
    id: 4,
    sendAfterDays: 9,
    subject: () => "Arabic AI chatbots: what most vendors get wrong",
    html: (lead) =>
      emailWrapper(
        `<p>Hi${lead.name ? ` ${lead.name}` : ""},</p>
<p>If your business serves Arabic-speaking customers, you already know that most AI chatbots fail at code-switching.</p>
<p>A customer starts in Arabic, switches to English mid-conversation, and the bot breaks. Or the bot only understands Modern Standard Arabic and can't handle Khaleeji or Najdi dialects.</p>
<p><strong>Our approach is different:</strong></p>
<ul>
<li>Native multilingual training — not Google Translate layered on top</li>
<li>Code-switching support: customers can mix Arabic, English, and French in the same thread</li>
<li>RTL (right-to-left) layout support for Arabic interfaces</li>
<li>Dialect-aware responses for Khaleeji, Najdi, and Egyptian Arabic</li>
</ul>
<p>We&apos;ve deployed Arabic-first chatbots for hospitality, real estate, and e-commerce businesses across the GCC.</p>
<p><a href="${getAppUrl()}/blog/arabic-ai-chatbot-business" class="cta">Read: Arabic AI chatbot guide</a></p>
<p>Best,<br>AL Solutions AI Team</p>`,
        lead
      ),
  },
  {
    id: 5,
    sendAfterDays: 14,
    subject: () => "Last step: book your 30-minute AI strategy call",
    html: (lead) =>
      emailWrapper(
        `<p>Hi${lead.name ? ` ${lead.name}` : ""},</p>
<p>This is the final email in our nurture sequence. Over the past two weeks, we&apos;ve shared:</p>
<ul>
<li>The #1 mistake with AI chatbots (and how to avoid it)</li>
<li>A real client case study with 31% cost reduction in 22 days</li>
<li>Why Arabic AI chatbots fail — and how we build them differently</li>
</ul>
<p><strong>The next step is simple:</strong> book your free 30-minute AI audit.</p>
<p>During the call, we will:</p>
<ol>
<li>Review your current customer touchpoints</li>
<li>Identify 3 specific automation opportunities</li>
<li>Send you a written scope report with ROI estimates</li>
</ol>
<p>No commitment. No pressure. Just a clear picture of what AI can do for your business.</p>
<p><a href="${getAppUrl()}/free-ai-audit" class="cta">Book my free AI audit</a></p>
<p>If you&apos;re not ready yet, no problem — you can always reach us at hello@al-solutions-ai.com.</p>
<p>Talk soon,<br>AL Solutions AI Team</p>`,
        lead
      ),
  },
];

export async function sendNurtureEmail(
  lead: NurtureLead,
  email: NurtureEmail
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("[Nurture] SENDGRID_API_KEY not configured. Skipping email.");
    return { success: false, error: "SendGrid not configured" };
  }

  try {
    await sg.send({
      to: lead.email,
      from: `${getAppName()} <hello@al-solutions-ai.com>`,
      subject: email.subject(lead),
      html: email.html(lead),
    });
    console.log(`[Nurture] Email ${email.id} sent to ${lead.email}`);
    return { success: true };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Nurture] Failed to send email ${email.id} to ${lead.email}:`, errorMsg);
    return { success: false, error: errorMsg };
  }
}
