import { getTestimonials } from "@/sanity/lib/queries";

export async function TestimonialGrid() {
  const testimonials = await getTestimonials();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">
          Client Voices
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-brand-900 sm:text-4xl">
          What clients say
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.clientName}
            className="flex flex-col rounded-2xl border border-brand-900/10 bg-white p-7"
          >
            <span aria-hidden="true" className="font-display text-4xl text-gold-400">
              &ldquo;
            </span>
            <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-brand-900/10 pt-4">
              <p className="text-sm font-semibold text-brand-900">
                {testimonial.clientName}
              </p>
              <p className="text-xs text-ink-soft">{testimonial.clientRole}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
