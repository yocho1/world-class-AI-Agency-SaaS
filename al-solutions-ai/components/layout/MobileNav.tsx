"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-expanded={open}
        aria-label="Toggle menu"
        className="rounded-md border border-border-default px-3 py-2 text-sm text-text-primary"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        Menu
      </button>
      {open ? (
        <div className="absolute inset-x-4 top-20 rounded-xl border border-border-subtle bg-bg-overlay p-4">
          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <Link href="/services">Solutions</Link>
            <Link href="/case-studies">Case Studies</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}