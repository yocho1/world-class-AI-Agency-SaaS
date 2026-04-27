"use client"
import { useState } from "react"
import Link from "next/link"
import { Button, Card, Input } from "@/components/ui"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const form = new FormData(e.currentTarget)
    const payload = {
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Login failed")
      setMessage(json.mocked ? "Login simulated (no Supabase configured)" : "Signed in")
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
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Welcome back</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Sign in to your AI operations workspace.</h1>
        <p className="mt-4 max-w-lg text-text-secondary">
          Review leads, monitor conversations, and keep your launch pipeline moving from one secure place.
        </p>
      </section>

      <Card className="self-center bg-bg-overlay/70 p-8 sm:p-10">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="login-email">
              Work email
            </label>
            <Input id="login-email" name="email" placeholder="you@company.com" type="email" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary" htmlFor="login-password">
              Password
            </label>
            <Input id="login-password" name="password" placeholder="Your password" type="password" required />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        {message ? <p className="mt-4 text-center text-sm text-text-secondary">{message}</p> : null}
        <div className="mt-5 flex items-center justify-between text-sm text-text-secondary">
          <Link className="hover:text-text-primary" href="/signup">
            Create account
          </Link>
          <Link className="hover:text-text-primary" href="/free-ai-audit">
            Book audit instead
          </Link>
        </div>
      </Card>
    </>
  )
}