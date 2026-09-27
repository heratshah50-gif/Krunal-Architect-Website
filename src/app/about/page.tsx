import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { bio, credentials, philosophy } from "@/lib/data/about";
import { site } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${site.principal}, principal of ${site.name} — an Ahmedabad architecture, valuation, and advisory practice.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Practice"
        title={`Designed by ${site.principal}, backed by ${site.name}`}
        description="A practice built on the idea that good architecture and sound compliance shouldn't require two different consultants."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <PlaceholderImage
            variant={0}
            className="aspect-[3/4] rounded-2xl"
            label={site.principal}
          />
        </div>
        <div className="lg:col-span-3">
          <h2 className="font-display text-2xl font-semibold text-brand-900 sm:text-3xl">
            {site.principal}
          </h2>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gold-700">
            Principal Architect &amp; Valuer
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {credentials.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-lg border border-brand-900/10 bg-paper-dim/60 px-4 py-3 text-sm text-ink"
              >
                <span aria-hidden="true" className="mt-0.5 text-gold-600">
                  &#10003;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-dim/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">
              Our Approach
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold text-brand-900 sm:text-4xl">
              Philosophy
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {philosophy.map((item, index) => (
              <div key={item.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <span className="font-display text-3xl text-gold-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-lg font-semibold text-brand-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
