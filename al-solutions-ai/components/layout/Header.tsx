import Link from "next/link";
import { Button } from "@/components/ui";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-bg-base/95 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link className="text-sm font-medium tracking-wide text-text-primary" href="/">
          AL Solutions AI
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-text-secondary md:flex">
          <Link href="/services">Solutions</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
        </nav>
        <Button className="hidden md:inline-flex">Get Free AI Audit</Button>
      </div>
    </header>
  );
}