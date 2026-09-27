import Link from "next/link";
import { site } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section className="bg-brand-900">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Have a plot, a plan, or just a question?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-paper/70">
            Talk to {site.principal} about design, valuation, or approvals —
            no obligation, just a clear next step.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-gold-400"
        >
          Start a Conversation
        </Link>
      </div>
    </section>
  );
}
