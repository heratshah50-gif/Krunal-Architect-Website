import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CmsImage } from "@/components/ui/CmsImage";
import { RichText } from "@/components/ui/RichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/lib/queries";
import { site } from "@/lib/constants";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
  const project = await getProjectBySlug(slug);

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
        description={[project.location, project.year, project.area].filter(Boolean).join(" · ")}
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <CmsImage
          image={project.image}
          fallbackSrc={project.localImage}
          placeholderVariant={project.placeholderVariant}
          alt={project.title}
          className="aspect-[16/9] rounded-2xl"
          sizes="(min-width: 1024px) 1024px, 100vw"
        />

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="text-base leading-relaxed text-ink-soft md:col-span-2">
            <RichText value={project.body} />
          </div>

          <dl className="space-y-4 rounded-2xl border border-brand-900/10 bg-paper-dim/60 p-6 text-sm">
            {[
              ["Category", project.category],
              ["Location", project.location],
              ["Year", project.year],
              ["Area", project.area],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <dt className="font-semibold text-brand-900">{label}</dt>
                  <dd className="text-ink-soft">{value}</dd>
                </div>
              ))}
          </dl>
        </div>

        {project.gallery?.some((g) => g?.asset) ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery
              .filter((g) => g?.asset)
              .map((g, i) => (
                <CmsImage
                  key={g?.asset?._ref ?? i}
                  image={g}
                  placeholderVariant={project.placeholderVariant}
                  alt={`${project.title} photo ${i + 1}`}
                  className="aspect-[4/3] rounded-xl"
                />
              ))}
          </div>
        ) : null}

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
