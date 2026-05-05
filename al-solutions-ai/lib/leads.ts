import type { createClient } from "@/lib/supabase/server";

export type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export interface LeadCapturePayload {
  email?: string | null;
  source?: string;
  name?: string | null;
  company?: string | null;
  industry?: string | null;
  budgetRange?: string | null;
  timeline?: string | null;
  teamSize?: string | null;
  sessionId?: string | null;
  conversationId?: string | null;
  messagesSent?: number | null;
  qualificationData?: Record<string, unknown>;
  tenantId?: string | null;
}

export function extractEmail(text: string): string | null {
  const match = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
  return match ? match[0].toLowerCase() : null;
}

export async function persistLeadCapture(
  supabase: SupabaseServerClient,
  payload: LeadCapturePayload
): Promise<{ leadId: string; created: boolean }> {
  const now = new Date().toISOString();
  const email = payload.email?.trim().toLowerCase() || null;

  // Keep qualification data together so the dashboard can evolve without schema churn.
  const qualificationData = {
    ...(payload.qualificationData ?? {}),
    sessionId: payload.sessionId ?? null,
    conversationId: payload.conversationId ?? null,
    teamSize: payload.teamSize ?? null,
  };

  // Try to find existing lead by email (if provided) or by sessionId/conversationId
  let existingResult: { data?: { id: string; messages_sent?: number | null }; error?: unknown } =
    { data: undefined };

  if (email) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    existingResult = await (supabase as any)
      .from("leads")
      .select("id, messages_sent")
      .eq("email", email)
      .maybeSingle();

    if (existingResult.error) {
      throw existingResult.error;
    }
  } else if (payload.conversationId) {
    // If no email, try to find by conversation ID
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    existingResult = await (supabase as any)
      .from("leads")
      .select("id, messages_sent")
      .eq("qualification_data->conversationId", `"${payload.conversationId}"`)
      .maybeSingle();

    if (existingResult.error) {
      // Not an error if not found, just continue
      existingResult = { data: undefined };
    }
  }

  const upsertValues = {
    source: payload.source ?? "chat",
    name: payload.name?.trim() || null,
    email: email,
    company: payload.company?.trim() || null,
    industry: payload.industry?.trim() || null,
    budget_range: payload.budgetRange?.trim() || null,
    timeline: payload.timeline?.trim() || null,
    qualification_data: qualificationData,
    chat_initiated: true,
    messages_sent: payload.messagesSent ?? 0,
    lead_captured_at: now,
    status: "new",
    updated_at: now,
    tenant_id: payload.tenantId || null,
  };

  if (existingResult.data?.id) {
    // Update existing lead
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("leads")
      .update({
        ...upsertValues,
        messages_sent: Math.max(
          existingResult.data.messages_sent ?? 0,
          payload.messagesSent ?? 0
        ),
      })
      .eq("id", existingResult.data.id)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    if (payload.conversationId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from("conversations")
        .update({ lead_id: data.id, updated_at: now })
        .eq("id", payload.conversationId);
    }

    return { leadId: data.id as string, created: false };
  }

  // Create new lead (email can be null for high-intent captures without email yet)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("leads")
    .insert(upsertValues)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  if (payload.conversationId) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("conversations")
      .update({ lead_id: data.id, updated_at: now })
      .eq("id", payload.conversationId);
  }

  return { leadId: data.id as string, created: true };
}