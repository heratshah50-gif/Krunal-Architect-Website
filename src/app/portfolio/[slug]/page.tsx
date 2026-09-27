import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProjectBySlug, projects } from "@/lib/data/projects";
import { site } from "@/lib/constants";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.excerpt,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.excerpt,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    dateCreated: project.year,
    locationCreated: project.location,
    creator: {
      "@type": "ProfessionalService",
      name: site.name,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Portfolio", item: `${site.url}/portfolio` },
      { "@type": "ListItem", position: 2, name: project.title, item: `${site.url}/portfolio/${project.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={creativeWorkJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageHeader
        eyebrow={project.category}
        title={project.title}
        description={`${project.location} · ${project.year} · ${project.area}`}
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PlaceholderImage
          variant={project.placeholderVariant}
          className="aspect-[16/9] rounded-2xl"
        />

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="space-y-4 text-base leading-relaxed text-ink-soft md:col-span-2">
            {project.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <dl className="space-y-4 rounded-2xl border border-brand-900/10 bg-paper-dim/60 p-6 text-sm">
            <div>
              <dt className="font-semibold text-brand-900">Category</dt>
              <dd className="text-ink-soft">{project.category}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-900">Location</dt>
              <dd className="text-ink-soft">{project.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-900">Year</dt>
              <dd className="text-ink-soft">{project.year}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-900">Area</dt>
              <dd className="text-ink-soft">{project.area}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-12 border-t border-brand-900/10 pt-8">
          <Link href="/portfolio" className="text-sm font-semibold text-brand-900 hover:text-gold-700">
            &larr; Back to all projects
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
