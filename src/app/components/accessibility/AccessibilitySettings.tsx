"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccessibility } from "./AccessibilityContext";

type FormValues = {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusVisible: boolean;
  colorBlindMode: string;
  speakSelection: boolean;
  announceErrors: boolean;
};

export function AccessibilitySettings() {
  const { settings, setSettings, resetSettings, announce } = useAccessibility();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: settings,
  });

  useEffect(() => reset(settings), [settings, reset]);

  const onSubmit = (data: FormValues) => {
    setSettings(data);
    announce("Accessibility settings updated.");
  };

  return (
    <section
      aria-labelledby="a11y-settings-heading"
      className="bg-white p-4 rounded-lg shadow-sm max-w-lg mx-auto"
    >
      <h3 id="a11y-settings-heading" className="text-lg font-semibold mb-2">
        Accessibility Settings
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" {...register("highContrast")} /> High contrast
          (WCAG AA)
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" {...register("largeText")} /> Large text
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" {...register("reducedMotion")} /> Reduce motion
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" {...register("focusVisible")} /> Visible focus
          outlines
        </label>

        <div>
          <label className="block mb-1">Color-blind mode</label>
          <select
            {...register("colorBlindMode")}
            className="border rounded p-1"
          >
            <option value="none">None</option>
            <option value="protanopia">Protanopia</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="tritanopia">Tritanopia</option>
            <option value="achromatopsia">Achromatopsia (grayscale)</option>
          </select>
        </div>

        <label className="flex items-center gap-3">
          <input type="checkbox" {...register("speakSelection")} /> Speak
          selected text
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" {...register("announceErrors")} /> Announce
          form errors
        </label>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="px-3 py-1 bg-blue-700 text-white rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              resetSettings();
              announce("Accessibility settings reset to defaults.");
            }}
            className="px-3 py-1 border rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
