import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPostBySlug, posts } from "@/lib/data/posts";
import { site } from "@/lib/constants";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: site.principal,
    },
    publisher: {
      "@type": "ProfessionalService",
      name: site.name,
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={`${new Date(post.date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} · ${post.readTime}`}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PlaceholderImage
          variant={post.placeholderVariant}
          className="aspect-[16/9] rounded-2xl"
        />

        <div className="mt-10 space-y-5 text-base leading-relaxed text-ink-soft">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 border-t border-brand-900/10 pt-8">
          <Link href="/blog" className="text-sm font-semibold text-brand-900 hover:text-gold-700">
            &larr; Back to the journal
          </Link>
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
