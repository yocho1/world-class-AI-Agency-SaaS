"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

type CalendlyEmbedProps = {
  url: string;
  height?: number;
};

function ensureCalendlyScript() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export default function CalendlyEmbed({ url, height = 700 }: Readonly<CalendlyEmbedProps>) {
  useEffect(() => {
    ensureCalendlyScript();
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: "320px", height: `${height}px` }}
    />
  );
}
