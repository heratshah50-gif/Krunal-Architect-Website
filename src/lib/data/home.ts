// Static homepage copy from the v3 Claude Design. Projects, services and
// testimonials are NOT here — they come from Sanity (see sanity/lib/queries.ts).
// NOTE: the stats are the design's placeholder figures; confirm before launch.

export const homeStats = [
  { value: "25+", label: "Years Active", sub: "Shaping Gujarat's urban sector" },
  { value: "350+", label: "Projects Completed", sub: "Villas, commercial towers & layouts" },
  { value: "500+", label: "Valuation Files", sub: "Expert government advisory" },
  { value: "100%", label: "Legal Clearances", sub: "RERA & TP municipal approval success" },
] as const;

export const homeProcess = [
  {
    title: "Consultation",
    body: "Initial project briefing, understanding programmatic land requirements, regulatory parameters, and primary scope definition.",
  },
  {
    title: "Design Concept",
    body: "Generating modern spatial geometries, contextual architectural renderings, and structural layout options.",
  },
  {
    title: "Approval & Liaison",
    body: "Navigating AMC, AUDA, Revenue, and RERA compliance to secure seamless municipal authorizations and valuation audits.",
  },
  {
    title: "Construction Oversight",
    body: "Delivering precise structural guidelines and site supervision to assure material integrity and architectural accuracy.",
  },
] as const;
