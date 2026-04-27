import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface py-10">
      <div className="container flex flex-col gap-5 text-sm text-text-secondary md:flex-row md:items-center md:justify-between">
        <p>AL Solutions AI. Real AI products shipped in 30 days.</p>
        <div className="flex gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}