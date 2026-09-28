import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

export function HeroSection() {
  return (
    <section id="top" className="flex flex-wrap bg-brand-950">
      <div
        className="flex min-w-0 flex-[1_1_520px] flex-col justify-between gap-[clamp(32px,4vw,48px)] py-[clamp(48px,7vw,80px)] pr-[clamp(20px,4.5vw,64px)]"
        style={{ paddingLeft: "max(clamp(20px,5.5vw,80px), calc((100vw - 1440px) / 2 + 80px))" }}
      >
        <div className="flex flex-col gap-6">
          <div className="hero-rise flex items-center gap-2" style={{ animationDelay: "150ms" }}>
            <span className="h-[1.5px] w-6 bg-gold-500" />
            <span className="text-xs font-semibold uppercase leading-[15px] tracking-[2px] text-gold-500">
              Architecture · Valuation · Advisory
            </span>
          </div>
          <h1
            className="hero-rise m-0 font-display text-[clamp(44px,5vw,72px)] leading-[1.05] text-white text-balance"
            style={{ animationDelay: "260ms" }}
          >
            Designing Buildings. Valuing Land. Clearing Approvals.
          </h1>
          <p
            className="hero-rise m-0 max-w-[648px] text-base leading-[1.6] text-cream text-pretty"
            style={{ animationDelay: "370ms" }}
          >
            An Ahmedabad practice led by Krunal Shah, taking projects from first
            sketch to authority approval across AMC, AUDA, Revenue and RERA.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/#projects"
            className="hero-rise flex items-center gap-2 rounded bg-gold-500 px-6 py-3.5 text-sm font-semibold tracking-[0.5px] text-ink transition-colors hover:bg-gold-300 hover:text-ink"
            style={{ animationDelay: "480ms" }}
          >
            Explore Projects
            <ArrowRight />
          </Link>
          <Link
            href="/#services"
            className="hero-rise flex items-center rounded border-[1.5px] border-gold-500 px-6 py-3.5 text-sm font-semibold tracking-[0.5px] text-gold-500 transition-colors hover:bg-gold-500 hover:text-ink"
            style={{ animationDelay: "590ms" }}
          >
            Our Services
          </Link>
        </div>
      </div>

      <div className="relative isolate min-h-[clamp(300px,70vw,680px)] min-w-0 flex-[1_1_440px] overflow-hidden">
        <div className="hero-zoom absolute inset-0 z-0">
          <Image
            src="/images/site/hero-residence.jpg"
            alt="Modern residence at golden hour"
            fill
            priority
            sizes="(min-width: 960px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1] flex justify-between opacity-15">
          {Array.from({ length: 6 }, (_, i) => (
            <span
              key={i}
              className="hero-line w-px bg-gold-500"
              style={{ animationDelay: `${400 + i * 90}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
