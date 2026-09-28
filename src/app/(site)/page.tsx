import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { site } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <FeaturedProjects />
      <TestimonialGrid />
      <CtaBanner />
    </>
  );
}
