"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import { useAccessibility } from "./accessibility/AccessibilityContext";

export function TextToSpeech() {
  const [text, setText] = useState("");
  const { settings, announce } = useAccessibility();

  const handleSpeak = (t = text) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech not supported");
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "en-US";
    u.rate = settings.reducedMotion ? 0.9 : 1;
    speechSynthesis.speak(u);
    announce("Reading text aloud");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to read aloud..."
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
        aria-label="Text to read aloud"
      />
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => handleSpeak()}
          className="btn-primary px-4 py-2 rounded-md focus:ring-2"
        >
          <Play className="w-5 h-5 inline-block" /> Read Aloud
        </button>
        <button
          onClick={() => handleSpeak(window.getSelection()?.toString() || "")}
          className="px-3 py-2 border rounded"
        >
          Read Selection
        </button>
      </div>
    </div>
  );
}
