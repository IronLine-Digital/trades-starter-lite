# Pass 3 — Frontend Pages + Components

**Scope:** the 5 public pages + site/UI components rendering the seeded content. Forms render and POST to `/api/contact` and `/api/apply` (which 404 until Pass 5 — acceptable). No SEO/detail routes.

## Files
- `app/globals.css` — ported design-token system (needed for shadcn/Base UI components to render). Fonts + brand tuning land in Pass 4.
- `app/layout.tsx` — Header + main + Footer.
- `lib/format.ts` — phone/date/hours helpers + `humanize` (employmentType).
- `sanity/lib/fetch.ts` — `sanityFetch<T>(query, params)` wrapping `client.fetch` with `{next:{revalidate:60}}` (lite replacement for defineLive).
- `lib/schemas/{contact,application}.ts` — zod (shared client + Pass 5 routes).
- `components/ui/{button,card,input,label,textarea}.tsx` — ported (Base UI + cva).
- `components/site/`:
  - `sanity-image.tsx` (`'use client'`, custom CDN loader), `portable-text.tsx` (ported)
  - `header.tsx`, `footer.tsx` — adapted: nav = Services/Projects/Careers/Contact; social trimmed to fb/ig/google; uses `sanityFetch`
  - `hero.tsx`, `cta.tsx` — new (static, businessInfo-driven; replace the page-builder blocks)
  - `service-card.tsx` (icon-by-name + category; display-only), `project-card.tsx` (category/city/date; display-only), `job-card.tsx` (new)
  - `contact-form.tsx` (name/email/phone/message + honeypot), `apply-form.tsx` (name/email/phone/position/message + honeypot)
- Pages: `app/page.tsx` (home), `app/services/page.tsx`, `app/projects/page.tsx`, `app/careers/page.tsx`, `app/contact/page.tsx`.

## Verification gate
- `next build` succeeds and prerenders `/`, `/services`, `/projects`, `/careers`, `/contact` (fetching seeded content).
- `tsc --noEmit` clean; `eslint` clean.
- Dev server: each route returns 200 with seeded content visible.
