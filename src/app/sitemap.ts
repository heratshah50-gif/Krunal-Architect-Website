import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/services"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
  ];

  return [
    ...pages,
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: p.cover ? [absoluteUrl(p.cover)] : undefined,
    })),
  ];
}
