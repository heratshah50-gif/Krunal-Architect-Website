export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string;
  readTime: string;
  category: string;
  placeholderVariant: number;
};

export const posts: BlogPost[] = [
  {
    slug: "choosing-a-plot-what-to-check-before-you-buy",
    title: "Choosing a Plot: What to Check Before You Buy",
    excerpt:
      "Before you fall in love with a plot, here's the checklist we run through with every client — from title clarity to FSI and setback rules.",
    body: [
      "A plot's price per square yard tells you almost nothing about what you can actually build on it. Before any design conversation, we walk clients through zoning, permissible FSI, road-width setbacks, and title history.",
      "Getting a valuation and preliminary feasibility check done before you sign anything can save months of redesign later — this is one of the most common reasons our advisory work starts before the architecture does.",
    ],
    date: "2025-01-14",
    readTime: "5 min read",
    category: "Advisory",
    placeholderVariant: 2,
  },
  {
    slug: "rera-approvals-a-timeline-for-homeowners",
    title: "RERA Approvals: A Realistic Timeline for Homeowners",
    excerpt:
      "RERA compliance isn't just for large developers. Here's what individual homeowners and small developers should budget for in time and paperwork.",
    body: [
      "We're often asked how long RERA and local authority approvals really take once design is finalized. The honest answer: it depends on documentation readiness far more than on the design itself.",
      "This post walks through the typical sequence — project registration, town planning sign-off, and revenue clearances — and where delays usually creep in.",
    ],
    date: "2024-11-02",
    readTime: "6 min read",
    category: "Advisory",
    placeholderVariant: 5,
  },
  {
    slug: "designing-for-ahmedabads-climate",
    title: "Designing for Ahmedabad's Climate: Courtyards, Shade, and Cross-Ventilation",
    excerpt:
      "Passive design isn't a luxury in Gujarat's heat — it's the difference between a home that needs constant air-conditioning and one that doesn't.",
    body: [
      "Long before mechanical cooling, courtyard planning solved Gujarat's summer heat. We still lean on the same principles today: stack ventilation, deep shading, and thermal mass, tuned with modern materials.",
      "On recent residential projects, these passive strategies have measurably reduced daytime cooling loads — details we cover project-by-project on our portfolio pages.",
    ],
    date: "2024-08-20",
    readTime: "4 min read",
    category: "Design",
    placeholderVariant: 1,
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
