import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { acceptWorkspaceInvite } from "@/lib/invites";

export async function POST(
  _request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invite = await acceptWorkspaceInvite({
      token,
      userId: user.id,
      email: user.email ?? "",
    });

    return NextResponse.json({
      ok: true,
      tenantId: invite.tenant_id,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.error("[Accept Invite Error]", error);
    
    let message = "Failed to accept invite";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      message = String((error as Record<string, unknown>).message);
    }

    return NextResponse.json(
      {
        error: message,
      },
      { status: 400 }
    );
  }
}