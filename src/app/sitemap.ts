import type { MetadataRoute } from "next";
import { site } from "@/lib/constants";
import { projects } from "@/lib/data/projects";
import { posts } from "@/lib/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/services`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/portfolio`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/portfolio/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
