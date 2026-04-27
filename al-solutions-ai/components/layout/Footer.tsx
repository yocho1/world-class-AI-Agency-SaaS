import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface py-12">
      <div className="container grid gap-8 text-sm text-text-secondary md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <p className="text-base font-medium text-text-primary">AL Solutions AI</p>
          <p className="mt-3 max-w-md">Real AI products shipped in 30 days for growth teams that want results, not slide decks.</p>
          <Link className="mt-5 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300" href="/free-ai-audit">
            Book your free audit
          </Link>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">Company</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/case-studies">Case Studies</Link>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">Legal</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}