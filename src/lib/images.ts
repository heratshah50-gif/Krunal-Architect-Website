import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/lib/types";

/**
 * Resolves a displayable URL: the Sanity-uploaded photo when there is one,
 * otherwise the bundled fallback photo, otherwise null (caller shows placeholder art).
 */
export function imageSrc(
  image: SanityImageValue,
  localImage?: string,
  width = 1600
): string | null {
  if (image?.asset) return urlFor(image).width(width).quality(80).auto("format").url();
  return localImage ?? null;
}
