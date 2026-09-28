import Link from "next/link";
import { getFeaturedProjects } from "@/sanity/lib/queries";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

export async function FeaturedProjects() {
  const featured = await getFeaturedProjects();

  return (
    <section className="bg-paper-dim/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">
              Selected Work
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold text-brand-900 sm:text-4xl">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-brand-900 hover:text-gold-700"
          >
            View full portfolio &rarr;
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
