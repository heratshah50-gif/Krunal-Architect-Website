import type { PortableTextBlock } from "@/lib/portableText";

export type SanityImageValue = {
  _type?: "image";
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
} | null | undefined;

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  excerpt: string;
  body: PortableTextBlock[];
  featured?: boolean;
  placeholderVariant: number;
  image?: SanityImageValue;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: PortableTextBlock[];
  date: string;
  readTime: string;
  category: string;
  placeholderVariant: number;
  image?: SanityImageValue;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  points: string[];
  icon: "compass" | "scale" | "shield";
};

export type Testimonial = {
  clientName: string;
  clientRole: string;
  quote: string;
  projectSlug?: string;
  image?: SanityImageValue;
};

export type AboutContent = {
  bio: PortableTextBlock[];
  credentials: string[];
  philosophy: { title: string; description: string }[];
  heroImage?: SanityImageValue;
};
