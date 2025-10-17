"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type ColorBlindMode =
  | "none"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";
export type AccessibilitySettings = {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusVisible: boolean;
  colorBlindMode: ColorBlindMode;
  speakSelection: boolean;
  announceErrors: boolean;
};

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  focusVisible: true,
  colorBlindMode: "none",
  speakSelection: false,
  announceErrors: true,
};

type ContextValue = {
  settings: AccessibilitySettings;
  setSettings: (patch: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  toggle: (k: keyof AccessibilitySettings) => void;
  announce: (msg: string) => void;
};

const AccessibilityContext = createContext<ContextValue | null>(null);

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setRaw] = useState<AccessibilitySettings>(() => {
    try {
      const s = localStorage.getItem("a11y:settings");
      return s ? (JSON.parse(s) as AccessibilitySettings) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("a11y:settings", JSON.stringify(settings));
      // apply classes to documentElement
      const el = document.documentElement;
      el.classList.toggle("a11y-high-contrast", settings.highContrast);
      el.classList.toggle("a11y-large-text", settings.largeText);
      el.classList.toggle("a11y-reduced-motion", settings.reducedMotion);
      el.setAttribute("data-color-blind", settings.colorBlindMode);
      if (!settings.focusVisible) {
        el.classList.add("a11y-hide-focus");
      } else {
        el.classList.remove("a11y-hide-focus");
      }
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    // keyboard shortcuts
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "s") {
        setRaw((prev) => ({ ...prev, speakSelection: !prev.speakSelection }));
        e.preventDefault();
      }
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
        // open settings — we fire an announcement which UI can listen for or button can be focused
        const evt = new CustomEvent("a11y:open-settings");
        window.dispatchEvent(evt);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const setSettings = (patch: Partial<AccessibilitySettings>) => {
    setRaw((prev) => ({ ...prev, ...patch }));
  };
  const resetSettings = () => setRaw(defaultSettings);
  const toggle = (k: keyof AccessibilitySettings) =>
    setSettings({ [k]: !(settings as any)[k] });

  // announcer
  const announce = (msg: string) => {
    const node = document.getElementById("a11y-live");
    if (node) {
      node.textContent = ""; // reset to ensure screen readers fire
      setTimeout(() => (node.textContent = msg), 100);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{ settings, setSettings, resetSettings, toggle, announce }}
    >
      {children}
      <div
        id="a11y-live"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          left: -9999,
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      />
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx)
    throw new Error(
      "useAccessibility must be used inside AccessibilityProvider"
    );
  return ctx;
};
