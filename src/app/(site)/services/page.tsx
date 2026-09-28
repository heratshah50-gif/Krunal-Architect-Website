import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { getServices } from "@/sanity/lib/queries";
import { site } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: `Architecture, land & building valuation, and regulatory advisory services offered by ${site.name} in Ahmedabad.`,
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        eyebrow="What We Offer"
        title="Design, valuation, and advisory — under one roof"
        description="Every engagement draws on the same three disciplines, combined in whatever proportion your project actually needs."
      />

      <section className="mx-auto max-w-5xl space-y-16 px-4 py-20 sm:px-6 lg:px-8">
        {services.map((service, index) => (
          <div
            key={service.slug}
            id={service.slug}
            className="scroll-mt-24 border-t border-brand-900/10 pt-12 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="flex items-center gap-4 md:w-64 md:shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-900 text-gold-400">
                  <ServiceIcon name={service.icon} className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-brand-900">
                    {service.title}
                  </h2>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-base leading-relaxed text-ink-soft">
                  {service.shortDescription}
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 rounded-lg bg-paper-dim/60 px-4 py-3 text-sm text-ink"
                    >
                      <span aria-hidden="true" className="mt-0.5 text-gold-600">
                        &#10003;
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      <CtaBanner />
    </>
  );
}
