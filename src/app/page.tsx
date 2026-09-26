import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
import { CallToAction } from "@/components/CallToAction";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { process, projects, services } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  const [hero, ...rest] = projects;

  return (
    <>
      <JsonLd data={faqSchema()} />

      {/* Hero */}
      <section className="container-x grid gap-10 pt-14 pb-20 md:grid-cols-12 md:pt-24 md:pb-28">
        <div className="md:col-span-7 md:pr-8">
          <p className="eyebrow">{site.tagline}</p>
          <h1 className="display mt-6">Architecture shaped by light, material and the way you live.</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mute">
            {site.name} designs homes, workplaces and hospitality spaces that feel calm, open and timeless, and
            sees each one through from first sketch to final handover.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/projects" className="btn">
              View projects
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Start a project
            </Link>
          </div>
        </div>
        <Link href={`/projects/${hero.slug}`} className="group block md:col-span-5" aria-label={`Featured project: ${hero.title}`}>
          <ProjectVisual project={hero} priority sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5]" />
          <p className="mt-3 text-sm text-mute">
            Featured — <span className="text-ink group-hover:underline underline-offset-4">{hero.title}</span>, {hero.location}
          </p>
        </Link>
      </section>

      {/* About teaser */}
      <section className="border-y border-line bg-stone/40">
        <div className="container-x grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <p className="eyebrow md:col-span-3">The studio</p>
          <div className="md:col-span-9">
            <h2 className="h2 max-w-3xl">
              We believe good buildings are quiet ones: honest materials, generous daylight and spaces that age well.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-mute">
              Led by architect {site.founder}, the studio works closely with every client, balancing design ambition
              with budget, climate and the realities of construction.
            </p>
            <Link href="/about" className="mt-8 inline-block text-sm underline underline-offset-8 hover:no-underline">
              About the studio →
            </Link>
          </div>
        </div>
      </section>

      {/* Selected projects */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="h2 mt-4">Recent projects</h2>
          </div>
          <Link href="/projects" className="text-sm underline underline-offset-8 hover:no-underline">
            All projects →
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-line">
        <div className="container-x py-20 md:py-28">
          <p className="eyebrow">What we do</p>
          <h2 className="h2 mt-4">Services</h2>
          <ul className="mt-12 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.id} className="border-r border-b border-line">
                <Link href={`/services#${s.id}`} className="group flex h-full flex-col p-8 transition-colors hover:bg-ink hover:text-paper">
                  <span className="text-xs text-mute group-hover:text-paper/60">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-xl font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute group-hover:text-paper/70">{s.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-stone/40 border-t border-line">
        <div className="container-x py-20 md:py-28">
          <p className="eyebrow">How we work</p>
          <h2 className="h2 mt-4">From first conversation to handover</h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <li key={p.step} className="border-t border-ink pt-6">
                <span className="text-sm text-mute">{p.step}</span>
                <h3 className="mt-3 text-xl font-medium">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <p className="eyebrow">Questions</p>
          <h2 className="h2 mt-4">Frequently asked</h2>
        </div>
        <div className="md:col-span-8">
          <Faq />
        </div>
      </section>

      <CallToAction />
    </>
  );
}
