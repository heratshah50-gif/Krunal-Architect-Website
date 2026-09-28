import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { CmsImage } from "@/components/ui/CmsImage";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <CmsImage
        image={post.image}
        placeholderVariant={post.placeholderVariant}
        label={post.category}
        alt={post.title}
        className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">
          {formatDate(post.date)} &middot; {post.readTime}
        </p>
        <h3 className="font-display mt-2 text-xl font-semibold text-brand-900">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center text-sm font-semibold text-gold-700">
          Read article
          <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
