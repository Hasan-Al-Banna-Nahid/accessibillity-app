"use client";

import { useEffect, useRef, useState } from "react";
import { MicButton } from "./MicButton";
import { TranscriptBox } from "./TranscriptBox";

export function SpeechToText() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const text = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(text);
      };

      recognition.onerror = (e) => {
        console.error("Recognition error:", e.error);
        setListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <div
      className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 mt-8 focus-within:ring-2 focus-within:ring-blue-500"
      role="region"
      aria-label="Speech to text tool"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        🎧 Accessible Speech to Text
      </h2>

      <MicButton listening={listening} onToggle={toggleListening} />
      <TranscriptBox transcript={transcript} onChange={setTranscript} />
    </div>
  );
}
