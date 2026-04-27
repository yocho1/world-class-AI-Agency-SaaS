import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password, fullName, company } = body || {}

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
  }

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
      // Use admin API to create a user when service role key is available
      // Note: This requires a service role key in environment variables.
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const resp = await (supabase as any).auth.admin.createUser({
        email,
        password,
        user_metadata: { fullName, company },
      })
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return NextResponse.json({ ok: true, data: resp })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("signup error", err)
      return NextResponse.json({ error: String(err) }, { status: 500 })
    }
  }

  // Fallback: stubbed response for local/dev when Supabase is not configured
  // eslint-disable-next-line no-console
  console.warn("SUPABASE not configured — returning mocked signup response")
  return NextResponse.json({ ok: true, mocked: true, email })
}
