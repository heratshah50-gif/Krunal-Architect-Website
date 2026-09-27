export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(222,167,46,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(222,167,46,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">
          {eyebrow}
        </p>
        <h1 className="font-display mt-4 max-w-2xl text-balance text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/75">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
