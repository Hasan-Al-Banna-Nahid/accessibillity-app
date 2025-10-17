"use client";
import React from "react";
import { useAccessibility } from "./AccessibilityContext";

export function AnnouncerButton() {
  const { announce } = useAccessibility();
  return (
    <button
      onClick={() =>
        announce(
          "This site supports keyboard navigation, text-to-speech and color-blind modes."
        )
      }
      className="sr-only focus:not-sr-only p-2 bg-blue-600 text-white rounded"
      aria-label="Announce accessibility features"
    >
      Announce accessibility features
    </button>
  );
}
