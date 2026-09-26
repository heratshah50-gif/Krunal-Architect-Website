import { absoluteUrl, site } from "./site";
import { faqs, type Project, type Service } from "./content";

// schema.org structured data. Search engines and AI answer engines read this
// to understand who the studio is, where it works and what it offers.

const orgId = absoluteUrl("/#organization");

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    email: site.email,
    telephone: site.phone,
    founder: { "@type": "Person", name: site.founder, jobTitle: "Architect" },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    openingHours: site.hours,
    knowsAbout: ["Architecture", "Interior design", "Residential architecture", "Commercial architecture", "Master planning", "Sustainable design"],
    sameAs: Object.values(site.social),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": orgId },
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/projects/${project.slug}#project`),
    name: project.title,
    headline: `${project.title} — ${project.category} project by ${site.name}`,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    genre: project.category,
    dateCreated: String(project.year),
    locationCreated: { "@type": "Place", name: project.location },
    creator: { "@id": orgId },
    keywords: [project.category, "architecture", ...project.highlights].join(", "),
  };
}

export function servicesSchema(list: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Services by ${site.name}`,
    itemListElement: list.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        serviceType: s.title,
        provider: { "@id": orgId },
        areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
      },
    })),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
