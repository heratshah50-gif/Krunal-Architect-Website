/**
 * One-off script: populates a real Sanity dataset with the same placeholder
 * content already live on the site (src/lib/data/*.ts), so Studio launches
 * populated instead of empty. Safe to re-run — every document uses a
 * deterministic _id and is written with createOrReplace.
 *
 * Usage (after setting NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET
 * / SANITY_API_WRITE_TOKEN in .env.local):
 *   npm run seed
 *
 * Delete this file once you've run it and are happy with the seeded content.
 */
// Not importing src/sanity/lib/serverClient.ts here: it imports the
// "server-only" package, which throws when loaded outside Next.js's own
// server bundling (e.g. this plain Node script run via tsx). Build a plain
// client directly instead.
import { createReadStream } from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "../src/sanity/env";
import { toPortableText } from "../src/lib/portableText";
import { projects, projectCategories } from "../src/lib/data/projects";
import { posts } from "../src/lib/data/posts";
import { services } from "../src/lib/data/services";
import { testimonials } from "../src/lib/data/testimonials";
import { bio, credentials, philosophy } from "../src/lib/data/about";

const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Uploads a bundled /public photo to Sanity and returns an image field value.
// Sanity de-duplicates identical files, so re-running doesn't create copies.
async function uploadLocalImage(localPath: string | undefined, alt: string) {
  if (!localPath) return undefined;
  const filePath = path.join(process.cwd(), "public", localPath);
  const asset = await serverClient.assets.upload("image", createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt };
}

async function main() {
  if (!isSanityConfigured || !process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "Sanity isn't configured yet. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local before running this script."
    );
    process.exit(1);
  }

  console.log("Seeding categories...");
  const categoryIds = new Map<string, string>();
  for (const title of projectCategories) {
    const id = `category-${slugify(title)}`;
    await serverClient.createOrReplace({ _id: id, _type: "category", title });
    categoryIds.set(title, id);
  }

  console.log("Seeding services...");
  for (const [index, service] of services.entries()) {
    await serverClient.createOrReplace({
      _id: `service-${service.slug}`,
      _type: "service",
      title: service.title,
      slug: { _type: "slug", current: service.slug },
      icon: service.icon,
      shortDescription: service.shortDescription,
      points: service.points,
      image: await uploadLocalImage(service.localImage, service.title),
      order: index,
    });
  }

  console.log("Seeding projects...");
  for (const project of projects) {
    await serverClient.createOrReplace({
      _id: `project-${project.slug}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      category: { _type: "reference", _ref: categoryIds.get(project.category) },
      location: project.location,
      year: project.year,
      area: project.area,
      excerpt: project.excerpt,
      body: toPortableText(project.body),
      featured: project.featured ?? false,
      mainImage: await uploadLocalImage(project.localImage, project.title),
      publishedAt: new Date().toISOString(),
    });
  }

  console.log("Seeding journal posts...");
  for (const post of posts) {
    await serverClient.createOrReplace({
      _id: `blogPost-${post.slug}`,
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      category: post.category,
      excerpt: post.excerpt,
      body: toPortableText(post.body),
      readTime: post.readTime,
      publishedAt: new Date(post.date).toISOString(),
    });
  }

  console.log("Seeding testimonials...");
  for (const testimonial of testimonials) {
    await serverClient.createOrReplace({
      _id: `testimonial-${slugify(testimonial.clientName)}`,
      _type: "testimonial",
      clientName: testimonial.clientName,
      clientRole: testimonial.clientRole,
      quote: testimonial.quote,
      projectRef: testimonial.projectSlug
        ? { _type: "reference", _ref: `project-${testimonial.projectSlug}` }
        : undefined,
      featured: true,
    });
  }

  console.log("Seeding about page...");
  await serverClient.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    bio: toPortableText(bio),
    credentials,
    philosophy,
  });

  console.log("Done. Open /studio to review the seeded content.");
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
