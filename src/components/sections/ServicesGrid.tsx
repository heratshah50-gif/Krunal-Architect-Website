import Link from "next/link";
import { getServices } from "@/sanity/lib/queries";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export async function ServicesGrid() {
  const services = await getServices();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">
          What We Do
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-brand-900 sm:text-4xl">
          Three disciplines, one point of accountability
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          From first sketch to final occupancy certificate, KS Architects
          keeps design, valuation, and regulatory advisory under one roof —
          so nothing falls through the cracks.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.slug}
            className="group flex flex-col rounded-2xl border border-brand-900/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 text-gold-400">
              <ServiceIcon name={service.icon} className="h-6 w-6" />
            </div>
            <h3 className="font-display mt-5 text-xl font-semibold text-brand-900">
              {service.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
              {service.shortDescription}
            </p>
            <Link
              href={`/services#${service.slug}`}
              className="mt-5 inline-flex items-center text-sm font-semibold text-gold-700 group-hover:text-gold-600"
            >
              Learn more
              <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
