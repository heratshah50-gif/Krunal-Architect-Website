import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import {
  fullAddress,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  site,
  telHref,
  whatsappUrl,
} from "@/lib/constants";
import { BadgeEyebrow } from "./Eyebrow";
import { EnquiryForm } from "./EnquiryForm";

const contactRows = [
  { label: "Mobile", value: site.phoneDisplay, href: telHref(site.phone), external: false },
  { label: "Office", value: site.landline, href: telHref(site.landline), external: false },
  { label: "WhatsApp", value: `Chat with ${site.principal}`, href: whatsappUrl, external: true },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { label: "Studio", value: fullAddress, href: mapsDirectionsUrl, external: true },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-paper">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(40px,5vw,72px)] px-[clamp(20px,5.5vw,80px)] py-[clamp(72px,8.5vw,120px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <Reveal className="flex max-w-[760px] flex-col items-start gap-5">
            <BadgeEyebrow>Get in touch</BadgeEyebrow>
            <h2 className="m-0 font-display text-[clamp(44px,5.5vw,80px)] leading-none tracking-[-0.01em] text-ink text-balance">
              Initiate Your Project Discussion
            </h2>
          </Reveal>
          <Reveal as="p" delay={110} className="m-0 max-w-[360px] text-[15px] leading-[1.65] text-ink-soft text-pretty">
            Tell us about your site, the service you need and your timeline.
            Call, WhatsApp or send the form.
          </Reveal>
        </div>

        <div className="flex flex-wrap items-start gap-[clamp(40px,6vw,96px)]">
          <Reveal className="flex min-w-0 flex-[1_1_420px] flex-col gap-8">
            <div className="flex flex-col border-b border-line">
              {contactRows.map((row) => (
                <a
                  key={row.label}
                  href={row.href}
                  {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid grid-cols-[minmax(0,120px)_minmax(0,1fr)_auto] items-center gap-4 border-t border-line py-[22px] text-ink transition-[padding] duration-300 hover:pl-2 hover:text-ink"
                >
                  <span className="text-xs font-medium uppercase tracking-[1.5px] text-ink-soft">{row.label}</span>
                  <span className="text-[clamp(16px,1.5vw,20px)] leading-[1.4]">{row.value}</span>
                  <ArrowUpRight />
                </a>
              ))}
            </div>
            <div className="relative aspect-video overflow-hidden rounded-md bg-[#ECE6DF]">
              <iframe
                title="Map: KS Architects, Krupal Pathshala, Shivranjani Cross Road, Ahmedabad"
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </Reveal>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
