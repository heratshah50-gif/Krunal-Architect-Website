export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  points: string[];
  icon: "compass" | "scale" | "shield";
};

export const services: Service[] = [
  {
    slug: "architecture",
    title: "Architecture",
    shortDescription:
      "End-to-end architectural design for residential, commercial, and institutional projects — from concept sketches to construction drawings.",
    points: [
      "Concept design & space planning",
      "Working drawings & construction detailing",
      "3D visualization & material selection",
      "Site supervision & execution support",
    ],
    icon: "compass",
  },
  {
    slug: "valuation",
    title: "Valuation (Land & Building)",
    shortDescription:
      "Certified valuation of land and built property for sale, loan, insurance, taxation, and legal purposes.",
    points: [
      "Land & building valuation reports",
      "Bank & financial institution valuations",
      "Insurance and taxation valuation",
      "Rental & fair market value assessment",
    ],
    icon: "scale",
  },
  {
    slug: "advisory",
    title: "Advisory Services",
    shortDescription:
      "Regulatory and approval advisory that keeps projects compliant from sanction to occupancy.",
    points: [
      "Project approval",
      "Town planning & valuation",
      "Local authority liaison",
      "Urban Development Authority filings",
      "Revenue & RERA advisory",
    ],
    icon: "shield",
  },
];
