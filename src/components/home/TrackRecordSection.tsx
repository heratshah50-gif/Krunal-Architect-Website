import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { homeStats } from "@/lib/data/home";
import { sectionHeading } from "./Eyebrow";

export function TrackRecordSection() {
  return (
    <section className="bg-brand-950">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(36px,4vw,56px)] px-[clamp(20px,5.5vw,80px)] py-[clamp(72px,7vw,100px)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal className="flex max-w-[640px] flex-col gap-4">
            <span className="text-[11px] font-semibold uppercase leading-[13px] tracking-[2px] text-gold-500">
              Trusted by the Region
            </span>
            <h2 className={`${sectionHeading} text-white`}>In Numbers: Our Track Record</h2>
          </Reveal>
          <Reveal as="p" delay={110} className="m-0 max-w-[400px] text-sm leading-[1.6] text-cream text-pretty">
            Our strategic focus on legal parameters combined with premium design
            expertise delivers unparalleled commercial and structural outcomes.
          </Reveal>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
          {homeStats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 110}
              className="flex flex-col gap-3 rounded-md border-[0.5px] border-gold-500 bg-brand-800 p-8 transition-[background,transform] duration-[400ms] hover:-translate-y-1 hover:bg-brand-700"
            >
              <CountUp value={s.value} className="font-display text-[56px] leading-none text-gold-500" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold leading-[17px] text-white">{s.label}</span>
                <span className="text-xs leading-[15px] text-cream">{s.sub}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
