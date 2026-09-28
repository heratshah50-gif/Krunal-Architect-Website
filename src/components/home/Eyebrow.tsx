// Small uppercase section labels used across the v3 homepage.

export function BadgeEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex flex-none items-center gap-1.5 whitespace-nowrap rounded border border-gold-500 px-3 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
      <span className="text-[11px] font-semibold uppercase leading-[13px] tracking-[1.5px] text-ink-mid">
        {children}
      </span>
    </span>
  );
}

export function TextEyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`text-xs font-semibold uppercase leading-[15px] tracking-[2px] ${
        tone === "light" ? "text-gold-500" : "text-gold-700"
      }`}
    >
      {children}
    </span>
  );
}

export const sectionHeading =
  "m-0 font-display text-[clamp(36px,3.4vw,48px)] leading-[1.1] text-balance";
