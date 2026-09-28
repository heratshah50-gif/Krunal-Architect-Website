"use client";

import { useState } from "react";
import { site, whatsappUrl } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

// Fixed left-edge tab that slides out WhatsApp / social shortcuts.
export function SocialDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed left-0 top-1/2 z-40 flex items-center transition-transform duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
      style={{ transform: open ? "translate(0,-50%)" : "translate(-62px,-50%)" }}
    >
      <div className="flex w-[62px] flex-col gap-2.5 rounded-r-xl border border-l-0 border-gold-500/45 bg-brand-950/95 p-2.5 shadow-[0_12px_32px_rgba(16,0,0,0.25)] backdrop-blur-md">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
          tabIndex={open ? 0 : -1}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110 hover:text-white"
        >
          <WhatsAppIcon />
        </a>
        {[
          { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
          { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            tabIndex={open ? 0 : -1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/50 bg-brand-800 text-gold-500 transition-[transform,background] hover:scale-110 hover:bg-gold-500 hover:text-ink"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide social links" : "Show social links"}
        aria-expanded={open}
        className="-ml-px flex h-[84px] w-[22px] cursor-pointer items-center justify-center rounded-r-lg bg-gold-500 text-ink shadow-[0_8px_20px_rgba(16,0,0,0.2)] hover:bg-gold-300"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
