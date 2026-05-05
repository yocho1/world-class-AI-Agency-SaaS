import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import type { SupabaseServerClient } from "@/lib/leads";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const tenant = await getTenantForUser(user.id);
    if (!tenant) return NextResponse.json({ ok: false, error: "Tenant not found" }, { status: 403 });

    const url = new URL(request.url);
    const lead = url.searchParams.get("lead");

    const sb = supabase as SupabaseServerClient;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    let query = sb
      .from("conversations")
      .select("id, lead_id, channel, started_at, ended_at, session_id, created_at, updated_at, tenant_id")
      .or(`tenant_id.eq.${tenant.tenantId as string},and(tenant_id.is.null,created_at.gte.${sevenDaysAgoISO})`)
      .order("updated_at", { ascending: false });

    if (lead) query = query.eq("lead_id", lead);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Failed to list conversations", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
