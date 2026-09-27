"use client";

import { useState, type FormEvent } from "react";
import { projectTypes } from "@/lib/validations/contact";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
      company: formData.get("company"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't reach the server. Please check your connection and try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold-500/30 bg-gold-300/10 p-8 text-center">
        <p className="font-display text-xl font-semibold text-brand-900">
          Thank you — your message is in.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          We typically respond within one business day. For anything urgent,
          feel free to call or WhatsApp us directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-gold-700 hover:text-gold-600"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot field — hidden from real visitors via CSS, not display:none, to deter form-filling bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            className="mt-1.5 w-full rounded-lg border border-brand-900/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-brand-900/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            Phone <span className="text-ink-soft">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1.5 w-full rounded-lg border border-brand-900/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
        </div>
        <div>
          <label htmlFor="projectType" className="text-sm font-medium text-ink">
            Project Type <span className="text-ink-soft">(optional)</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            defaultValue=""
            className="mt-1.5 w-full rounded-lg border border-brand-900/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          >
            <option value="">Select one&hellip;</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-brand-900/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
        />
      </div>

      {status === "error" && errorMessage ? (
        <p className="text-sm font-medium text-red-700">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-gold-300 transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
