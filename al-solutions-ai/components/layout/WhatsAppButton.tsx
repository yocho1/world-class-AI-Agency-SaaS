"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL =
  "https://wa.me/212674147995?text=Hi%2C%20I%27d%20like%20to%20learn%20about%20your%20AI%20services";
const HIDE_KEY = "whatsappButtonHiddenUntil";
const HIDE_DURATION_MS = 1000 * 60 * 60 * 24;

function isDesktopWidth() {
  return window.matchMedia("(min-width: 768px)").matches;
}

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const hiddenUntil = useMemo(() => {
    if (typeof window === "undefined") return 0;

    const stored = window.sessionStorage.getItem(HIDE_KEY);
    if (!stored) return 0;

    const timestamp = Number(stored);
    if (!Number.isFinite(timestamp)) return 0;

    return timestamp + HIDE_DURATION_MS;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateVisibility = () => {
      const now = Date.now();
      const shouldHideFor24h = hiddenUntil > now;
      const desktop = isDesktopWidth();

      setIsDesktop(desktop);

      if (shouldHideFor24h) {
        setIsVisible(false);
        return;
      }

      if (!desktop) {
        setIsVisible(true);
        return;
      }

      setIsVisible(window.scrollY >= 200);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [hiddenUntil]);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      trackEvent("whatsapp_click", { button_location: "floating_button" });
      window.sessionStorage.setItem(HIDE_KEY, String(Date.now()));
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <a
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 left-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-base focus:ring-[#25D366]"
      href={WHATSAPP_URL}
      onClick={handleClick}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <svg aria-hidden="true" className="h-7 w-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.52 3.48A11.79 11.79 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.15 1.6 5.95L0 24l6.27-1.65a11.98 11.98 0 0 0 5.77 1.48h.01c6.58 0 11.94-5.36 11.94-11.95 0-3.19-1.24-6.19-3.47-8.4Zm-8.48 18.34h-.01a9.92 9.92 0 0 1-5.06-1.39l-.36-.22-3.72.98 1-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.24C2.13 6.2 6.1 2.24 12.04 2.24c2.65 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 7.03c0 5.94-3.96 10.98-9.9 10.98Zm5.75-7.86c-.31-.16-1.84-.91-2.13-1.02-.29-.11-.5-.16-.72.16-.21.31-.82 1.02-1 1.23-.18.21-.36.24-.67.08-.31-.16-1.3-.48-2.48-1.52-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.54-.08-.16-.72-1.72-.99-2.36-.26-.63-.53-.54-.72-.55l-.62-.01c-.21 0-.54.08-.82.39-.29.31-1.1 1.08-1.1 2.64 0 1.56 1.13 3.07 1.28 3.28.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.84-.75 2.1-1.47.26-.72.26-1.35.18-1.47-.08-.13-.29-.21-.6-.37Z" />
      </svg>

      <span className="pointer-events-none absolute bottom-full left-0 mb-2 hidden rounded-md bg-bg-overlay px-2 py-1 text-xs font-medium text-white shadow-md group-hover:block group-focus:block">
        Chat on WhatsApp
      </span>

      {isDesktop ? null : null}
    </a>
  );
}
