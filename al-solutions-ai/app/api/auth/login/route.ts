import { NextRequest, NextResponse } from "next/server";
import { createAuthRouteClient } from "../_supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.redirect(new URL("/login", "http://localhost:3000"));
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string; mode?: "password" | "magic-link" }
    | null;
  const email = body?.email?.trim() ?? "";
  const password = body?.password ?? "";
  const mode = body?.mode ?? "password";

  if (!email || !password) {
    if (mode !== "magic-link" && !email) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }
  }

  if (mode === "magic-link") {
    const response = NextResponse.json({ ok: true, magicLinkSent: true });
    const supabase = createAuthRouteClient(request, response);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/dashboard`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return response;
  }

  // Create initial response that will have cookies set on it
  const initialResponse = NextResponse.json({ ok: true });
  const supabase = createAuthRouteClient(request, initialResponse);
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Return the original response used by the Supabase client so Set-Cookie
  // headers written by createAuthRouteClient are preserved and sent to browser.
  return initialResponse;
}
