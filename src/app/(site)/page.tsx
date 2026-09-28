import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection, type HomeProject } from "@/components/home/ProjectsSection";
import { TrackRecordSection } from "@/components/home/TrackRecordSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { getHomeProjects, getServices, getTestimonials } from "@/sanity/lib/queries";
import { imageSrc } from "@/lib/images";

// Re-check Sanity every 60s so projects/services edited in Studio go live.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "KS Architects | Architecture, Valuation & Advisory in Ahmedabad",
  description:
    "KS Architects, led by Krunal Shah: architecture, land & building valuation, and AMC, AUDA, Revenue & RERA approval advisory. 402, Krupal Pathshala, Shivranjani Cross Road, Ahmedabad.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [projects, services, testimonials] = await Promise.all([
    getHomeProjects(),
    getServices(),
    getTestimonials(),
  ]);

  // Resolve image URLs on the server; the projects grid is a client component.
  const homeProjects: HomeProject[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    location: p.location,
    src: imageSrc(p.image, p.localImage, 1600),
    alt: p.image?.alt || p.title,
    gallery: (p.gallery ?? [])
      .map((g) => ({ src: imageSrc(g, undefined, 900), alt: g?.alt || p.title }))
      .filter((g): g is { src: string; alt: string } => !!g.src),
  }));

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <ProjectsSection projects={homeProjects} />
      <TrackRecordSection />
      <ProcessSection />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </>
  );
}
