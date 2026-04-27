import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: true, message: "Leads endpoint wired in Sprint 1." });
}