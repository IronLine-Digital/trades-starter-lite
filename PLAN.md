# Trades Starter Lite — Master Plan

A free, stripped-down **Trades Starter Lite** for Sanity Exchange — the foundation that upsells the full IronLine Trades Starter Kit. Built following the **IronLine build process** (`Agency_Sites/claude-workspace/PROCESS.md`): pass-based, plan-before-code, fetch-live-docs, never touch `.env.local`.

Reference implementation: the full `Agency_Sites/trades-starter` repo (do **not** modify it). Reuse its **field names + component patterns** so a lite→full upgrade feels seamless.

## Stack (matches the full repo)
Monorepo (Sanity Template Kit shape): root workspace + `frontend/` (Next 16.2.4, React 19.2.4, next-sanity 12.3.2, Tailwind v4, `@base-ui/react` + shadcn, zod 4 + react-hook-form 7, resend 6, lucide-react) + `studio/` (standalone **Sanity v5.23.0** + styled-components 6) + `.github/workflows/template-validator.yml`.

## Pages (frontend)
Home (hero + services overview + recent projects + CTA) · Services (list) · Projects (gallery) · Careers (job list + apply form) · Contact (business info + contact form). No detail routes, no About, no page builder.

## Schemas (studio) — keep full-repo field names
- **businessInfo** (singleton): businessName, tagline, logo, tradeType, phone, email, address{street,city,state,zip}, serviceAreas[], hours, licenseNumber, insured, social{facebook,instagram,google}.
- **service**: name, slug, shortDescription, description(block[]), featuredImage, icon, category, featured, order.
- **project**: title, slug, featuredImage, gallery(image[]), description(block[]), category, city, completedDate, featured.
- **jobPosting**: title, slug, employmentType, location, description(block[]), requirements(string[]), active, order.
- **applicationSubmission** (readOnly): name, email, phone, position, message, submittedAt, sourcePage.
- **contactSubmission** (readOnly): name, email, phone, message, submittedAt, sourcePage.

Brief→repo field mappings: service `title`→`name`; project `images`→`gallery`; submissions `timestamp`→`submittedAt`; jobPosting `type`→`employmentType`. `contactSubmission`/`applicationSubmission` are the lite analogs of the full repo's `leadSubmission` (minus the status/notes tracking workflow, which lite excludes).

## Excluded from lite
Page builder / blocks, presentation tool / visual editing / stega / defineLive, lead-tracking dashboard, review & SEO schemas, JSON-LD/sitemap/robots/OG routes, serviceArea + /areas, draft-mode + revalidate routes, About page, detail routes, auth/portal/employee hub.

## Passes (gated — verify before advancing; save pass{N}-plan.md first)
1. **Foundation** — monorepo + studio (6 schemas + structureTool config, no presentation tool) + frontend scaffold + sanity client/env/image.
2. **Seed + GROQ** — frontend queries.ts + studio seed.ts (lightweight).
3. **Frontend pages + components** — 5 pages + ui/ + site/ components.
4. **Design** — fonts, globals.css tokens, sticky header/call button, a11y/perf guardrails.
5. **Backend** — client-write, email.ts (Resend), zod schemas, /api/contact + /api/apply, honeypot.
6. **Production readiness** — README (## Getting Started + full-kit upsell), template-validator workflow, vercel.json, env examples.
7. **Code quality review** — dead code, dupes, field-name consistency.
8. **Security hardening** — honeypot, sourcePage cap, client split, no tokens in NEXT_PUBLIC, Resend warning, rate-limit docs.

## Skill-derived guardrails
`@sanity/image-url` root import; `document.actions` singleton filter (not `__experimental_actions`); `sanity-image.tsx` is `'use client'`; read/write client split; no tokens in `NEXT_PUBLIC_*`; honeypot + silent-200 + sourcePage cap; hero `priority`, card `sizes` (not 100vw), preconnect cdn.sanity.io; label `htmlFor`+`id`; darkened `--muted-foreground`; star rating `role="img"`.

## End-state verification
Studio :3333 (6 types, businessInfo singleton) → `npm run seed` populates → frontend :3000 renders all 5 pages → contact & apply create submission docs + email path → `npm run validate` passes → frontend `build` + `lint` green.
