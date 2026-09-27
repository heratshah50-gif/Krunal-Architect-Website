export type Testimonial = {
  clientName: string;
  clientRole: string;
  quote: string;
  projectSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    clientName: "Ritesh & Payal Mehta",
    clientRole: "Homeowners, Shivranjani Residence",
    quote:
      "Krunal understood what we wanted before we could fully explain it ourselves. The courtyard he designed has genuinely changed how our family spends time together.",
    projectSlug: "shivranjani-residence",
  },
  {
    clientName: "Ansh Patel",
    clientRole: "Director, Krupal Business Centre",
    quote:
      "The approval process for a commercial building can be brutal. Having design and advisory under one roof saved us months and a lot of back-and-forth with authorities.",
    projectSlug: "krupal-business-centre",
  },
  {
    clientName: "Dr. Neha Shah",
    clientRole: "Owner, Riverside Clinic",
    quote:
      "Patients comment on how calm the clinic feels — that was entirely the brief, and the team delivered it without inflating the budget.",
    projectSlug: "riverside-clinic",
  },
];
