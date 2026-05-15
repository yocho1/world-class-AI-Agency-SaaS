import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNurtureEmail, NURTURE_SEQUENCE, type NurtureLead } from "@/lib/email/nurture";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseServerClient } from "@/lib/leads";
import { getTenantForUser } from "@/lib/tenants";

const triggerSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  company: z.string().optional(),
  source: z.enum(["audit_request", "chatbot", "contact_form", "newsletter"]).optional(),
  leadId: z.string().optional(),
  emailId: z.number().int().min(1).max(5).optional(),
  dayOffset: z.number().int().min(0).max(30).optional(),
});

export async function GET() {
  try {
    const sequence = NURTURE_SEQUENCE.map((e) => ({
      id: e.id,
      sendAfterDays: e.sendAfterDays,
      subject: e.subject({ email: "", source: "audit_request", requestedAt: new Date().toISOString() }),
    }));
    return NextResponse.json({ ok: true, sequence });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: "Failed to fetch sequence", details: errorMsg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = triggerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    let lead: NurtureLead;

    if (parsed.data.leadId) {
      // Fetch lead from DB
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

      const tenant = await getTenantForUser(user.id);
      if (!tenant) return NextResponse.json({ ok: false, error: "Tenant not found" }, { status: 403 });

      const sb = supabase as SupabaseServerClient;
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const sevenDaysAgoISO = sevenDaysAgo.toISOString();

      const orExpr = `and(id.eq.${parsed.data.leadId},tenant_id.eq.${tenant.tenantId as string})` +
        `,and(id.eq.${parsed.data.leadId},tenant_id.is.null,created_at.gte.${sevenDaysAgoISO})`;

      const { data: dbLead, error: fetchError } = await sb
        .from("leads")
        .select("id, name, email, company, source, lead_captured_at, qualification_data")
        .or(orExpr)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!dbLead) return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const leadRow = dbLead as any;
      const source = (leadRow.source as NurtureLead["source"]) || "chatbot";
      lead = {
        email: leadRow.email || "",
        name: leadRow.name || undefined,
        company: leadRow.company || undefined,
        source,
        requestedAt: (leadRow.lead_captured_at as string) || new Date().toISOString(),
      };

      // Determine which email to send
      const email = parsed.data.emailId
        ? NURTURE_SEQUENCE.find((e) => e.id === parsed.data.emailId)
        : parsed.data.dayOffset !== undefined
        ? NURTURE_SEQUENCE.find((e) => e.sendAfterDays === parsed.data.dayOffset)
        : NURTURE_SEQUENCE[0];

      if (!email) {
        return NextResponse.json({ ok: false, error: "Email not found" }, { status: 404 });
      }

      const result = await sendNurtureEmail(lead, email);

      if (!result.success) {
        return NextResponse.json({ ok: false, error: "Failed to send email", details: result.error }, { status: 500 });
      }

      // Record sent email in qualification_data
      const qd = (leadRow.qualification_data as Record<string, unknown>) || {};
      const sentEmails = Array.isArray(qd.sentNurtureEmails) ? [...qd.sentNurtureEmails] : [];
      sentEmails.push({ emailId: email.id, sentAt: new Date().toISOString() });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (sb as any).from("leads").update({ qualification_data: { ...qd, sentNurtureEmails: sentEmails } }).eq("id", parsed.data.leadId);

      return NextResponse.json({ ok: true, message: `Email ${email.id} sent`, emailId: email.id });
    }

    // Fallback: send by direct lead data (original behavior)
    if (!parsed.data.email || !parsed.data.source) {
      return NextResponse.json({ ok: false, error: "Provide either leadId or email+source" }, { status: 400 });
    }

    lead = {
      email: parsed.data.email,
      name: parsed.data.name,
      company: parsed.data.company,
      source: parsed.data.source,
      requestedAt: new Date().toISOString(),
    };

    const welcomeEmail = NURTURE_SEQUENCE[0];
    const result = await sendNurtureEmail(lead, welcomeEmail);

    if (!result.success) {
      return NextResponse.json({ ok: false, error: "Failed to send welcome email", details: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Welcome email sent", emailId: welcomeEmail.id });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: "Internal server error", details: errorMsg }, { status: 500 });
  }
}
