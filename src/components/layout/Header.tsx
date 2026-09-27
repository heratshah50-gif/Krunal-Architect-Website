import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/constants";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-900/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/ks-architects-logo.png"
            alt={`${site.name} logo`}
            width={48}
            height={48}
            className="h-11 w-11 rounded-lg sm:h-12 sm:w-12"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-wide text-brand-900 sm:text-xl">
              {site.name}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              Architecture &amp; Advisory
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-gold-300 shadow-sm transition-colors hover:bg-brand-800"
          >
            Book a Consultation
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
