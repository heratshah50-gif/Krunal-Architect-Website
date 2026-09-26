# Krunal Architect Website

Official website for **Krunal Architect**, an architecture and interior design studio. It is a fast, minimal monochrome site built for search engines (SEO) and AI answer engines (GEO).

**Pages:** Home · About · Projects (filterable gallery + a page per project) · Services · Contact

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router), fully static pages
- React 19 + TypeScript
- Tailwind CSS 4

## SEO & GEO features

- A unique title, description, canonical URL and Open Graph/Twitter tags on every page
- Auto-generated `sitemap.xml`, `robots.txt`, web manifest and social share image
- schema.org JSON-LD: `ProfessionalService`/`LocalBusiness`, `WebSite`, `BreadcrumbList`, `CreativeWork` per project, `Service` list, `FAQPage`
- `/llms.txt`: a plain-text summary of the studio for AI assistants (ChatGPT, Claude, Perplexity…)
- Semantic HTML, all content server-rendered, accessible navigation

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

Everything lives in two files. Update them once and every page, the structured data, the sitemap and llms.txt all follow.

| File | What's in it |
|---|---|
| `src/lib/site.ts` | Studio name, phone, email, address, city, hours, social links, domain |
| `src/lib/content.ts` | Projects, services, process steps, FAQs |

**Before going live, replace the placeholders** (marked `TODO`): address, phone, WhatsApp number, email, city/areas served, social links and domain. The six projects are samples; replace them with real work.

### Adding project photos

1. Put images in `public/projects/<project-slug>/`, e.g. `public/projects/courtyard-house/cover.jpg`
2. Set `cover: "/projects/courtyard-house/cover.jpg"` on that project in `src/lib/content.ts`

Until a cover is set, each project shows a generated monochrome illustration.

## Deploy

Deploy for free on [Vercel](https://vercel.com/new): import this repo and click Deploy. Set the environment variable `NEXT_PUBLIC_SITE_URL` to your real domain (e.g. `https://krunalarchitect.com`) so canonical URLs and the sitemap are correct.

After launch, submit `https://<your-domain>/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and create a [Google Business Profile](https://business.google.com) for local search.
