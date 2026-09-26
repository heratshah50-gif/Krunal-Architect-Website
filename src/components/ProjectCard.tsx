import Link from "next/link";
import type { Project } from "@/lib/content";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectVisual
          project={project}
          priority={priority}
          className="aspect-[4/3] transition-[filter] duration-500 group-hover:brightness-95"
        />
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-medium tracking-tight group-hover:underline underline-offset-4">{project.title}</h3>
          <span className="shrink-0 text-xs text-mute">{project.year}</span>
        </div>
        <p className="mt-1 text-sm text-mute">
          {project.category} · {project.location}
        </p>
      </Link>
    </article>
  );
}
