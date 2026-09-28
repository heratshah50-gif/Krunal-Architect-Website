"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/constants";

const services = ["Architecture", "Valuation", "Advisory"] as const;
type Status = "idle" | "submitting" | "success" | "error";

const fieldLabel =
  "flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-ink-soft";
const fieldInput =
  "rounded-none border-0 border-b border-[#D8D0C8] bg-transparent px-0 py-3 text-base font-normal normal-case leading-[22px] tracking-normal text-ink outline-none transition-colors placeholder:text-[#7A716C] focus:border-gold-500";

export function EnquiryForm() {
  const [service, setService] = useState<(typeof services)[number]>("Architecture");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          projectType: service,
          message: data.get("message"),
          company: data.get("company"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setStatus("error");
        const fieldErrors = json.errors ? Object.values(json.errors).flat() : [];
        setError(
          (fieldErrors[0] as string | undefined) ||
            json.message ||
            "Something went wrong. Please try again."
        );
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("We couldn't reach the server. Please call or WhatsApp us instead.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex min-w-0 flex-[1_1_440px] flex-col gap-7 overflow-hidden rounded-lg border border-line bg-white p-[clamp(28px,3.5vw,48px)] shadow-[0_24px_60px_rgba(16,0,0,0.06)]"
    >
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gold-500" />

      {/* Honeypot — hidden off-screen so bots fill it and real visitors don't. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="enquiry-company">Company</label>
        <input id="enquiry-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-[2px] text-gold-700">
            Enquiry Form
          </span>
          <h3 className="m-0 font-display text-[clamp(30px,2.6vw,38px)] leading-[1.1] text-ink">
            Schedule Consultation
          </h3>
        </div>
        <Image src="/images/site/ks-logo-exact.png" alt="" width={48} height={48} className="h-12 w-12 flex-none rounded" />
      </div>

      {status === "success" ? (
        <div role="status" className="flex items-center gap-3 rounded-md border border-[#E8D3A8] bg-paper-dim px-4 py-3.5 text-[15px] text-ink">
          <span className="h-2 w-2 rounded-full bg-gold-500" />
          Thank you. We will be in touch shortly.
        </div>
      ) : null}

      <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
        <legend className="mb-3 p-0 text-[11px] font-semibold uppercase tracking-[1.5px] text-ink-soft">
          Service Needed
        </legend>
        <div className="flex flex-wrap gap-2">
          {services.map((label) => {
            const on = label === service;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setService(label)}
                aria-pressed={on}
                className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                  on ? "border-brand-950 bg-brand-950 text-white" : "border-[#D8D0C8] bg-transparent text-ink hover:border-gold-500"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-6">
        <label className={fieldLabel}>
          Full Name
          <input name="name" required minLength={2} placeholder="Your name" autoComplete="name" className={fieldInput} />
        </label>
        <label className={fieldLabel}>
          Phone
          <input name="phone" type="tel" placeholder="+91" autoComplete="tel" className={fieldInput} />
        </label>
      </div>
      <label className={fieldLabel}>
        Email Address
        <input name="email" type="email" required placeholder="Your email address" autoComplete="email" className={fieldInput} />
      </label>
      <label className={fieldLabel}>
        Project Description
        <textarea
          name="message"
          rows={3}
          required
          minLength={10}
          placeholder="Site location, scope and timeline..."
          className={`${fieldInput} resize-y`}
        />
      </label>

      {status === "error" && error ? (
        <p role="alert" className="m-0 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex cursor-pointer items-center gap-2.5 rounded-full border-0 bg-brand-950 px-7 py-4 text-sm font-semibold tracking-[0.5px] text-white transition-colors hover:bg-gold-500 hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit Inquiry"}
          <ArrowUpRight />
        </button>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-soft">
          or message on{" "}
          <span className="border-b border-gold-500 font-semibold text-ink">WhatsApp</span>
        </a>
      </div>
    </form>
  );
}
