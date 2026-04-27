"use client"
import { useState } from "react"
import Link from "next/link"
import { Button, Card, Input } from "@/components/ui"

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const form = new FormData(e.currentTarget)
    const payload = {
      fullName: String(form.get("full-name") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Signup failed")
      setMessage(json.mocked ? "Signup simulated (no Supabase configured)" : "Account created — check your email")
    } catch (err: unknown) {
      let msg = "Unknown error"
      if (err && typeof err === "object" && "message" in err) {
        const maybe = (err as { message?: unknown }).message
        if (typeof maybe === "string") msg = maybe
      } else if (typeof err === "string") {
        msg = err
      }
      setMessage(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Create your workspace</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Start your AI client portal in minutes.</h1>
        <p className="mt-4 max-w-lg text-text-secondary">
          Set up your account, define the first workspace, and ship a branded AI experience without waiting on an implementation backlog.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-text-secondary">
          <li>• One dashboard for leads, conversations, and analytics</li>
          <li>• Fast onboarding for founder, ops, and delivery teams</li>
          <li>• Ready for multi-tenant expansion when you are</li>
        </ul>
      </section>

      <Card className="self-center bg-bg-overlay/70 p-8 sm:p-10">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="full-name">
              Full name
            </label>
            <Input id="full-name" name="full-name" placeholder="Alex Morgan" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="company">
              Company
            </label>
            <Input id="company" name="company" placeholder="AL Solutions AI" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="email">
              Work email
            </label>
            <Input id="email" name="email" placeholder="you@company.com" type="email" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="password">
              Password
            </label>
            <Input id="password" name="password" placeholder="Create a secure password" type="password" required />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create account"}
          </Button>
        </form>
        {message ? <p className="mt-4 text-center text-sm text-text-secondary">{message}</p> : null}
        <p className="mt-5 text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <Link className="font-medium text-accent-400 hover:text-accent-300" href="/login">
            Sign in
          </Link>
        </p>
      </Card>
    </>
  )
}