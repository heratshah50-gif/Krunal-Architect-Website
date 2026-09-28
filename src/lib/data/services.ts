import type { Service } from "@/lib/types";

// Fallback content, shown until services are added in Sanity Studio.
export const services: Service[] = [
  {
    slug: "architecture-interior",
    title: "Architecture & Interior",
    shortDescription:
      "End-to-end architectural and interior design for residential, commercial, and institutional projects — from concept sketches to construction drawings.",
    points: [
      "Bespoke High-End Residential Designs",
      "Commercial Hubs & Retail Workspaces",
      "Interior Design & Material Curation",
      "Landscape Architecture & Site Layouts",
    ],
    icon: "compass",
    localImage: "/images/site/svc-interior.jpg",
  },
  {
    slug: "valuation",
    title: "Valuation Services",
    shortDescription:
      "Certified valuation of land and built property for sale, loan, insurance, taxation, and legal purposes.",
    points: [
      "Government Registered Valuer Practice",
      "Land & Structural Building Valuations",
      "Capital Gains & Wealth Tax Assessments",
      "Asset Valuation for Banks & Financials",
    ],
    icon: "scale",
    localImage: "/images/site/svc-desk.jpg",
  },
  {
    slug: "advisory-liaison",
    title: "Advisory & Liaison",
    shortDescription:
      "Regulatory and approval advisory that keeps projects compliant from sanction to occupancy.",
    points: [
      "AMC & AUDA Local Authority Permissions",
      "Town Planning Scheme (TP) Liaison",
      "Revenue Department Approvals",
      "RERA Compliance & Project Clearances",
    ],
    icon: "shield",
    localImage: "/images/site/svc-planning.jpg",
  },
];
