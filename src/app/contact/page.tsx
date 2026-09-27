import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { fullAddress, site } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} in Ahmedabad for architecture, valuation, or advisory enquiries.`,
  alternates: { canonical: "/contact" },
};

const mapsQuery = encodeURIComponent(fullAddress);

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's talk about your project"
        description="Whether it's a first sketch, a valuation report, or an approval that's stuck — reach out and we'll tell you exactly what's next."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-brand-900/10 bg-paper-dim/60 p-6">
            <h2 className="font-display text-lg font-semibold text-brand-900">
              Office
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} &ndash; {site.address.zip}
            </p>
          </div>

          <div className="rounded-2xl border border-brand-900/10 bg-paper-dim/60 p-6">
            <h2 className="font-display text-lg font-semibold text-brand-900">
              Direct Contact
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
              <li>
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="hover:text-gold-700">
                  Mobile: {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${site.landline.replace(/\s+/g, "")}`} className="hover:text-gold-700">
                  Landline: {site.landline}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-gold-700">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-900/10">
            <iframe
              title={`${site.name} office location`}
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
