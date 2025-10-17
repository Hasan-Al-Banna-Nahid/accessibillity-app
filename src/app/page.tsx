"use client";
import { AccessibleForm } from "@/app/components/AccessibleForm";
import { SpeechToText } from "@/app/components/SpeechToText";
import { TextToSpeech } from "@/app/components/TextToSpeech";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <h1 className="text-3xl font-bold">Accessible Communication Portal</h1>
      <p className="text-gray-700">
        This demo showcases accessibility for both hearing and visually impaired
        users using WCAG-compliant techniques.
      </p>

      <section aria-labelledby="speech-to-text-section">
        <h2 id="speech-to-text-section" className="text-2xl font-semibold mt-8">
          🎙️ Speech to Text (for Deaf Users)
        </h2>
        <SpeechToText />
      </section>

      <section aria-labelledby="text-to-speech-section">
        <h2 id="text-to-speech-section" className="text-2xl font-semibold mt-8">
          🗣️ Text to Speech (for Blind Users)
        </h2>
        <TextToSpeech />
      </section>

      <section aria-labelledby="contact-form-section">
        <h2 id="contact-form-section" className="text-2xl font-semibold mt-8">
          💬 Accessible Feedback Form
        </h2>
        <AccessibleForm />
      </section>
    </motion.div>
  );
}
