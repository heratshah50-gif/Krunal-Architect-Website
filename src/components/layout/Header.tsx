import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/constants";
import { ArrowRight } from "@/components/ui/Icons";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-[clamp(20px,5.5vw,80px)] py-[clamp(14px,2vw,24px)]">
        <Link href="/#top" className="flex items-center gap-3">
          <Image
            src="/images/site/ks-logo-exact.png"
            alt={`${site.name} logo`}
            width={44}
            height={44}
            className="h-11 w-11 rounded"
            priority
          />
          <span className="flex flex-col gap-0.5">
            <span className="text-[15px] font-bold leading-[18px] tracking-[0.5px] text-ink">
              KS ARCHITECTS
            </span>
            <span className="text-[9px] font-medium uppercase leading-[11px] tracking-[1.5px] text-gold-500">
              Valuation &amp; Advisory
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-[clamp(20px,2.4vw,32px)] text-sm min-[960px]:flex">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                i === 0
                  ? "font-semibold text-ink hover:text-gold-500"
                  : "text-ink-soft transition-colors hover:text-gold-500"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden items-center gap-2 rounded bg-gold-500 px-6 py-3.5 text-sm font-semibold tracking-[0.5px] text-ink transition-colors hover:bg-gold-300 min-[960px]:flex"
        >
          Get Consultation
          <ArrowRight />
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}
