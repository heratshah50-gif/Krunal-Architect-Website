import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-[15px] font-semibold tracking-[0.18em] uppercase">{site.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">{site.description}</p>
        </div>

        <div>
          <p className="eyebrow text-paper/50">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/80 hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-paper/50">Studio</p>
          <address className="mt-4 space-y-2 text-sm not-italic text-paper/80">
            <p>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
            <p>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-paper">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-paper">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {services.slice(0, 4).map((s) => (
              <Link key={s.id} href={`/services#${s.id}`} className="hover:text-paper">
                {s.title}
              </Link>
            ))}
          </p>
          <p className="flex gap-4">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              Instagram
            </a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
