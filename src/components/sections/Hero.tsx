import Link from "next/link";

const stats = [
  { value: "15+", label: "Years in Practice" },
  { value: "120+", label: "Projects Delivered" },
  { value: "3", label: "Core Services" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(222,167,46,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(222,167,46,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">
          Architecture &middot; Valuation &middot; Advisory
        </p>
        <h1 className="font-display mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
          Considered architecture, grounded in{" "}
          <span className="text-gold-400">valuation &amp; regulatory</span>{" "}
          expertise.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
          KS Architects is an Ahmedabad-based practice led by Krunal Shah,
          designing homes and commercial spaces while guiding clients through
          valuation, approvals, and RERA compliance — under one roof.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-gold-400"
          >
            View Our Portfolio
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            Book a Consultation
          </Link>
        </div>

        <dl className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-3xl font-semibold text-gold-400">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-paper/60">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
