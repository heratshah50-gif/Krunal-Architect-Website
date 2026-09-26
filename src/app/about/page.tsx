import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CallToAction } from "@/components/CallToAction";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { process } from "@/lib/content";
import { site } from "@/lib/site";

const title = "About the Studio";
const description = `Meet ${site.name}: an architecture and interior design studio led by architect ${site.founder}, creating calm, light-filled and climate-aware spaces.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
};

const values = [
  {
    title: "Light first",
    text: "Every plan starts with the sun: where it rises, how it moves and how it can be invited in or kept out.",
  },
  {
    title: "Honest materials",
    text: "Stone, brick, lime, timber and concrete, used simply, so buildings stay beautiful as they age.",
  },
  {
    title: "Climate-aware",
    text: "Courtyards, overhangs, cross-ventilation and shading reduce reliance on mechanical cooling.",
  },
  {
    title: "Built as drawn",
    text: "Close site coordination makes sure the finished space matches the design we agreed on.",
  },
];

export default function AboutPage() {
  const crumbs = [{ name: "About", path: "/about" }];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHeader
        eyebrow="About"
        title="A small studio with a clear point of view."
        intro={site.description}
        crumbs={crumbs}
      />

      <section className="container-x grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <div aria-hidden className="aspect-[4/5] bg-stone">
            {/* TODO: replace with a portrait of Krunal, e.g. <Image src="/krunal.jpg" … /> */}
            <div className="flex h-full items-end p-6">
              <span className="text-[7rem] font-semibold leading-none tracking-tighter text-ink/10">KA</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-7 md:pl-8">
          <p className="eyebrow">Founder</p>
          <h2 className="h2 mt-4">Ar. {site.founder}</h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-mute">
            <p>
              {site.name} was founded on a simple idea: architecture should make everyday life better. That means
              rooms full of natural light, spaces that stay comfortable through the seasons and details built to last.
            </p>
            <p>
              The studio takes on a focused number of projects at a time, from private homes and villas to offices,
              showrooms and cafés, so that every client works directly with the principal architect from concept to
              completion.
            </p>
            <p>
              Each design responds to its site, its climate and the people who will use it, rather than to a fixed
              style.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-stone/40">
        <div className="container-x py-20 md:py-28">
          <p className="eyebrow">Philosophy</p>
          <h2 className="h2 mt-4">What guides our work</h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="border-t border-ink pt-6">
                <h3 className="text-xl font-medium">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <p className="eyebrow">Process</p>
        <h2 className="h2 mt-4">How a project unfolds</h2>
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {process.map((p) => (
            <li key={p.step} className="grid gap-4 py-8 md:grid-cols-12">
              <span className="text-sm text-mute md:col-span-2">{p.step}</span>
              <h3 className="text-2xl font-medium md:col-span-3">{p.title}</h3>
              <p className="leading-relaxed text-mute md:col-span-7">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CallToAction />
    </>
  );
}
