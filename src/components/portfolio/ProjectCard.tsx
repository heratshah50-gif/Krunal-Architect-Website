import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <PlaceholderImage
        variant={project.placeholderVariant}
        label={project.category}
        className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">
          {project.location}
        </p>
        <h3 className="font-display mt-2 text-xl font-semibold text-brand-900">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {project.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
          <span>{project.year}</span>
          <span>{project.area}</span>
        </div>
      </div>
    </Link>
  );
}
