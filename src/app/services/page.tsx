import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CallToAction } from "@/components/CallToAction";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, servicesSchema } from "@/lib/schema";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

const title = "Architecture & Interior Design Services";
const description = `${site.name} offers architectural design, interior design, master planning, renovation, turnkey execution and design consultation for homes, offices and hospitality spaces.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

export default function ServicesPage() {
  const crumbs = [{ name: "Services", path: "/services" }];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), servicesSchema(services), faqSchema()]} />
      <PageHeader
        eyebrow="Services"
        title="Design and delivery, under one roof."
        intro="From a single room to a full building, we offer end-to-end architecture and interior design, and can manage construction so the result matches the design."
        crumbs={crumbs}
      />

      <section className="container-x py-16 md:py-24">
        <ol className="divide-y divide-line border-y border-line">
          {services.map((s, i) => (
            <li key={s.id} id={s.id} className="grid scroll-mt-24 gap-6 py-12 md:grid-cols-12">
              <span className="text-sm text-mute md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <div className="md:col-span-6">
                <h2 className="text-3xl font-medium tracking-tight">{s.title}</h2>
                <p className="mt-4 max-w-xl leading-relaxed text-mute">{s.summary}</p>
              </div>
              <div className="md:col-span-5">
                <h3 className="eyebrow">Includes</h3>
                <ul className="mt-4 space-y-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-stone/40">
        <div className="container-x grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 className="h2 mt-4">Frequently asked</h2>
          </div>
          <div className="md:col-span-8">
            <Faq />
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
