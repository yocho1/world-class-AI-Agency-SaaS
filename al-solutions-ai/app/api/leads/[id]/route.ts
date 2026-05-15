import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseServerClient } from "@/lib/leads";
import type { Database } from "@/types/database";
import { getTenantForUser } from "@/lib/tenants";

const UpdateLeadSchema = z.object({
  status: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  industry: z.string().min(1).optional(),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
});

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const parsed = UpdateLeadSchema.parse(body);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const tenant = await getTenantForUser(user.id);
    if (!tenant) return NextResponse.json({ ok: false, error: "Tenant not found" }, { status: 403 });

    // allow lead if it belongs to tenant OR is unclaimed (tenant_id IS NULL) but recent (last 7 days)
    const sb = supabase as SupabaseServerClient;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    // build OR condition: either tenant_id matches OR (tenant_id IS NULL AND created_at >= sevenDaysAgo)
    const orExpr = `and(id.eq.${params.id},tenant_id.eq.${tenant.tenantId as string})` +
      `,and(id.eq.${params.id},tenant_id.is.null,created_at.gte.${sevenDaysAgoISO})`;

    const { data: lead, error: fetchError } = await sb
      .from("leads")
      .select("id, tenant_id, qualification_data")
      .or(orExpr)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!lead) return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });
    const leadRow = lead as unknown as { id: string; tenant_id?: string | null };

    const updates: Partial<Database["public"]["Tables"]["leads"]["Update"]> = {};
    if (parsed.status) updates.status = parsed.status;
    if (parsed.name) updates.name = parsed.name;
    if (parsed.company) updates.company = parsed.company;
    if (parsed.industry) updates.industry = parsed.industry;

    // Merge notes and followUpDate into qualification_data without overwriting existing data
    const qualificationData: Record<string, unknown> = { ...(leadRow as unknown as Record<string, unknown>).qualification_data || {} };
    if (parsed.notes !== undefined) qualificationData.notes = parsed.notes;
    if (parsed.followUpDate !== undefined) qualificationData.followUpDate = parsed.followUpDate;
    if (Object.keys(qualificationData).length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updates as any).qualification_data = qualificationData;
    }

    // If lead was unclaimed, claim it for this tenant when updating
    if (!leadRow.tenant_id) {
      updates.tenant_id = tenant.tenantId as string;
    }
    updates.updated_at = new Date().toISOString();
    // Supabase generated types for this update path are currently too strict.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sbAny = sb as any;
    const { data: updated, error: updateError } = await sbAny
      .from("leads")
      .update(updates)
      .eq("id", params.id)
      .select("id, name, email, company, industry, status, budget_range, timeline, messages_sent, chat_initiated, source, lead_captured_at, qualification_data, created_at, updated_at, tenant_id")
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Invalid payload", details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Failed to update lead", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const tenant = await getTenantForUser(user.id);
    if (!tenant) return NextResponse.json({ ok: false, error: "Tenant not found" }, { status: 403 });

    const sb = supabase as SupabaseServerClient;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    const orExpr = `and(id.eq.${params.id},tenant_id.eq.${tenant.tenantId as string})` +
      `,and(id.eq.${params.id},tenant_id.is.null,created_at.gte.${sevenDaysAgoISO})`;

    const { data, error } = await sb
      .from("leads")
      .select("id, name, email, company, industry, status, budget_range, timeline, messages_sent, chat_initiated, source, lead_captured_at, qualification_data, created_at, updated_at, tenant_id")
      .or(orExpr)
      .maybeSingle();

    if (error) throw error;
    if (!data) return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Failed to fetch lead", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const tenant = await getTenantForUser(user.id);
    if (!tenant) return NextResponse.json({ ok: false, error: "Tenant not found" }, { status: 403 });

    const sb = supabase as SupabaseServerClient;
    const { data: lead, error: fetchError } = await sb
      .from("leads")
      .select("id")
      .eq("id", params.id)
      .eq("tenant_id", tenant.tenantId as string)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!lead) return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });

    const { error } = await sb.from("leads").delete().eq("id", params.id);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Failed to delete lead", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
