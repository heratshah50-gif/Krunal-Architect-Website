import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PostCard } from "@/components/blog/PostCard";
import { getPosts } from "@/sanity/lib/queries";
import { site } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Journal",
  description: `Notes on design, valuation, and regulatory advisory from ${site.name}.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="The Journal"
        title="Notes on design, valuation & compliance"
        description="Practical, plain-language writing on the questions clients actually ask us — before, during, and after a project."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
