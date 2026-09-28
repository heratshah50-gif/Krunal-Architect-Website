"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-[960px]:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Menu"
        className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded bg-brand-950"
      >
        <span className="h-[1.5px] w-[18px] bg-gold-500" />
        <span className="h-[1.5px] w-[18px] bg-gold-500" />
        <span className="h-[1.5px] w-[18px] bg-gold-500" />
      </button>

      {open ? (
        <nav
          onClick={() => setOpen(false)}
          className="absolute inset-x-0 top-full flex flex-col border-y border-line bg-paper px-[clamp(20px,5.5vw,80px)] pb-6 pt-2 text-[17px]"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3.5 ${i < navLinks.length - 1 ? "border-b border-line" : ""} ${i === 0 ? "font-semibold" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mt-3 flex justify-center rounded bg-gold-500 px-6 py-3.5 text-[15px] font-semibold text-ink"
          >
            Get Consultation
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
