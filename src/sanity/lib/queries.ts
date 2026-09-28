import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { toPortableText, variantFromSlug } from "@/lib/portableText";
import type { AboutContent, BlogPost, Project, Service, Testimonial } from "@/lib/types";

import {
  projects as fallbackProjects,
  projectCategories as fallbackProjectCategories,
  getProjectBySlug as getFallbackProjectBySlug,
  getFeaturedProjects as getFallbackFeaturedProjects,
} from "@/lib/data/projects";
import { posts as fallbackPosts, getPostBySlug as getFallbackPostBySlug } from "@/lib/data/posts";
import { services as fallbackServices } from "@/lib/data/services";
import { testimonials as fallbackTestimonials } from "@/lib/data/testimonials";
import { bio as fallbackBio, credentials as fallbackCredentials, philosophy as fallbackPhilosophy } from "@/lib/data/about";

/**
 * Sanity is optional until the client sets up a real project (see the build
 * plan). Every query below tries Sanity first and falls back to the static
 * placeholder content in `src/lib/data/` when Sanity isn't configured, is
 * unreachable, or simply has no content yet for that query — so the site
 * never regresses to an empty page during the transition period.
 */
// How often (seconds) pages re-check Sanity, so edits made in Studio go live
// without a redeploy.
export const CONTENT_REVALIDATE_SECONDS = 60;

async function fetchWithFallback<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  if (!isSanityConfigured) return fallback;

  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    });
    const isEmpty =
      result === null ||
      result === undefined ||
      (Array.isArray(result) && result.length === 0);
    return isEmpty ? fallback : result;
  } catch (error) {
    console.warn(`Sanity fetch failed for query, using fallback content:\n${query}`, error);
    return fallback;
  }
}

function mapFallbackProject(project: (typeof fallbackProjects)[number]): Project {
  return { ...project, body: toPortableText(project.body) };
}

function withComputedVariant<T extends { slug: string; placeholderVariant?: number }>(
  items: T[]
): (T & { placeholderVariant: number })[] {
  return items.map((item) => ({
    ...item,
    placeholderVariant: item.placeholderVariant ?? variantFromSlug(item.slug),
  }));
}

const projectProjection = groq`{
  "slug": slug.current,
  title,
  "category": category->title,
  location,
  year,
  area,
  excerpt,
  body,
  featured,
  "image": mainImage,
  gallery
}`;

export async function getProjects(): Promise<Project[]> {
  const results = await fetchWithFallback<Project[]>(
    groq`*[_type == "project"] | order(publishedAt desc) ${projectProjection}`,
    {},
    fallbackProjects.map(mapFallbackProject)
  );
  return withComputedVariant(results);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const results = await fetchWithFallback<Project[]>(
    groq`*[_type == "project" && featured == true] | order(publishedAt desc) ${projectProjection}`,
    {},
    getFallbackFeaturedProjects().map(mapFallbackProject)
  );
  return withComputedVariant(results);
}

/**
 * Projects for the homepage grid: the ones ticked "Show on Homepage", or the
 * four most recent if none are ticked. Falls back to the bundled design
 * projects only when Sanity has no projects at all.
 */
export async function getHomeProjects(): Promise<Project[]> {
  const fallback = getFallbackFeaturedProjects().map(mapFallbackProject);
  const result = await fetchWithFallback<{ featured: Project[]; latest: Project[] } | null>(
    groq`{
      "featured": *[_type == "project" && featured == true] | order(publishedAt desc) ${projectProjection},
      "latest": *[_type == "project"] | order(publishedAt desc) [0...4] ${projectProjection}
    }`,
    {},
    null
  );
  const list = result?.featured?.length
    ? result.featured
    : result?.latest?.length
      ? result.latest
      : fallback;
  return withComputedVariant(list);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fallback = getFallbackProjectBySlug(slug);
  const result = await fetchWithFallback<Project | null>(
    groq`*[_type == "project" && slug.current == $slug][0] ${projectProjection}`,
    { slug },
    fallback ? mapFallbackProject(fallback) : null
  );
  if (!result) return null;
  return { ...result, placeholderVariant: result.placeholderVariant ?? variantFromSlug(result.slug) };
}

export async function getProjectSlugs(): Promise<string[]> {
  const results = await fetchWithFallback<string[]>(
    groq`*[_type == "project"].slug.current`,
    {},
    fallbackProjects.map((p) => p.slug)
  );
  return results;
}

export async function getProjectCategories(): Promise<string[]> {
  return fetchWithFallback<string[]>(
    groq`*[_type == "category"] | order(title asc).title`,
    {},
    fallbackProjectCategories
  );
}

const postProjection = groq`{
  "slug": slug.current,
  title,
  excerpt,
  body,
  "date": publishedAt,
  readTime,
  category,
  "image": mainImage
}`;

export async function getPosts(): Promise<BlogPost[]> {
  const results = await fetchWithFallback<BlogPost[]>(
    groq`*[_type == "blogPost"] | order(publishedAt desc) ${postProjection}`,
    {},
    fallbackPosts.map((post) => ({ ...post, body: toPortableText(post.body) }))
  );
  return withComputedVariant(results);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fallback = getFallbackPostBySlug(slug);
  const result = await fetchWithFallback<BlogPost | null>(
    groq`*[_type == "blogPost" && slug.current == $slug][0] ${postProjection}`,
    { slug },
    fallback ? { ...fallback, body: toPortableText(fallback.body) } : null
  );
  if (!result) return null;
  return { ...result, placeholderVariant: result.placeholderVariant ?? variantFromSlug(result.slug) };
}

export async function getPostSlugs(): Promise<string[]> {
  return fetchWithFallback<string[]>(
    groq`*[_type == "blogPost"].slug.current`,
    {},
    fallbackPosts.map((p) => p.slug)
  );
}

export async function getServices(): Promise<Service[]> {
  return fetchWithFallback<Service[]>(
    groq`*[_type == "service"] | order(order asc) {
      "slug": slug.current,
      title,
      shortDescription,
      points,
      icon,
      image
    }`,
    {},
    fallbackServices
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchWithFallback<Testimonial[]>(
    groq`*[_type == "testimonial" && featured == true] {
      clientName,
      clientRole,
      quote,
      "projectSlug": projectRef->slug.current,
      "image": photo
    }`,
    {},
    fallbackTestimonials
  );
}

export async function getAboutContent(): Promise<AboutContent> {
  return fetchWithFallback<AboutContent>(
    groq`*[_type == "aboutPage"][0] {
      bio,
      credentials,
      philosophy,
      "heroImage": heroImage
    }`,
    {},
    {
      bio: toPortableText(fallbackBio),
      credentials: fallbackCredentials,
      philosophy: fallbackPhilosophy,
    }
  );
}
