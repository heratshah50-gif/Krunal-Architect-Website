// Fallback content, shown until projects are added in Sanity Studio.
// Project names and descriptions come from the v3 design and are placeholders.

export type ProjectCategory = string;

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  area: string;
  excerpt: string;
  body: string[];
  featured?: boolean;
  placeholderVariant: number;
  localImage?: string;
};

export const projects: Project[] = [
  {
    slug: "the-sanctum-villa",
    title: "The Sanctum Villa",
    category: "Residential Architecture",
    location: "Bopal, Ahmedabad",
    year: "",
    area: "",
    excerpt: "A courtyard villa in Bopal, designed by KS Architects.",
    body: ["A courtyard villa in Bopal, Ahmedabad."],
    featured: true,
    placeholderVariant: 1,
    localImage: "/images/site/proj-villa.jpg",
  },
  {
    slug: "sovereign-commercial-hub",
    title: "Sovereign Commercial Hub",
    category: "Office Tower Architecture",
    location: "SG Highway, Ahmedabad",
    year: "",
    area: "",
    excerpt: "A glass-fronted commercial office tower on SG Highway.",
    body: ["A commercial office tower on SG Highway, Ahmedabad."],
    featured: true,
    placeholderVariant: 2,
    localImage: "/images/site/proj-tower.jpg",
  },
  {
    slug: "shivranjani-corporate-suites",
    title: "Shivranjani Corporate Suites",
    category: "Interior Design",
    location: "Shivranjani, Ahmedabad",
    year: "",
    area: "",
    excerpt: "Corporate office interiors at Shivranjani.",
    body: ["Corporate office interiors at Shivranjani, Ahmedabad."],
    featured: true,
    placeholderVariant: 3,
    localImage: "/images/site/proj-lobby.jpg",
  },
  {
    slug: "avenue-enclave-valuation",
    title: "Avenue Enclave Valuation",
    category: "Valuation Study",
    location: "Science City, Ahmedabad",
    year: "",
    area: "",
    excerpt: "A valuation study of a gated residential community near Science City.",
    body: ["A valuation study of a gated residential community near Science City, Ahmedabad."],
    featured: true,
    placeholderVariant: 4,
    localImage: "/images/site/proj-estate.jpg",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export const projectCategories: ProjectCategory[] = [
  ...new Set(projects.map((p) => p.category)),
];
