# Pass 2 — Seed Data + GROQ Queries

**Scope:** all GROQ queries (frontend) + a lightweight seed script (studio). No frontend pages/components yet.

## Files
- `frontend/lib/sanity-types.ts` — TS interfaces for every projection (SanityImage, Address, Hours, BusinessInfo, Service, Project, JobPosting).
- `frontend/sanity/lib/queries.ts` — `defineQuery` named queries with a shared `IMAGE` fragment, static slice caps (no dynamic subscripts):
  - `businessInfoQuery` (singleton, all display fields + logo)
  - `servicesQuery` (all, ordered featured/order/name) + `featuredServicesQuery` ([0...6], homepage)
  - `projectsQuery` (all, ordered featured/date) + `recentProjectsQuery` ([0...3], homepage)
  - `activeJobPostingsQuery` (active only, [0...50]) — also feeds the apply-form position dropdown
- `studio/scripts/seed.ts` — `getCliClient` + `transaction().createOrReplace(...)` (re-runnable). Seeds a fictional electrician "Brightwork Electric" (Raleigh, NC): 1 businessInfo + 4 services + 3 projects + 2 jobPostings. Best-effort image uploads from picsum.photos → Sanity CDN (doc still created if an upload fails).

## Verification gate
- `npm run seed` (with auth) prints ✅ seeded counts.
- `query_documents` / count confirms: 1 businessInfo, 4 service, 3 project, 2 jobPosting in `production`.
- frontend `tsc --noEmit` clean with the new queries/types.
