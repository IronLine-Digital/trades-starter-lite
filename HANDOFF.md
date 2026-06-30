# HANDOFF — Trades Starter Lite (read this first)

**Last updated:** 2026-06-30 (**Passes 1–8 complete — build done, validator-passing**). **Process:** IronLine pass-based build (`Agency_Sites/claude-workspace/PROCESS.md`), pass-gated with a check-in after each pass.

## What this is
A free, stripped-down **Trades Starter Lite** for Sanity Exchange. Monorepo (`frontend/` Next 16 + `studio/` Sanity v5). Reference = full `Agency_Sites/trades-starter` repo (untouched). See `PLAN.md` for the master plan, `pass{N}-plan.md` for each pass.

## Coordinates
| Thing | Value |
|---|---|
| Repo | `D:\dev\Agency_Sites\trades-starter-lite` (git init'd) |
| Reference (full kit) | `D:\dev\Agency_Sites\trades-starter` — do not modify |
| Process docs | `Agency_Sites/claude-workspace/PROCESS.md`, `sanity-trades-starter.skill` |
| Sanity project | **`jyq5959y`** (org Amginia), dataset `production`. CORS: localhost:3000 + :3333. Read/write tokens live in the gitignored env files only (`frontend/.env.local`, and a write token for seeding). |
| Frontend env | `frontend/.env.local.example` (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SITE_URL, SANITY_API_WRITE_TOKEN, RESEND_API_KEY, OWNER_EMAIL) |
| Studio env | `studio/.env.example` (SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET) |

## Status tracker
- [x] **Pass 1 — Foundation** ✅ frontend build/tsc/lint green; studio tsc + `sanity build` green. Sanity project `jyq5959y` created + wired.
- [x] **Pass 2 — Seed + GROQ** ✅ queries.ts + sanity-types.ts + seed.ts. Seed run live → 1 businessInfo / 4 services / 3 projects / 2 jobPostings (verified via API; images on CDN). frontend tsc clean.
- [x] **Pass 3 — Frontend pages + components** ✅ 5 pages (home/services/projects/careers/contact) + ui/ + site/ components. `next build` prerenders all routes with seeded content baked in; tsc + lint clean. Forms POST to /api/contact + /api/apply (404 until Pass 5). globals.css design tokens ported (fonts/brand tuning in Pass 4).
- [x] **Pass 4 — Design** ✅ Oswald/Montserrat via next/font, mobile sticky call bar, cdn.sanity.io preconnect. Build/tsc/lint green; verified in built HTML.
- [x] **Pass 5 — Backend (forms + email)** ✅ client-write + email.ts (Resend, best-effort no-op) + /api/contact + /api/apply. Live-tested: valid→200, bad→400, honeypot→silent 200 (no doc), apply→200; 1 contact + 1 application written then cleaned up (dataset back to 0). build/tsc/lint green.
- [x] **Pass 6 — Production readiness + Exchange validator** ✅ root README (## Getting Started + full-kit upsell), `.github/workflows/validate.yml` (sanity-io/template-validator@v2), `frontend/vercel.json`, `validate` script + devDep. `npm run validate` → "Template validated successfully". build green.
- [x] **Pass 7 — Code quality review** ✅ no unused imports/vars (lint), field names consistent end-to-end. Deduped: forms → shared `useFormSubmit` hook + `FormSuccess`; pages → shared `PageHeader`. build/tsc/lint green; behavior preserved (forms last live-verified Pass 5; not browser-retested).
- [x] **Pass 8 — Security hardening** ✅ audit: honeypot, sourcePage cap, read/write client split (write token server-only, grep-verified), no tokens in NEXT_PUBLIC_, secret env files gitignored (git check-ignore), Resend warning. README "Security & rate limiting" section added (Vercel WAF guidance). Final validate + build + tsc + lint green.

## Key deviations from the brief (intentional)
- Stack is **Next 16 / Sanity v5** (not the brief's "Next 15 / Sanity v3") — matches the full repo for seamless upgrade + this dev environment. Confirmed with user.
- Field names follow the full repo (service `name`, project `gallery`, submissions `submittedAt`, jobPosting `employmentType`) rather than the brief's literal names — for seamless lite→full upgrade.

## Remaining (manual / when ready)
1. ~~Sanity project~~ ✅ `jyq5959y` created + seeded.
2. **Not committed yet** (commit-on-request) — the whole build is uncommitted; say the word to commit + push to a GitHub repo.
3. **Browser-test the forms** — deferred by user; submit `/contact` + `/careers` in a real browser (`/verify`) before relying on them.
4. **Resend** — set `RESEND_API_KEY` + `OWNER_EMAIL` (and swap the `from` domain) to enable owner emails; forms save without it.
5. **Deploy** — Vercel (root dir `frontend`) + `npm run deploy:studio`; add prod CORS origin.
6. **Submit to Sanity Exchange** — push public repo, then submit via community.sanity.tools (needs a 1200×750 screenshot + description).
