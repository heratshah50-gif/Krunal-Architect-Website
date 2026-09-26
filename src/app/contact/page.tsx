import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, site } from "@/lib/site";

const title = "Contact — Book a Consultation";
const description = `Contact ${site.name} to discuss your home, office, interior or renovation project. Call ${site.phone}, email ${site.email} or send an enquiry online.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
};

export default function ContactPage() {
  const crumbs = [{ name: "Contact", path: "/contact" }];
  const mapQuery = encodeURIComponent(
    `${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.region}`,
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: title,
            description,
            url: absoluteUrl("/contact"),
            about: { "@id": absoluteUrl("/#organization") },
          },
        ]}
      />
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your project."
        intro="Tell us a little about your site and what you have in mind. We usually reply within one working day."
        crumbs={crumbs}
      />

      <section className="container-x grid gap-16 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <h2 className="sr-only">Send an enquiry</h2>
          <ContactForm />
        </div>

        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          <div>
            <h2 className="eyebrow">Studio</h2>
            <address className="mt-3 not-italic leading-relaxed">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm underline underline-offset-4"
            >
              Open in Google Maps
            </a>
          </div>
          <div>
            <h2 className="eyebrow">Phone</h2>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-3 block text-lg hover:underline">
              {site.phone}
            </a>
          </div>
          <div>
            <h2 className="eyebrow">Email</h2>
            <a href={`mailto:${site.email}`} className="mt-3 block text-lg hover:underline">
              {site.email}
            </a>
          </div>
          <div>
            <h2 className="eyebrow">Hours</h2>
            <p className="mt-3">{site.hoursLabel}</p>
          </div>
        </aside>
      </section>

      {site.mapEmbedUrl && (
        <section className="border-t border-line">
          <iframe
            title={`Map showing the ${site.name} studio`}
            src={site.mapEmbedUrl}
            className="h-[420px] w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      )}
    </>
  );
}
