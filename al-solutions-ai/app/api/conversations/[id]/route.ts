import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getTenantForUser } from "@/lib/tenants";
import type { SupabaseServerClient } from "@/lib/leads";
import { completeWithOpenRouter, type ChatMessage } from "@/lib/ai/openrouter";
import { PRIMARY_MODEL, FALLBACK_MODEL } from "@/lib/ai/models";
import { SITE_ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai/prompts";

const PostMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1),
});

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

    const { data: conv, error: convErr } = await sb
      .from("conversations")
      .select("id, lead_id, channel, started_at, ended_at, session_id, created_at, updated_at, metadata, tenant_id")
      .or(orExpr)
      .maybeSingle();

    if (convErr) throw convErr;
    if (!conv) return NextResponse.json({ ok: false, error: "Conversation not found" }, { status: 404 });

    const { data: messages, error: msgErr } = await sb
      .from("messages")
      .select("id, role, content, token_count, created_at")
      .eq("conversation_id", params.id)
      .order("created_at", { ascending: true });

    if (msgErr) throw msgErr;

    return NextResponse.json({ ok: true, data: { conversation: conv, messages } });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Failed to fetch conversation", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const parsed = PostMessageSchema.parse(body);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const tenant = await getTenantForUser(user.id);
    if (!tenant) return NextResponse.json({ ok: false, error: "Tenant not found" }, { status: 403 });

    const sb = supabase as SupabaseServerClient;
    // Supabase generated types for this route are currently too strict for insert/update chaining.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sbAny = sb as any;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    const { data: conv, error: convErr } = await sb
      .from("conversations")
      .select("id, tenant_id, created_at")
      .or(`and(id.eq.${params.id},tenant_id.eq.${tenant.tenantId as string}),and(id.eq.${params.id},tenant_id.is.null,created_at.gte.${sevenDaysAgoISO}))`)
      .maybeSingle();

    if (convErr) throw convErr;
    if (!conv) return NextResponse.json({ ok: false, error: "Conversation not found" }, { status: 404 });

    const now = new Date().toISOString();
    const insert = { conversation_id: params.id, role: parsed.role, content: parsed.content, created_at: now };

    // If conversation is unclaimed, claim it for this tenant when a user posts
    const convRow = conv as unknown as { id: string; tenant_id?: string | null };
    if (!convRow.tenant_id && parsed.role === "user") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (sb as any).from("conversations").update({ tenant_id: tenant.tenantId as string, updated_at: now }).eq("id", params.id);
    }

    const { data: msg, error: insertErr } = await sbAny
      .from("messages")
      .insert(insert)
      .select("id, role, content, token_count, created_at")
      .single();

    if (insertErr) throw insertErr;

    await sbAny.from("conversations").update({ updated_at: now }).eq("id", params.id);

    if (parsed.role !== "user") {
      return NextResponse.json({ ok: true, data: { userMessage: msg, assistantMessage: null } });
    }

    const { data: config } = await sbAny
      .from("chatbot_configs")
      .select("system_prompt, enabled")
      .eq("tenant_id", tenant.tenantId as string)
      .maybeSingle();

    const isAssistantEnabled = config?.enabled !== false;
    if (!isAssistantEnabled) {
      return NextResponse.json({ ok: true, data: { userMessage: msg, assistantMessage: null } });
    }

    const { data: recentMessages, error: recentErr } = await sbAny
      .from("messages")
      .select("role, content, created_at")
      .eq("conversation_id", params.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (recentErr) throw recentErr;

    const history = (recentMessages ?? []).reverse();
    const systemPrompt = typeof config?.system_prompt === "string" && config.system_prompt.trim().length > 0
      ? config.system_prompt
      : SITE_ASSISTANT_SYSTEM_PROMPT;

    const aiMessages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...history
        .filter((m: { role: string; content: string }) =>
          m.role === "user" || m.role === "assistant" || m.role === "system"
        )
          .map((m: { role: "user" | "assistant" | "system"; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
    ];

    let assistantText: string;
    try {
      assistantText = (await completeWithOpenRouter(aiMessages, PRIMARY_MODEL, FALLBACK_MODEL)).trim();
    } catch {
      assistantText = "Thanks for the message. A specialist will follow up shortly with a detailed response.";
    }

    if (!assistantText) {
      assistantText = "Thanks for the details. Could you share your top goal so I can suggest the best next step?";
    }

    const assistantNow = new Date().toISOString();
    const { data: assistantMsg, error: assistantErr } = await sbAny
      .from("messages")
      .insert({
        conversation_id: params.id,
        role: "assistant",
        content: assistantText,
        created_at: assistantNow,
      })
      .select("id, role, content, token_count, created_at")
      .single();

    if (assistantErr) throw assistantErr;

    await sbAny.from("conversations").update({ updated_at: assistantNow }).eq("id", params.id);

    return NextResponse.json({ ok: true, data: { userMessage: msg, assistantMessage: assistantMsg } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Invalid payload", details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Failed to post message", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
