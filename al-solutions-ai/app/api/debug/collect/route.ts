import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Log event payload server-side for verification during local testing
    // eslint-disable-next-line no-console
    console.log("[analytics-debug] received event:", JSON.stringify(body))
    return NextResponse.json({ ok: true })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[analytics-debug] error parsing body", err)
    return new NextResponse(null, { status: 400 })
  }
}
