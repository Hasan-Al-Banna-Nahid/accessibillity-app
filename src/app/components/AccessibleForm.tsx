"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAccessibility } from "./accessibility/AccessibilityContext";

type FormValues = {
  name: string;
  message: string;
};

export function AccessibleForm() {
  // ✅ Always call useForm() at the top level, never conditionally
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const { announce } = useAccessibility();

  // ✅ Stable callback (does not change between renders)
  // inside AccessibleForm component (useAccessibility imported)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    announce(`Thanks ${data.name}. Your message was sent.`);
    reset();
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      const firstError = Object.values(errors)[0] as any;
      announce(firstError.message);
    }
  }, [errors, announce]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-white p-6 rounded-2xl shadow-lg mt-4 space-y-4"
      aria-labelledby="contact-form-heading"
    >
      <h2 id="contact-form-heading" className="text-xl font-semibold">
        Contact Form
      </h2>

      {/* ✅ Name field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-600"
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-red-600 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* ✅ Message field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          {...register("message", { required: "Message cannot be empty" })}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-600"
          rows={3}
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="text-red-600 text-sm mt-1"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* ✅ Submit button */}
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded-md focus:ring-4 focus:ring-blue-400"
      >
        Submit
      </button>
    </form>
  );
}
