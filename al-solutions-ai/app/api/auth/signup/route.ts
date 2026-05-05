import { NextRequest, NextResponse } from "next/server";
import { createAuthRouteClient, createServiceRoleAuthClient } from "../_supabase";
import { ensureTenantForUser } from "@/lib/tenants";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.redirect(new URL("/signup", "http://localhost:3000"));
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as
      | { email?: string; password?: string; fullName?: string; company?: string }
      | null;
    const email = body?.email?.trim() ?? "";
    const password = body?.password ?? "";
    const fullName = body?.fullName?.trim() ?? "";
    const company = body?.company?.trim() ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const initialResponse = NextResponse.json({ ok: true });
    const supabase = createAuthRouteClient(request, initialResponse);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company,
        },
        emailRedirectTo: `${request.nextUrl.origin}/dashboard`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const user = data.user;

    if (user) {
      try {
        const serviceClient = createServiceRoleAuthClient();
        await ensureTenantForUser({
          userId: user.id,
          email,
          fullName: fullName || null,
          company: company || null,
        });

        const { error: profileError } = await serviceClient.auth.admin.updateUserById(user.id, {
          user_metadata: {
            full_name: fullName,
            company,
          },
        });

        if (profileError) {
          return NextResponse.json({ error: profileError.message }, { status: 400 });
        }

      } catch (provisioningError) {
        console.warn("Workspace provisioning failed during signup", provisioningError);
      }
    }

    // Return the original response so Set-Cookie headers from Supabase are preserved
    return initialResponse;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
