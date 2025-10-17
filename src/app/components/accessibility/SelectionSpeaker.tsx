"use client";
import { useEffect, useRef } from "react";
import { useAccessibility } from "./AccessibilityContext";

export function SelectionSpeaker() {
  const { settings, announce } = useAccessibility();
  const lastTextRef = useRef<string>("");

  useEffect(() => {
    if (!settings.speakSelection) return;

    const onSelect = () => {
      // get visible selection
      const sel = document.getSelection();
      if (!sel) return;
      const text = sel.toString().trim();
      if (!text || text.length < 1) return;
      if (text === lastTextRef.current) return; // avoid duplicate speak
      lastTextRef.current = text;
      // speak
      if ("speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "en-US";
        // respect reduced motion/rate if user wants reduced motion: slower speech if reducedMotion true
        u.rate = settings.reducedMotion ? 0.9 : 1;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
        announce("Selected text read aloud");
      } else {
        announce("Text-to-speech not supported in this browser.");
      }
    };

    document.addEventListener("selectionchange", () => {
      // small debounce to ensure selection finished
      setTimeout(onSelect, 150);
    });

    return () => {
      // no cleanup needed for selectionchange handlers beyond removing
      document.removeEventListener("selectionchange", () => {});
    };
  }, [settings.speakSelection, settings.reducedMotion, announce]);

  return null;
}
