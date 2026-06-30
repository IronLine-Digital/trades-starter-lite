# Pass 4 — Design

**Scope:** fonts, brand polish, mobile sticky call button, perf/a11y guardrails. No schema/query/data changes.

## Files
- `app/layout.tsx` — load **Oswald** (headings) + **Montserrat** (body) via `next/font/google`, wiring `--font-heading` / `--font-sans` (consumed by `globals.css` `@theme` + base layer). Add `<link rel="preconnect" href="https://cdn.sanity.io">` (React 19 hoists). Mount `StickyCallButton`; add `pb-16 md:pb-0` so the mobile bar never covers footer content.
- `components/site/sticky-call-button.tsx` — new, mobile-only (`md:hidden`) fixed bottom bar: "Call now" (tel:) + "Free estimate" (/contact).

## Already satisfied (from Pass 3 token port / skill guardrails)
- `--muted-foreground` darkened for WCAG (in globals.css).
- Card image `sizes` set (not 100vw); `sanity-image.tsx` is `'use client'` with CDN loader + LQIP blur.
- Form labels associated via `FormField` (`htmlFor` + generated `id`).
- Brand color = electric blue `oklch(0.55 0.18 250)` — fits the electrician demo; documented as the one-line rebrand point (`--brand` in globals.css). No change needed.
- No hero/LCP image (text hero on charcoal) and no star ratings → `priority`/`role="img"` guardrails N/A.

## Verification gate
- `next build` green (fonts fetch at build), all routes still prerender.
- `tsc --noEmit` + `eslint` clean.
- Heading font (Oswald) + body font (Montserrat) applied; mobile sticky bar renders.
