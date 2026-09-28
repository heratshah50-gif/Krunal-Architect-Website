import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/lib/types";
import { TextEyebrow, sectionHeading } from "./Eyebrow";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-paper-dim">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(36px,4vw,56px)] px-[clamp(20px,5.5vw,80px)] py-[clamp(72px,8.5vw,120px)]">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <TextEyebrow>Client Testimonials</TextEyebrow>
          <h2 className={`${sectionHeading} text-ink`}>Endorsed by Top Developers &amp; Owners</h2>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
          {testimonials.map((t, i) => (
            <Reveal
              as="figure"
              key={`${t.clientName}-${i}`}
              delay={(i % 3) * 110}
              className="m-0 flex flex-col gap-5 rounded-lg border border-line bg-white p-9 shadow-[0_12px_24px_rgba(16,0,0,0.016)] transition-[transform,box-shadow] duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(16,0,0,0.08)]"
            >
              <span aria-hidden="true" className="h-6 font-display text-5xl leading-6 text-gold-500">
                “
              </span>
              <blockquote className="m-0 flex-1 text-sm italic leading-[1.6] text-ink-mid">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex flex-col gap-0.5 pt-2">
                <span className="text-sm font-bold leading-[17px] text-ink">{t.clientName}</span>
                {t.clientRole ? (
                  <span className="text-[11px] leading-[13px] text-ink-soft">{t.clientRole}</span>
                ) : null}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
