"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

// Works without a backend: on submit it opens the visitor's email app (or
// WhatsApp) with the enquiry pre-filled. Swap for a form service such as
// Formspree or a server action later if you want enquiries stored.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function buildMessage(form: HTMLFormElement) {
    const data = new FormData(form);
    const lines = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Email: ${data.get("email")}`,
      `Service: ${data.get("service")}`,
      `Project location: ${data.get("location") || "-"}`,
      "",
      String(data.get("message") || ""),
    ];
    return { subject: `Project enquiry — ${data.get("service")}`, body: lines.join("\n") };
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { subject, body } = buildMessage(e.currentTarget);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  function onWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    const { subject, body } = buildMessage(form);
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, "_blank", "noopener");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <Field label="Full name" name="name" required autoComplete="name" />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Project location" name="location" autoComplete="address-level2" />

      <label className="sm:col-span-2">
        <span className="eyebrow">Service</span>
        <select name="service" className="field" defaultValue={services[0].title}>
          {services.map((s) => (
            <option key={s.id}>{s.title}</option>
          ))}
          <option>Other</option>
        </select>
      </label>

      <label className="sm:col-span-2">
        <span className="eyebrow">Tell us about your project</span>
        <textarea name="message" rows={5} required className="field resize-y" placeholder="Site size, requirements, budget, timeline…" />
      </label>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="btn">
          Send enquiry
        </button>
        <button type="button" onClick={onWhatsApp} className="btn btn-ghost">
          Send on WhatsApp
        </button>
        {sent && (
          <p role="status" className="text-sm text-mute">
            Your message is ready in your email or WhatsApp app. Just press send.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <span className="eyebrow">
        {label}
        {props.required && <span aria-hidden> *</span>}
      </span>
      <input type="text" {...props} className="field" />
    </label>
  );
}
