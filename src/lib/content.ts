// Portfolio, services and FAQ content.
//
// TODO: the projects below are sample entries that show the layout. Replace
// them with real work, and drop photos in /public/projects/<slug>/ then set
// `cover` (e.g. "/projects/courtyard-house/cover.jpg").

export type Category = "Residential" | "Commercial" | "Interiors" | "Hospitality";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  location: string;
  year: number;
  area: string;
  status: "Completed" | "In progress" | "Concept";
  summary: string;
  description: string[];
  highlights: string[];
  cover?: string;
};

export const categories: Category[] = ["Residential", "Commercial", "Interiors", "Hospitality"];

export const projects: Project[] = [
  {
    slug: "courtyard-house",
    title: "Courtyard House",
    category: "Residential",
    location: "City, State",
    year: 2025,
    area: "4,200 sq ft",
    status: "Completed",
    summary:
      "A family home organised around a central open-air courtyard that brings light, air and greenery into every room.",
    description: [
      "The brief called for a home that felt private from the street yet open within. The plan wraps around a planted courtyard, so every living space opens onto light and cross-ventilation.",
      "Exposed concrete, lime plaster and local stone keep the palette quiet and low-maintenance, while deep overhangs shade the glazing through the summer months.",
    ],
    highlights: ["Central courtyard for passive cooling", "Local stone and lime plaster", "Rainwater harvesting"],
  },
  {
    slug: "linear-office",
    title: "Linear Office",
    category: "Commercial",
    location: "City, State",
    year: 2024,
    area: "12,000 sq ft",
    status: "Completed",
    summary:
      "A flexible workplace for a growing technology company, built around daylight, acoustics and a continuous open floor.",
    description: [
      "A single long floor plate is broken into zones by timber-slatted volumes that hold meeting rooms, storage and services.",
      "North-facing glazing gives even daylight across desks, and a perforated ceiling system controls noise without closing the space in.",
    ],
    highlights: ["Daylight-led planning", "Acoustic timber volumes", "Modular furniture layout"],
  },
  {
    slug: "monolith-apartment",
    title: "Monolith Apartment",
    category: "Interiors",
    location: "City, State",
    year: 2024,
    area: "1,850 sq ft",
    status: "Completed",
    summary:
      "A complete interior transformation of a city apartment, using a restrained monochrome palette and bespoke joinery.",
    description: [
      "Walls were removed to open the kitchen, dining and living spaces into one continuous room, anchored by a single stone island.",
      "Custom joinery hides storage floor to ceiling, keeping surfaces clear and the palette calm.",
    ],
    highlights: ["Open-plan reconfiguration", "Bespoke joinery", "Warm minimal palette"],
  },
  {
    slug: "terrace-cafe",
    title: "Terrace Café",
    category: "Hospitality",
    location: "City, State",
    year: 2023,
    area: "2,600 sq ft",
    status: "Completed",
    summary:
      "An all-day café that steps down across terraced levels, blurring the line between indoor seating and garden.",
    description: [
      "The site's natural slope became the design: three terraces carry seating down towards a shaded garden.",
      "Brick screens filter sunlight and the street view, giving each level its own character.",
    ],
    highlights: ["Terraced seating levels", "Brick jaali screens", "Indoor–outdoor flow"],
  },
  {
    slug: "brick-villa",
    title: "Brick Villa",
    category: "Residential",
    location: "City, State",
    year: 2023,
    area: "5,600 sq ft",
    status: "Completed",
    summary:
      "A weekend villa in exposed brick, arranged as a cluster of pavilions around shaded verandahs.",
    description: [
      "Instead of one large block, the villa is split into pavilions joined by verandahs, keeping each room cool and open to breezes.",
      "Handmade brick, terracotta tile and timber tie the house back to local building traditions.",
    ],
    highlights: ["Pavilion planning", "Handmade brick", "Shaded verandahs"],
  },
  {
    slug: "gallery-showroom",
    title: "Gallery Showroom",
    category: "Commercial",
    location: "City, State",
    year: 2025,
    area: "3,400 sq ft",
    status: "In progress",
    summary:
      "A double-height showroom for a furniture brand, designed like a gallery so the products take centre stage.",
    description: [
      "A white, gallery-like shell with controlled lighting lets each product be shown as an object.",
      "A sculptural stair links the two levels and becomes the showroom's landmark.",
    ],
    highlights: ["Double-height volume", "Gallery lighting", "Sculptural stair"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export type Service = {
  id: string;
  title: string;
  summary: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "architecture",
    title: "Architectural Design",
    summary:
      "Homes, villas, offices and commercial buildings designed from concept to construction drawings, shaped by site, climate and how you live or work.",
    includes: ["Site analysis & feasibility", "Concept design & 3D visualisation", "Working & construction drawings", "Approvals support"],
  },
  {
    id: "interiors",
    title: "Interior Design",
    summary:
      "Complete interiors for homes, workplaces and hospitality spaces: layouts, materials, lighting, furniture and bespoke joinery.",
    includes: ["Space planning", "Material & colour palettes", "Lighting design", "Custom furniture & joinery"],
  },
  {
    id: "planning",
    title: "Master Planning",
    summary:
      "Layouts for residential communities, campuses and mixed-use developments that balance density, open space and movement.",
    includes: ["Site layout & zoning", "Landscape integration", "Phasing strategy", "Infrastructure coordination"],
  },
  {
    id: "renovation",
    title: "Renovation & Remodelling",
    summary:
      "Reworking existing buildings and apartments to add light, space and function, while keeping what is worth keeping.",
    includes: ["Condition assessment", "Structural coordination", "Layout reconfiguration", "Facade upgrades"],
  },
  {
    id: "turnkey",
    title: "Turnkey Execution",
    summary:
      "One point of contact from design to handover: we coordinate contractors, vendors and site work so the built result matches the design.",
    includes: ["Contractor selection", "Site supervision", "Budget & schedule tracking", "Final styling & handover"],
  },
  {
    id: "consultation",
    title: "Design Consultation",
    summary:
      "Focused advice sessions for plot purchases, layout reviews, material choices or a second opinion on an existing design.",
    includes: ["Plot & layout review", "Vastu-aware planning advice", "Material guidance", "Cost-saving recommendations"],
  },
];

export const process = [
  { step: "01", title: "Listen", text: "We start with a conversation about your needs, site, budget and timeline." },
  { step: "02", title: "Concept", text: "Sketches, massing studies and 3D views explore the right direction." },
  { step: "03", title: "Develop", text: "Detailed drawings, materials and approvals turn the idea into a buildable plan." },
  { step: "04", title: "Build", text: "Site coordination and supervision see the design through to handover." },
];

// Plain question/answer pairs. Rendered on the page and as FAQPage JSON-LD,
// which helps both search snippets and AI answer engines quote the studio.
export const faqs = [
  {
    q: "What services does Krunal Architect offer?",
    a: "Architectural design, interior design, master planning, renovation, turnkey execution and design consultation for residential, commercial and hospitality projects.",
  },
  {
    q: "How does the design process work?",
    a: "Every project moves through four stages: an initial consultation, concept design with 3D visuals, detailed drawings and approvals, and site coordination through to handover.",
  },
  {
    q: "Do you take on interior-only projects?",
    a: "Yes. We design complete interiors for apartments, villas, offices, showrooms and cafés, including lighting, furniture and bespoke joinery.",
  },
  {
    q: "How are design fees calculated?",
    a: "Fees depend on the project's size, scope and complexity. After the first consultation we share a clear written proposal with the scope, deliverables and fee.",
  },
  {
    q: "How do I start a project?",
    a: "Get in touch through the contact page, email or phone with a few details about your site and requirements, and we will set up a first consultation.",
  },
];
