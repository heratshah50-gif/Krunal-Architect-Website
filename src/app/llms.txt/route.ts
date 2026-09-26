import { faqs, projects, services } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

// /llms.txt — a plain-text summary of the studio for AI assistants and answer
// engines (GEO), following the llmstxt.org convention. Generated from the
// same content as the site so it never goes out of date.
export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Type: ${site.tagline}`,
    `- Principal architect: ${site.founder}`,
    `- Location: ${site.address.city}, ${site.address.region}, India`,
    `- Areas served: ${site.areaServed.join(", ")}`,
    `- Phone: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Hours: ${site.hoursLabel}`,
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")}): Overview of the studio, selected work and services`,
    `- [About](${absoluteUrl("/about")}): Founder, design philosophy and process`,
    `- [Projects](${absoluteUrl("/projects")}): Full portfolio`,
    `- [Services](${absoluteUrl("/services")}): What the studio offers`,
    `- [Contact](${absoluteUrl("/contact")}): Enquiries and consultations`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- ${s.title}: ${s.summary}`),
    "",
    "## Projects",
    "",
    ...projects.map(
      (p) => `- [${p.title}](${absoluteUrl(`/projects/${p.slug}`)}): ${p.category}, ${p.location}, ${p.year}. ${p.summary}`,
    ),
    "",
    "## FAQ",
    "",
    ...faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
