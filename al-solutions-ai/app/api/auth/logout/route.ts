import { NextRequest, NextResponse } from "next/server";
import { createAuthRouteClient } from "../_supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.redirect(new URL("/dashboard", "http://localhost:3000"));
}

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const supabase = createAuthRouteClient(request, response);
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return response;
}