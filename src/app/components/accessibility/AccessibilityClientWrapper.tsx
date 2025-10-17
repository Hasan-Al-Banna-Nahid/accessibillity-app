"use client";

import dynamic from "next/dynamic";

// Dynamically import AccessibilitySettings only on client
const AccessibilitySettings = dynamic(
  () => import("./AccessibilitySettings").then((m) => m.AccessibilitySettings),
  { ssr: false }
);

export function AccessibilityClientWrapper() {
  return (
    <div
      id="a11y-panel"
      aria-hidden={false}
      className="fixed bottom-6 right-6 z-50"
    >
      <AccessibilitySettings />
    </div>
  );
}
