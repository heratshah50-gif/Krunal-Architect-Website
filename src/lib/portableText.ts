export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children: { _type: "span"; _key: string; text: string }[];
};

/** Wraps plain paragraph strings (the fallback content format) into minimal Portable Text blocks. */
export function toPortableText(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, index) => ({
    _type: "block" as const,
    _key: `block-${index}`,
    style: "normal",
    children: [{ _type: "span" as const, _key: `span-${index}`, text }],
  }));
}

/** Deterministic 0-5 index so a project/post without a real photo always gets the same placeholder art. */
export function variantFromSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash % 6;
}
