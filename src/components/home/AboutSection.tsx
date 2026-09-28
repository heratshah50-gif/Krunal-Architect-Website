import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { site } from "@/lib/constants";
import { BadgeEyebrow, sectionHeading } from "./Eyebrow";

export function AboutSection() {
  return (
    <section id="about" className="bg-paper">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-[clamp(40px,6vw,80px)] px-[clamp(20px,5.5vw,80px)] py-[clamp(72px,8.5vw,120px)]">
        <Reveal className="relative min-w-0 flex-[1_1_440px] pb-10">
          <div className="relative aspect-[600/480] overflow-hidden rounded-lg bg-[#ECE6DF]">
            <Image
              src="/images/site/about-vedant.jpg"
              alt="Commercial facade in Ahmedabad"
              fill
              sizes="(min-width: 960px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-[calc(-1*clamp(0px,4vw-16px,40px))] flex flex-col gap-2 rounded-lg border border-gold-500 bg-brand-950 p-6 shadow-[0_16px_32px_rgba(16,0,0,0.125)]">
            <CountUp value="25+" className="font-display text-5xl leading-none text-gold-500" />
            <span className="text-xs font-semibold uppercase leading-[15px] tracking-[1px] text-white">
              Years of Local Expertise
            </span>
          </div>
        </Reveal>

        <Reveal delay={110} className="flex min-w-0 flex-[1_1_440px] flex-col gap-8">
          <div className="flex flex-col items-start gap-4">
            <BadgeEyebrow>About {site.principal} &amp; Team</BadgeEyebrow>
            <h2 className={`${sectionHeading} text-ink`}>
              Elevating Ahmedabad&apos;s Urban Landscape
            </h2>
          </div>
          <p className="m-0 text-[15px] leading-[1.7] text-ink-mid text-pretty">
            KS Architects is a multi-disciplinary practice based in Ahmedabad,
            Gujarat. Founded and led by chief architect and principal valuer
            Krunal Shah, we have built a robust reputation for delivering design
            excellence, strict regulatory compliance, and bulletproof municipal
            project approvals.
          </p>
          <p className="m-0 text-[15px] leading-[1.7] text-ink-soft text-pretty">
            We operate at the intersection of spatial creativity and commercial
            viability. Whether shaping a bespoke residential sanctuary or
            delivering complex town planning and RERA consultations, we ensure
            every project rests on a foundation of integrity and absolute
            precision.
          </p>
          <span className="h-px w-[85%] bg-gold-500 opacity-30" />
          <div className="flex flex-col gap-1">
            <span className="text-base font-bold leading-[19px] text-ink">{site.principal}</span>
            <span className="text-[13px] leading-4 text-ink-soft">
              Founder &amp; Principal Advisor, Registered Valuer
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
