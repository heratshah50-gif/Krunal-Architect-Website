import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projectCategories, projects } from "@/lib/data/projects";
import { site } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Residential, commercial, institutional, and renovation projects designed by ${site.name} in Ahmedabad, Gujarat.`,
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage({
  searchParams,
}: PageProps<"/portfolio">) {
  const { category } = await searchParams;
  const activeCategory = Array.isArray(category) ? category[0] : category;

  const filtered = activeCategory
    ? projects.filter((project) => project.category === activeCategory)
    : projects;

  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="A portfolio built on climate, compliance, and craft"
        description="Browse by category to see how the same principles play out across residential, commercial, institutional, and renovation work."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/portfolio"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-brand-900 text-gold-300"
                : "bg-paper-dim text-ink-soft hover:bg-brand-900/10"
            }`}
          >
            All Projects
          </Link>
          {projectCategories.map((cat) => (
            <Link
              key={cat}
              href={`/portfolio?category=${encodeURIComponent(cat)}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-brand-900 text-gold-300"
                  : "bg-paper-dim text-ink-soft hover:bg-brand-900/10"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink-soft">
            No projects in this category yet — check back soon.
          </p>
        )}
      </section>

      <CtaBanner />
    </>
  );
}
