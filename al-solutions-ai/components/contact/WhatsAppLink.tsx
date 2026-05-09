"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  buttonLocation: string;
};

export default function WhatsAppLink({ children, buttonLocation, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent("whatsapp_click", { button_location: buttonLocation });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
