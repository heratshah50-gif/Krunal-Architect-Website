import Image from "next/image";
import Link from "next/link";
import { fullAddress, navLinks, site } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-900/10 bg-brand-950 text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/images/ks-architects-logo.png"
              alt={`${site.name} logo`}
              width={44}
              height={44}
              className="h-11 w-11 rounded-lg"
            />
            <span className="font-display text-lg font-semibold text-white">
              {site.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">
            {site.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>{fullAddress}</li>
            <li>
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="hover:text-gold-300">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${site.landline.replace(/\s+/g, "")}`} className="hover:text-gold-300">
                {site.landline}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold-300">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-paper/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Architecture &middot; Valuation &middot; Advisory</p>
        </div>
      </div>
    </footer>
  );
}
