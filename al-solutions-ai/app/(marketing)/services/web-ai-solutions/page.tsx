import Link from "next/link";
import { Card } from "@/components/ui";

export default function WebAISolutionsPage() {
  return (
    <main className="container py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-400">Web + AI Solutions</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-text-primary md:text-5xl">Bundle the website and AI layer into one conversion system.</h1>
        <p className="mt-4 text-text-secondary">For teams that want a better front door and a smarter sales engine, delivered together instead of in separate projects.</p>
      </div>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <Card>
          <h2 className="text-xl font-medium text-text-primary">Why bundle it</h2>
          <div className="mt-5 space-y-3 text-sm text-text-secondary">
            <p>• The site and AI workflow share the same message hierarchy.</p>
            <p>• Tracking and lead capture are designed together.</p>
            <p>• You avoid fragmentation between web dev and AI vendors.</p>
          </div>
          <Link className="mt-8 inline-flex h-11 items-center rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700" href="/free-ai-audit">
            Scope a bundle
          </Link>
        </Card>

        <Card className="bg-bg-overlay/70">
          <p className="text-sm text-text-tertiary">Bundle contents</p>
          <div className="mt-4 space-y-3 text-sm text-text-secondary">
            <p>• Marketing site and conversion pages</p>
            <p>• Embedded AI demo or chatbot</p>
            <p>• Analytics, events, and lead routing</p>
          </div>
        </Card>
      </section>
    </main>
  );
}