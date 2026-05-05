import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { persistLeadCapture } from "@/lib/leads";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import type { Database } from "@/types/database";

type TenantIdRow = Pick<Database["public"]["Tables"]["tenants"]["Row"], "id">;

type AuditAnalyticsInsert = Database["public"]["Tables"]["analytics_events"]["Insert"];

type AuditServiceClient = {
  from(table: "analytics_events"): {
    insert(values: AuditAnalyticsInsert | AuditAnalyticsInsert[]): Promise<{ error: Error | null }>;
  };
};

const AuditRequestSchema = z.object({
  name: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  email: z.string().email(),
  goal: z.string().min(3).max(500),
  workspace_id: z.string().uuid().optional(),
});

/**
 * POST /api/audit
 * Handles free audit form submissions and captures leads
 * Accepts optional workspace_id to associate lead with a tenant
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const payload = AuditRequestSchema.parse(body);

    // Get Supabase client
    let supabase;
    try {
      supabase = await createClient();
    } catch (err) {
      console.error("Supabase client not available:", err);
      return NextResponse.json(
        { error: "Service unavailable" },
        { status: 503 }
      );
    }

    // If workspace_id is provided, verify it exists
    let tenantId: string | undefined;
    if (payload.workspace_id) {
      const { data: tenant, error: tenantError } = await supabase
        .from("tenants")
        .select("id")
        .eq("id", payload.workspace_id)
        .maybeSingle();

      const tenantRow = tenant as TenantIdRow | null;

      if (tenantError) {
        console.error("Failed to verify workspace:", tenantError);
      } else if (tenantRow) {
        tenantId = tenantRow.id;
      }
    }

    // Persist the lead
    try {
      const result = await persistLeadCapture(supabase, {
        name: payload.name,
        email: payload.email,
        company: payload.company,
        source: "free_audit_form",
        qualificationData: {
          audit_goal: payload.goal,
          audit_requested_at: new Date().toISOString(),
          workspace_id: payload.workspace_id || null,
        },
        tenantId,
      });

      try {
        const analyticsClient = createSupabaseServiceClient() as unknown as AuditServiceClient;
        const { error: analyticsError } = await analyticsClient.from("analytics_events").insert({
          tenant_id: tenantId ?? null,
          event_name: "audit_requested",
          event_properties: {
            source: "free_audit_form",
            company: payload.company,
            email: payload.email,
            goal: payload.goal,
            workspace_id: payload.workspace_id || null,
          },
          page: "/free-ai-audit",
          session_id: null,
        });

        if (analyticsError) {
          console.error("Failed to persist analytics event:", analyticsError);
        }
      } catch (analyticsInsertError) {
        console.error("Failed to persist analytics event:", analyticsInsertError);
      }

      return NextResponse.json(
        {
          success: true,
          leadId: result.leadId,
          message: "Audit request received",
        },
        { status: 200 }
      );
    } catch (err) {
      console.error("Failed to persist lead:", err);
      return NextResponse.json(
        { error: "Failed to process request. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request format",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Audit API error:", error);
    return NextResponse.json(
      { error: "An error occurred processing your request" },
      { status: 500 }
    );
  }
}