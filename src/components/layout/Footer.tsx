import Image from "next/image";
import Link from "next/link";
import { navLinks, site, telHref } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/Icons";

const serviceLinks = [
  "Bespoke Architecture",
  "Interior Design",
  "Registered Land Valuation",
  "AUDA & AMC Approvals",
  "RERA Advisory",
];

const socials = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[clamp(36px,4vw,56px)] px-[clamp(20px,5.5vw,80px)] pb-10 pt-[clamp(56px,6vw,80px)]">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex max-w-[320px] flex-col gap-6">
            <Link href="/#top" className="flex items-center gap-3">
              <Image
                src="/images/site/ks-logo-exact.png"
                alt={`${site.name} logo`}
                width={44}
                height={44}
                className="h-11 w-11 rounded"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold leading-[18px] tracking-[0.5px] text-white">
                  KS ARCHITECTS
                </span>
                <span className="text-[9px] font-medium uppercase leading-[11px] tracking-[1.5px] text-gold-500">
                  Valuation &amp; Advisory
                </span>
              </span>
            </Link>
            <p className="text-[13px] leading-[1.6] text-cream">
              Architecture, registered government valuation, and municipal
              development advisory based in Ahmedabad, Gujarat.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-[13px] text-cream">
            <span className="text-sm font-bold tracking-[0.5px] text-white">Explore</span>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gold-500">
                {link.label}
              </Link>
            ))}
            <Link href="/blog" className="hover:text-gold-500">
              Journal
            </Link>
          </div>

          <div className="flex flex-col gap-4 text-[13px] text-cream">
            <span className="text-sm font-bold tracking-[0.5px] text-white">Services</span>
            {serviceLinks.map((label) => (
              <Link key={label} href="/#services" className="hover:text-gold-500">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex max-w-[240px] flex-col gap-4">
            <span className="text-sm font-bold tracking-[0.5px] text-white">Inquiries</span>
            <div className="flex flex-col gap-3 text-[13px]">
              <span className="leading-[1.5] text-cream">
                {site.address.line1}, {site.address.line2}, {site.address.city}
              </span>
              <a href={telHref(site.phone)} className="text-gold-500 hover:text-gold-300">
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="text-gold-500 hover:text-gold-300">
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <span className="h-px bg-gold-500 opacity-30" />

        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="text-xs text-cream">
            {site.name} &copy; {year}. All rights reserved. Registered Valuer
            Practice under {site.principal}.
          </span>
          <div className="flex gap-4">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-800 text-gold-500 transition-colors hover:bg-gold-500 hover:text-ink"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
