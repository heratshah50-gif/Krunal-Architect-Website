import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { SanityImageValue } from "@/lib/types";

/**
 * Renders a real Sanity-hosted photo when one has been uploaded, and falls
 * back to the abstract brand-colored placeholder art otherwise — so pages
 * never show a broken image while content is still being populated.
 */
export function CmsImage({
  image,
  placeholderVariant,
  label,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  image?: SanityImageValue;
  placeholderVariant: number;
  label?: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  if (!image?.asset) {
    return (
      <PlaceholderImage variant={placeholderVariant} label={label} className={className} />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={urlFor(image).width(1200).quality(80).url()}
        alt={image.alt || alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
