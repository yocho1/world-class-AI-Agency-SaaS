import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

type AnalyticsSampleRow = {
  id: string;
  tenant_id: string | null;
  event_name: string;
  page: string | null;
  session_id: string | null;
  created_at: string;
};

export async function GET() {
  try {
    const supabase = createSupabaseServiceClient();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from("analytics_events")
      .select("id, tenant_id, event_name, page, session_id, created_at")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("[analytics/sample] supabase error", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Provide simple aggregates useful for validation
    const rows = (data ?? []) as AnalyticsSampleRow[];
    const total = rows.length;
    const pageViews = rows.filter((r) => r.event_name === "page_viewed").length;
    const sessions = new Set(rows.map((r) => r.session_id).filter((sessionId): sessionId is string => Boolean(sessionId)));

    return NextResponse.json({ ok: true, total, pageViews, uniqueSessionCount: sessions.size, rows });
  } catch (err) {
    console.error("[analytics/sample] failed", err);
    return NextResponse.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}
