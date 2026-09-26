import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectGrid } from "@/components/ProjectGrid";
import { CallToAction } from "@/components/CallToAction";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { projects } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

const title = "Projects — Residential, Commercial & Interior Design";
const description = `Explore the portfolio of ${site.name}: homes, villas, offices, showrooms, cafés and interiors designed with light, honest materials and climate in mind.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title, description, url: "/projects" },
};

export default function ProjectsPage() {
  const crumbs = [{ name: "Projects", path: "/projects" }];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description,
            url: absoluteUrl("/projects"),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absoluteUrl(`/projects/${p.slug}`),
                name: p.title,
              })),
            },
          },
        ]}
      />
      <PageHeader
        eyebrow="Portfolio"
        title="Selected projects"
        intro="Homes, workplaces, interiors and hospitality spaces, each shaped by its site, its climate and the people who use it."
        crumbs={crumbs}
      />
      <section className="container-x py-16 md:py-20">
        <ProjectGrid projects={projects} />
      </section>
      <CallToAction />
    </>
  );
}
