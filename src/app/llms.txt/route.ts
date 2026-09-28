import { site, fullAddress } from "@/lib/constants";
import { getProjectCategories, getServices } from "@/sanity/lib/queries";

export async function GET() {
  const [services, projectCategories] = await Promise.all([
    getServices(),
    getProjectCategories(),
  ]);

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## About",
    `${site.name} is led by ${site.principal} and based in ${site.address.city}, ${site.address.state}, India. Learn more: ${site.url}/about`,
    "",
    "## Services",
    ...services.map(
      (service) =>
        `- **${service.title}**: ${service.shortDescription ?? service.points?.join("; ") ?? ""} (${site.url}/services#${service.slug})`
    ),
    "",
    "## Portfolio",
    `Project categories: ${projectCategories.join(", ")}. Full portfolio: ${site.url}/portfolio`,
    "",
    "## Journal",
    `Articles on design, valuation, and regulatory advisory: ${site.url}/blog`,
    "",
    "## Contact",
    `Address: ${fullAddress}`,
    `Phone: ${site.phoneDisplay} · ${site.landline}`,
    `Email: ${site.email}`,
    `Contact form: ${site.url}/contact`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
