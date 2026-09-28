import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Check } from "@/components/ui/Icons";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { imageSrc } from "@/lib/images";
import type { Service } from "@/lib/types";
import { TextEyebrow, sectionHeading } from "./Eyebrow";

export function ServicesSection({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="bg-paper-dim">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(36px,4vw,56px)] px-[clamp(20px,5.5vw,80px)] py-[clamp(72px,8.5vw,120px)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal className="flex max-w-[640px] flex-col items-start gap-4">
            <TextEyebrow>Our Capabilities</TextEyebrow>
            <h2 className={`${sectionHeading} text-ink`}>
              A Unified Core of Design &amp; Legal Precision
            </h2>
          </Reveal>
          <Reveal as="p" delay={110} className="m-0 max-w-[400px] text-sm leading-[1.6] text-ink-soft text-pretty">
            We eliminate the friction between creative architectural vision and
            complex municipal execution by offering structural design alongside
            registered government valuation and advisory.
          </Reveal>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
          {services.map((svc, i) => {
            const src = imageSrc(svc.image, svc.localImage, 900);
            return (
              <Reveal
                as="article"
                key={svc.slug}
                delay={(i % 3) * 110}
                className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-[0_8px_24px_rgba(16,0,0,0.02)] transition-[transform,box-shadow] duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(16,0,0,0.08)]"
              >
                <div className="relative h-[200px] overflow-hidden bg-[#ECE6DF]">
                  {src ? (
                    <Image
                      src={src}
                      alt={svc.image?.alt || svc.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
                    />
                  ) : (
                    <PlaceholderImage variant={i + 1} className="h-full" />
                  )}
                </div>
                <div className="flex flex-col gap-5 p-7">
                  <h3 className="m-0 font-display text-[28px] leading-9 text-ink">{svc.title}</h3>
                  {svc.points?.length ? (
                    <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[13px] leading-[1.4] text-ink-mid">
                      {svc.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <Check className="mt-0.5 flex-none text-gold-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : svc.shortDescription ? (
                    <p className="m-0 text-[13px] leading-[1.5] text-ink-mid">{svc.shortDescription}</p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
