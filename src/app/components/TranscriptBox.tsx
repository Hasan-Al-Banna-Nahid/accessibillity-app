"use client";

interface TranscriptBoxProps {
  transcript: string;
  onChange: (val: string) => void;
}

export function TranscriptBox({ transcript, onChange }: TranscriptBoxProps) {
  return (
    <div className="mt-4">
      <label
        htmlFor="transcript"
        className="block text-gray-700 font-medium mb-1"
      >
        Live Transcript
      </label>
      <textarea
        id="transcript"
        value={transcript}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Your speech will appear here..."
        aria-live="polite"
      />
    </div>
  );
}
