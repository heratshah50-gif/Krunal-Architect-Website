import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@/lib/portableText";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
    h3: ({ children }) => (
      <h3 className="font-display mt-6 mb-2 text-xl font-semibold text-brand-900">{children}</h3>
    ),
  },
};

export function RichText({ value, className = "" }: { value: PortableTextBlock[]; className?: string }) {
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
