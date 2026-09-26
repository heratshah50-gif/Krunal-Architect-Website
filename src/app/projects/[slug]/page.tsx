import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ProjectCard } from "@/components/ProjectCard";
import { CallToAction } from "@/components/CallToAction";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";
import { getProject, projects } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.category} Project in ${project.location}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const crumbs = [
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ];
  const related = projects.filter((p) => p.slug !== project.slug).sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category)).slice(0, 3);

  const facts = [
    ["Category", project.category],
    ["Location", project.location],
    ["Year", String(project.year)],
    ["Area", project.area],
    ["Status", project.status],
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), projectSchema(project)]} />
      <PageHeader eyebrow={project.category} title={project.title} intro={project.summary} crumbs={crumbs} />

      <section className="container-x pt-12 md:pt-16">
        <ProjectVisual project={project} priority sizes="100vw" className="aspect-[16/9]" />
      </section>

      <section className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <dl className="grid grid-cols-2 gap-6 self-start md:col-span-4 md:grid-cols-1">
          {facts.map(([k, v]) => (
            <div key={k} className="border-t border-line pt-3">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="md:col-span-8">
          <h2 className="h2">About the project</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-mute">
            {project.description.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <h3 className="eyebrow mt-12">Key features</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {project.highlights.map((h) => (
              <li key={h} className="py-3">
                {h}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-mute">
            Planning something similar?{" "}
            <Link href="/contact" className="text-ink underline underline-offset-4">
              Talk to {site.name}
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-20">
          <h2 className="h2">More projects</h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
