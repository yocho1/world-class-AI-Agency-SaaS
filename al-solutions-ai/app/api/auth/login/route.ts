import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body || {}

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
  }

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
      // Attempt to create a session via the admin API if available
      // This is a best-effort stub; for production use, use client-side auth or secure server flows.
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const { data, error } = await (supabase as any).auth.admin.createUser({
        email,
        password,
      })
      /* eslint-enable @typescript-eslint/no-explicit-any */
      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ ok: true, data })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("login error", err)
      return NextResponse.json({ error: String(err) }, { status: 500 })
    }
  }

  // Fallback mocked login
  // eslint-disable-next-line no-console
  console.warn("SUPABASE not configured — returning mocked login response")
  return NextResponse.json({ ok: true, mocked: true, token: "mock-token-123" })
}
