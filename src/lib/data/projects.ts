export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Institutional"
  | "Renovation";

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
};

export const projects: Project[] = [
  {
    slug: "shivranjani-residence",
    title: "Shivranjani Residence",
    category: "Residential",
    location: "Ahmedabad, Gujarat",
    year: "2024",
    area: "3,200 sq ft",
    excerpt:
      "A light-filled family home organized around a central courtyard, balancing privacy with open, breathable living spaces.",
    body: [
      "The brief called for a multi-generational home that still felt like three private worlds under one roof. We resolved this with a central courtyard that pulls daylight and cross-ventilation into every level, while a clear vertical zoning strategy keeps each generation's spaces distinct.",
      "Materiality stays deliberately quiet — exposed concrete, local sandstone cladding, and teak detailing — so the architecture recedes and the courtyard becomes the emotional center of the home.",
    ],
    featured: true,
    placeholderVariant: 1,
  },
  {
    slug: "vastrapur-villa",
    title: "Vastrapur Villa",
    category: "Residential",
    location: "Vastrapur, Ahmedabad",
    year: "2023",
    area: "4,800 sq ft",
    excerpt:
      "A contemporary villa that reinterprets traditional Gujarati courtyard planning for a modern, low-maintenance lifestyle.",
    body: [
      "Vastrapur Villa sits on a compact urban plot, so every square foot was negotiated carefully between the client's brief and the site's constraints.",
      "A double-height living space anchors the plan, with cantilevered balconies providing deep shade against Ahmedabad's summer sun without sacrificing the villa's street presence.",
    ],
    featured: true,
    placeholderVariant: 2,
  },
  {
    slug: "krupal-business-centre",
    title: "Krupal Business Centre",
    category: "Commercial",
    location: "Shivranjani Cross Road, Ahmedabad",
    year: "2022",
    area: "18,000 sq ft",
    excerpt:
      "A mixed-use commercial building designed for flexible leasing, efficient footfall, and long-term compliance ease.",
    body: [
      "This ground-plus-four commercial development needed to maximize leasable area while sailing cleanly through local authority and urban development approvals — a process we managed end to end alongside the design.",
      "A modular floor plate allows tenants to combine or split units without structural changes, protecting the building's rental value for decades.",
    ],
    featured: true,
    placeholderVariant: 3,
  },
  {
    slug: "riverside-clinic",
    title: "Riverside Clinic",
    category: "Institutional",
    location: "Ahmedabad, Gujarat",
    year: "2021",
    area: "6,500 sq ft",
    excerpt:
      "A calm, wayfinding-first outpatient clinic designed around patient flow, natural light, and quiet waiting spaces.",
    body: [
      "Healthcare interiors succeed or fail on circulation. We mapped patient, staff, and emergency flows before a single wall was drawn, then let those diagrams generate the plan.",
      "Soft daylight, low-glare finishes, and generous waiting courtyards were prioritized over ornamentation throughout.",
    ],
    placeholderVariant: 4,
  },
  {
    slug: "heritage-bungalow-restoration",
    title: "Heritage Bungalow Restoration",
    category: "Renovation",
    location: "Ahmedabad, Gujarat",
    year: "2020",
    area: "2,900 sq ft",
    excerpt:
      "A sensitive structural and cosmetic restoration of a 1960s bungalow, balancing heritage character with modern services.",
    body: [
      "The scope combined structural valuation, retrofit design, and local authority liaison to bring a beloved family home up to current standards without erasing its character.",
      "Original jaali screens and teak joinery were restored rather than replaced wherever structurally sound.",
    ],
    placeholderVariant: 5,
  },
  {
    slug: "satellite-corporate-office",
    title: "Satellite Corporate Office",
    category: "Commercial",
    location: "Satellite, Ahmedabad",
    year: "2019",
    area: "9,400 sq ft",
    excerpt:
      "A full-floor corporate office fit-out emphasizing daylight access, acoustic comfort, and a flexible open plan.",
    body: [
      "The client wanted a workplace that could scale headcount by 40% without a redesign. The resulting kit-of-parts furniture and partition system does exactly that.",
      "Valuation and lease-structuring advisory ran alongside the design work, giving the client a single point of accountability.",
    ],
    placeholderVariant: 6,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export const projectCategories: ProjectCategory[] = [
  "Residential",
  "Commercial",
  "Institutional",
  "Renovation",
];
