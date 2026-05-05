import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import type { Database } from "@/types/database";

type AnalyticsEventInsert = Database["public"]["Tables"]["analytics_events"]["Insert"];
type AnalyticsEventProperties = Database["public"]["Tables"]["analytics_events"]["Row"]["event_properties"];

type AnalyticsServiceClient = {
  from(table: "analytics_events"): {
    insert(values: AnalyticsEventInsert | AnalyticsEventInsert[]): Promise<{ error: Error | null }>;
  };
};

const AnalyticsEventSchema = z.object({
  event_name: z.string().min(1).max(100),
  page: z.string().max(200).nullable().optional(),
  tenant_id: z.string().uuid().nullable().optional(),
  session_id: z.string().max(128).nullable().optional(),
  event_properties: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = AnalyticsEventSchema.parse(body);
    const supabase = createSupabaseServiceClient() as unknown as AnalyticsServiceClient;

    const { error } = await supabase.from("analytics_events").insert({
      tenant_id: payload.tenant_id ?? null,
      event_name: payload.event_name,
      event_properties: (payload.event_properties ?? {}) as AnalyticsEventProperties,
      session_id: payload.session_id ?? null,
      page: payload.page ?? null,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid analytics payload", details: error.errors },
        { status: 400 }
      );
    }

    console.error("[analytics] failed to collect event", error);
    return NextResponse.json({ ok: false, error: "Failed to collect analytics event" }, { status: 500 });
  }
}