import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { persistLeadCapture, type SupabaseServerClient } from "@/lib/leads";
import { getTenantForUser } from "@/lib/tenants";

const LeadRequestSchema = z.object({
  email: z.string().email(),
  source: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  industry: z.string().min(1).optional(),
  budgetRange: z.string().min(1).optional(),
  timeline: z.string().min(1).optional(),
  teamSize: z.string().min(1).optional(),
  sessionId: z.string().min(1).optional(),
  conversationId: z.string().min(1).optional(),
  messagesSent: z.number().int().nonnegative().optional(),
  qualificationData: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = LeadRequestSchema.parse(body);
    const supabase = await createClient();

    const result = await persistLeadCapture(supabase, parsed);

    return NextResponse.json({
      ok: true,
      leadId: result.leadId,
      created: result.created,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid lead payload", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to capture lead",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const page = Math.max(1, parseInt(params.get("page") || "1", 10));
    const limit = Math.min(200, Math.max(1, parseInt(params.get("limit") || "20", 10)));
    const offset = (page - 1) * limit;
    const search = params.get("search") || "";
    const status = params.get("status");
    const sort = params.get("sort") || "created_at.desc";
    const format = params.get("format") || "json";

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const tenant = await getTenantForUser(user.id);
    if (!tenant) {
      return NextResponse.json({ ok: false, error: "Tenant not found" }, { status: 403 });
    }

    const sb = supabase as SupabaseServerClient;

    // Calculate 7 days ago for unclaimed leads
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    let query = sb
      .from("leads")
      .select("id, name, email, company, industry, status, created_at, updated_at", { count: "exact" })
      .or(`tenant_id.eq.${tenant.tenantId as string},and(tenant_id.is.null,created_at.gte.${sevenDaysAgoISO})`);

    if (status) {
      query = query.eq("status", status);
    }

    if (search) {
      const like = `%${search.replace(/%/g, "\\%")}%`;
      query = query.or(`name.ilike.${like},email.ilike.${like},company.ilike.${like}`);
    }

    // sort parsing
    const [col, dir] = sort.split(".");
    query = query.order(col || "created_at", { ascending: dir !== "desc" ? true : false });

    if (format === "csv") {
      // fetch all matching rows (limit to 10k)
      const { data, error } = await query.limit(10000).range(0, 10000 - 1);
      if (error) throw error;
      const rows = (data ?? []) as Array<Record<string, unknown>>;
      const headers = ["id", "name", "email", "company", "industry", "status", "created_at", "updated_at"];
      const csv = [headers.join(",")].concat(
        rows.map((r) =>
          headers.map((h) => {
            const raw = r[h] ?? "";
            const v = typeof raw === "string" ? raw : String(raw);
            const cell = v.replace(/"/g, '""');
            return `"${cell}"`;
          }).join(",")
        )
      ).join("\n");

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="leads-${tenant.tenantId}.csv"`,
        },
      });
    }

    // pagination
    const { data, error, count } = await query.range(offset, offset + limit - 1);
    if (error) throw error;

    return NextResponse.json({ ok: true, data: data ?? [], count: count ?? 0, page, limit });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Failed to fetch leads", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}