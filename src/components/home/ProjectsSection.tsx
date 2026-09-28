"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { BadgeEyebrow, sectionHeading } from "./Eyebrow";

export type HomeProject = {
  slug: string;
  title: string;
  category: string;
  location: string;
  /** Resolved image URL (Sanity or bundled); null shows placeholder art. */
  src: string | null;
  alt: string;
  gallery: { src: string; alt: string }[];
};

export function ProjectsSection({ projects: homeProjects }: { projects: HomeProject[] }) {
  const [active, setActive] = useState<number | null>(null);
  const count = homeProjects.length;

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) => setActive((i) => (i == null ? i : (i + d + count) % count)),
    [count]
  );

  useEffect(() => {
    if (active == null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  const cur = active == null ? null : homeProjects[active];

  if (count === 0) return null;

  return (
    <section id="projects" className="bg-paper">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(36px,4vw,56px)] px-[clamp(20px,5.5vw,80px)] py-[clamp(72px,8.5vw,120px)]">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <BadgeEyebrow>Exhibition of Work</BadgeEyebrow>
          <h2 className={`${sectionHeading} text-ink`}>Selected Built Projects</h2>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-gold-500"
          >
            View all projects <ArrowRight className="text-gold-500" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6">
          {homeProjects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 110}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Open project: ${p.title}`}
                className="group relative isolate block aspect-[628/440] w-full cursor-zoom-in overflow-hidden rounded-lg bg-[#ECE6DF] text-left shadow-[0_12px_24px_rgba(16,0,0,0.06)]"
              >
                {p.src ? (
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 960px) 50vw, 100vw"
                    className="z-0 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
                  />
                ) : (
                  <PlaceholderImage variant={i + 1} className="absolute inset-0 z-0" />
                )}
                <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(17,9,7,0)_40%,rgba(17,9,7,0.82)_100%)]" />
                <div className="pointer-events-none absolute inset-x-6 bottom-6 z-[2] flex flex-col gap-1.5">
                  <span className="font-display text-[28px] leading-9 text-white">{p.title}</span>
                  <span className="text-xs font-medium uppercase leading-[15px] tracking-[1px] text-gold-300">
                    {[p.category, p.location].filter(Boolean).join(" · ")}
                  </span>
                  <span className="mt-1.5 flex items-center gap-2 text-[13px] font-semibold tracking-[0.5px] text-white">
                    View project <ArrowRight className="text-gold-500" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {cur ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={cur.title}
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-[rgba(17,9,7,0.94)]"
        >
          <div onClick={close} className="fixed inset-0" />
          <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-[clamp(20px,3vw,32px)] px-[clamp(16px,4vw,56px)] py-[clamp(16px,3vw,40px)]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[2px] text-gold-500">
                Project {String(active! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                autoFocus
                className="h-11 w-11 cursor-pointer rounded-full border border-gold-500/60 bg-transparent text-xl text-white hover:bg-gold-500 hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video max-h-[70vh] overflow-hidden rounded-lg bg-brand-950">
              {cur.src ? (
                <Image src={cur.src} alt={cur.alt} fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
              ) : (
                <PlaceholderImage variant={active! + 1} className="absolute inset-0" />
              )}
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous project"
                className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full bg-paper/90 text-lg text-ink hover:bg-gold-500"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next project"
                className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full bg-paper/90 text-lg text-ink hover:bg-gold-500"
              >
                →
              </button>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
                <h3 className="m-0 font-display text-[clamp(34px,4vw,52px)] leading-[1.05] text-white">{cur.title}</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] uppercase tracking-[1px]">
                  {cur.category ? (
                    <span className="text-cream">
                      Service <span className="font-semibold text-gold-300">{cur.category}</span>
                    </span>
                  ) : null}
                  {cur.location ? (
                    <span className="text-cream">
                      Location <span className="font-semibold text-gold-300">{cur.location}</span>
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/portfolio/${cur.slug}`}
                  className="flex items-center rounded border-[1.5px] border-gold-500 px-6 py-3.5 text-sm font-semibold tracking-[0.5px] text-gold-500 hover:bg-gold-500 hover:text-ink"
                >
                  Full project details
                </Link>
                <Link
                  href="/#contact"
                  onClick={close}
                  className="flex items-center gap-2 rounded bg-gold-500 px-6 py-3.5 text-sm font-semibold tracking-[0.5px] text-ink hover:bg-gold-300 hover:text-ink"
                >
                  Discuss a similar project
                  <ArrowRight />
                </Link>
              </div>
            </div>

            {cur.gallery.length > 0 ? (
              <div className="flex flex-col gap-3 pb-6">
                <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-cream">
                  More from this project
                </span>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3">
                  {cur.gallery.map((g) => (
                    <div key={g.src} className="relative aspect-[4/3] overflow-hidden rounded-md bg-brand-800">
                      <Image src={g.src} alt={g.alt} fill sizes="400px" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
