import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNurtureEmail, NURTURE_SEQUENCE, type NurtureLead } from "@/lib/email/nurture";

const scheduleSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  company: z.string().optional(),
  source: z.enum(["audit_request", "chatbot", "contact_form", "newsletter"]),
  requestedAt: z.string().datetime(),
  dayOffset: z.number().int().min(0).max(30),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = scheduleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { dayOffset, ...leadData } = parsed.data;
    const lead: NurtureLead = {
      ...leadData,
      requestedAt: leadData.requestedAt,
    };

    // Find the email that matches this day offset
    const email = NURTURE_SEQUENCE.find((e) => e.sendAfterDays === dayOffset);

    if (!email) {
      return NextResponse.json(
        { error: `No nurture email configured for day offset ${dayOffset}` },
        { status: 404 }
      );
    }

    const result = await sendNurtureEmail(lead, email);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send nurture email", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Nurture email ${email.id} sent (day ${dayOffset})`,
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Internal server error", details: errorMsg }, { status: 500 });
  }
}
