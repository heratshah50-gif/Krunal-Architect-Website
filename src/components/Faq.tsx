import { faqs } from "@/lib/content";

// Native <details> keeps answers in the HTML (crawlable, no JS needed).
export function Faq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
            <h3>{f.q}</h3>
            <span aria-hidden className="text-2xl font-light transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl leading-relaxed text-mute">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
