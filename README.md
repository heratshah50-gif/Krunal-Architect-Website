# KS Architects — Website

Marketing site for **KS Architects**, an Ahmedabad-based architecture, valuation, and advisory practice led by Krunal Shah. Built with Next.js (App Router, TypeScript), Tailwind CSS v4, and no external services required to run.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's here (Phase 1)

This is the first build phase from the project plan: a fully designed, responsive, SEO/GEO-ready site with placeholder content, wired end-to-end but not yet connected to a CMS.

- **Pages:** Home, About, Services, Portfolio (+ category filter, project detail pages), Journal/Blog (+ post pages), Contact.
- **Branding:** Logo and color palette (`#200000` maroon, `#dea72e` gold) extracted from the client's actual stationery/business card (`KS_STATIONARY_FINAL.pdf`). Photography is placeholder abstract line-art (`src/components/ui/PlaceholderImage.tsx`) until real project photos are supplied.
- **Contact form:** Fully functional — validates client- and server-side (`src/lib/validations/contact.ts`, `src/app/api/contact/route.ts`) and appends submissions to `data/inquiries.json`. **This local-file storage works for local development but will not persist on serverless hosts like Vercel** (ephemeral filesystem) — see "Next phases" below.
- **SEO/GEO:** Per-route metadata, JSON-LD (`ProfessionalService`, `Article`, `CreativeWork`, `BreadcrumbList`), `sitemap.xml`, `robots.txt`, and `llms.txt` (all in `src/app/`).

Content lives in plain TypeScript data files under `src/lib/data/` — edit those directly to change copy, projects, or blog posts for now.

## Next phases (not yet built)

Per the project plan, still to come:

1. **CMS integration** (Sanity, embedded at `/studio`) so the client can edit content himself without a developer.
2. **Contact form backend upgrade**: replace local JSON storage with a CMS-stored lead + an email notification (e.g. via Resend) so submissions reach the client reliably in production.
3. **Real content**: swap in real project photography, blog posts, and any About-page detail beyond the current placeholders.
4. **Domain + deployment**: connect a purchased domain via Vercel and update `site.url` in `src/lib/constants.ts`.

## Project structure

```
src/app/            routes (App Router)
src/components/      layout/, sections/, portfolio/, blog/, contact/, seo/, ui/
src/lib/constants.ts site info (name, contact, address, nav)
src/lib/data/        placeholder content (projects, posts, services, testimonials, about)
src/lib/validations/ zod schemas
public/images/       logo + extracted brand assets
```
