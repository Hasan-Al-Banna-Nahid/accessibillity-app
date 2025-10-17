"use client";
import { Mic, Square } from "lucide-react";

interface MicButtonProps {
  listening: boolean;
  onToggle: () => void;
}

export function MicButton({ listening, onToggle }: MicButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        listening
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      aria-pressed={listening}
      aria-label={listening ? "Stop listening" : "Start listening"}
    >
      {listening ? <Square size={20} /> : <Mic size={20} />}
      {listening ? "Stop Listening" : "Start Listening"}
    </button>
  );
}
