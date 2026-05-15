import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNurtureEmail, NURTURE_SEQUENCE, type NurtureLead } from "@/lib/email/nurture";

const triggerSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  company: z.string().optional(),
  source: z.enum(["audit_request", "chatbot", "contact_form", "newsletter"]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = triggerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const lead: NurtureLead = {
      ...parsed.data,
      requestedAt: new Date().toISOString(),
    };

    // Send welcome email (day 0) immediately
    const welcomeEmail = NURTURE_SEQUENCE[0];
    const result = await sendNurtureEmail(lead, welcomeEmail);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send welcome email", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Nurture sequence triggered. Welcome email sent.",
      sequenceLength: NURTURE_SEQUENCE.length,
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Internal server error", details: errorMsg }, { status: 500 });
  }
}
