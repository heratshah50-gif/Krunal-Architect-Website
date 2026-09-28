# KS Architects — Website

Marketing site for **KS Architects**, an Ahmedabad-based architecture, valuation, and advisory practice led by Krunal Shah. Built with Next.js (App Router, TypeScript), Tailwind CSS v4, and Sanity (headless CMS).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No credentials are required to run the site locally — see "Going live" below for what activates once you add them.

## What's here

- **Pages:** Home, About, Services, Portfolio (+ category filter, project detail pages), Journal/Blog (+ post pages), Contact.
- **Branding:** Logo and color palette (`#200000` maroon, `#dea72e` gold) extracted from the client's actual stationery/business card (`KS_STATIONARY_FINAL.pdf`).
- **CMS:** Sanity, embedded at `/studio` (`sanity.config.ts`, schemas in `src/sanity/schemaTypes/`). Content types: Project, Journal Post, Service, Testimonial, Project Category, About Page, and Inquiry (contact-form leads). Krunal edits everything there — no code required.
- **Fallback content:** Until a real Sanity project is configured (see below), every page automatically falls back to the placeholder content in `src/lib/data/` (`src/sanity/lib/queries.ts` handles this transparently) — so the site is always fully populated, in dev or in a fresh deploy, before Studio has real content.
- **Photos:** real photos uploaded in Studio render via `src/components/ui/CmsImage.tsx`; anything without a photo yet falls back to abstract brand-colored line-art (`PlaceholderImage.tsx`) instead of a broken image.
- **Contact form:** validates client- and server-side (`src/lib/validations/contact.ts`, `src/app/api/contact/route.ts`). Tries to write a lead to Sanity + email a notification via Resend; if those aren't configured yet, falls back to appending `data/inquiries.json` locally (dev-only — doesn't persist on Vercel).
- **SEO/GEO:** per-route metadata, JSON-LD (`ProfessionalService`, `Article`, `CreativeWork`, `BreadcrumbList`), `sitemap.xml`, `robots.txt` (disallows `/studio`), and `llms.txt`.

## Going live: what you need to do

Copy `.env.local.example` to `.env.local` and fill in:

1. **Sanity** — create a free project at [sanity.io/manage](https://sanity.io/manage), create a `production` dataset, and generate an API token with **Editor** permission. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_API_WRITE_TOKEN`.
2. **Resend** — create an account at [resend.com](https://resend.com), verify a sending domain, generate an API key. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`.
3. Run `npm run seed` once to populate Sanity with the current placeholder content (projects, posts, services, testimonials, about page), so Studio starts populated instead of empty. Delete `scripts/seed-sanity.ts` afterward if you like.
4. Open `/studio`, log in with your Sanity account, and start replacing placeholder content with the real thing — swap in photos, rewrite copy, add new projects.
5. **Deploy:** connect this repo to Vercel, add all the env vars from `.env.local` to the Vercel project, and add your Vercel domain(s) + `localhost:3000` to Sanity's CORS origins (Manage → API → CORS Origins, allow credentials).

Nothing above requires further code changes — the app already tries Sanity/Resend first and only falls back to placeholders when they're not configured.

## Project structure

```
src/app/              routes (App Router), incl. api/contact and studio/[[...tool]]
src/components/       layout/, sections/, portfolio/, blog/, contact/, seo/, ui/
src/lib/constants.ts  site info (name, contact, address, nav)
src/lib/data/         placeholder/fallback content (projects, posts, services, testimonials, about)
src/lib/validations/  zod schemas
src/sanity/           Sanity client, GROQ queries, schemas, Studio structure
sanity.config.ts       Studio configuration
scripts/seed-sanity.ts one-off script to populate a real Sanity dataset
public/images/         logo + extracted brand assets
```
