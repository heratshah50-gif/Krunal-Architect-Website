// Single source of truth for business details. Every page, the JSON-LD
// structured data, the sitemap and llms.txt read from here, so update these
// values once and the whole site (and what search engines / AI see) follows.
//
// TODO: replace the placeholder values below with the real studio details.

export const site = {
  name: "Krunal Architect",
  legalName: "Krunal Architect",
  founder: "Krunal",
  tagline: "Architecture & Interior Design Studio",
  description:
    "Krunal Architect is an architecture and interior design studio creating calm, light-filled homes, workplaces and public spaces — from first sketch to final handover.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://krunalarchitect.com",
  email: "hello@krunalarchitect.com",
  phone: "+91 00000 00000",
  whatsapp: "910000000000",
  address: {
    street: "Studio address line",
    city: "City",
    region: "State",
    postalCode: "000000",
    country: "IN",
  },
  // Used for the LocalBusiness "areaServed" field and on-page copy.
  areaServed: ["City", "State", "India"],
  hours: "Mo-Sa 10:00-19:00",
  hoursLabel: "Monday – Saturday, 10:00 – 19:00",
  social: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  mapEmbedUrl: "",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
