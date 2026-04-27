"use client";

import { useState } from "react";

export function useLeadCapture() {
  const [captured, setCaptured] = useState(false);

  return {
    captured,
    markCaptured: () => setCaptured(true),
  };
}