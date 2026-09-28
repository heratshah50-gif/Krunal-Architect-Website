import { Reveal } from "@/components/motion/Reveal";
import { homeProcess } from "@/lib/data/home";
import { TextEyebrow, sectionHeading } from "./Eyebrow";

export function ProcessSection() {
  return (
    <section id="process" className="bg-paper">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(36px,4vw,56px)] px-[clamp(20px,5.5vw,80px)] py-[clamp(72px,8.5vw,120px)]">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <TextEyebrow>How We Work</TextEyebrow>
          <h2 className={`${sectionHeading} text-ink`}>Our Architectural &amp; Advisory Journey</h2>
        </Reveal>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-10 p-0">
          {homeProcess.map((stepItem, i) => (
            <Reveal as="li" key={stepItem.title} delay={i * 110} className="flex flex-col gap-6">
              <span className="flex h-11 w-12 items-center justify-center rounded-3xl border-[1.5px] border-gold-500 bg-paper-dim font-display text-xl leading-[26px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="m-0 font-display text-2xl leading-[31px]">{stepItem.title}</h3>
                <p className="m-0 text-[13px] leading-[1.5] text-ink-soft">{stepItem.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
