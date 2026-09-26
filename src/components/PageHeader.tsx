import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <section className="border-b border-line">
      <div className="container-x py-16 md:py-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-mute">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="hover:text-ink">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mt-10">{eyebrow}</p>
        <h1 className="display mt-4 max-w-4xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">{intro}</p>}
      </div>
    </section>
  );
}
