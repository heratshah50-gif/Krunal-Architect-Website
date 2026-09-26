"use client";

import { useState } from "react";
import { categories, type Category, type Project } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

// All projects are server-rendered into the HTML; the filter only hides and
// shows them, so crawlers always see the full portfolio.
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const options: (Category | "All")[] = ["All", ...categories.filter((c) => projects.some((p) => p.category === c))];

  return (
    <>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {options.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`border px-4 py-2 text-sm transition-colors ${
              filter === c ? "border-ink bg-ink text-paper" : "border-line text-mute hover:border-ink hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <div key={p.slug} hidden={filter !== "All" && p.category !== filter}>
            <ProjectCard project={p} priority={i < 3} />
          </div>
        ))}
      </div>
    </>
  );
}
