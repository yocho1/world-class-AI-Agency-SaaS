"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = {
  href: string;
  buttonLocation: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export default function AuditCtaLink({ href, buttonLocation, className, ariaLabel, children }: Props) {
  const handleClick = () => {
    trackEvent("audit_cta_click", { button_location: buttonLocation });
  };

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
