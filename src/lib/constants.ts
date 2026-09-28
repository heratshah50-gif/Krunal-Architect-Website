export const site = {
  name: "KS Architects",
  legalName: "KS Architects",
  principal: "Krunal Shah",
  tagline: "Thoughtful Architecture. Trusted Advisory.",
  description:
    "KS Architects is an Ahmedabad-based architecture, valuation, and advisory practice led by Krunal Shah, delivering considered design alongside land & building valuation and regulatory advisory services.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ksarchitects.in",
  phone: "+91 98792 45098",
  phoneDisplay: "+91 98792 45098",
  landline: "079 4890 2015",
  email: "asitarch@gmail.com",
  address: {
    line1: "402, Krupal Pathshala",
    line2: "Shivranjani Cross Road",
    city: "Ahmedabad",
    state: "Gujarat",
    zip: "380015",
    country: "IN",
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
  },
} as const;

export const fullAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city} - ${site.address.zip}`;

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;
export const whatsappUrl = `https://wa.me/${site.phone.replace(/\D/g, "")}`;
export const mapsDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Krupal+Pathshala,+Shivranjani+Cross+Road,+Ahmedabad+380015";
export const mapsEmbedUrl =
  "https://www.google.com/maps?q=Krupal+Pathshala,+Shivranjani+Cross+Road,+Ahmedabad+380015&output=embed";

// Homepage section anchors — the main site is a single long page (v3 design).
export const navLinks = [
  { href: "/#top", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;
