// Fallback content from the v3 design, shown until testimonials are added in
// Sanity Studio. These are placeholders — replace with real client quotes.
export type Testimonial = {
  clientName: string;
  clientRole: string;
  quote: string;
  projectSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    clientName: "Rajesh Patel",
    clientRole: "Managing Director, Patel Developers",
    quote:
      "Working with Krunal Shah on our residential project was incredibly smooth. He managed the creative architectural design and simultaneously cleared complex AMC approvals in record time.",
  },
  {
    clientName: "Anand Shah",
    clientRole: "Director, Sovereign Infrastructure Group",
    quote:
      "As a developer, legal delays are highly expensive. KS Architects' dual expertise in town planning liaisons and government valuation protected our commercial project's bottom line completely.",
  },
  {
    clientName: "Dr. Meera Vyas",
    clientRole: "Homeowner, Science City Road",
    quote:
      "Krunal Shah's team delivered a magnificent, structurally sound home for my family. The valuation document they structured was also instantly accepted by our bank. Highly recommended.",
  },
];
