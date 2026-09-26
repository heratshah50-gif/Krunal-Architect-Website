import Link from "next/link";

export function CallToAction() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-x flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <div>
          <p className="eyebrow text-paper/50">Start a project</p>
          <h2 className="display mt-4 max-w-2xl">Have a site, a space or an idea? Let&apos;s talk.</h2>
        </div>
        <Link href="/contact" className="btn border-paper bg-paper text-ink hover:bg-transparent hover:text-paper">
          Book a consultation
        </Link>
      </div>
    </section>
  );
}
