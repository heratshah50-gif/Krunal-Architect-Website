import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CmsImage } from "@/components/ui/CmsImage";
import { RichText } from "@/components/ui/RichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPostBySlug, getPostSlugs } from "@/sanity/lib/queries";
import { site } from "@/lib/constants";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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
  const post = await getPostBySlug(slug);

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
        <CmsImage
          image={post.image}
          placeholderVariant={post.placeholderVariant}
          alt={post.title}
          className="aspect-[16/9] rounded-2xl"
        />

        <RichText value={post.body} className="mt-10 text-base leading-relaxed text-ink-soft" />

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
