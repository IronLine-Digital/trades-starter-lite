# Pass 7 — Code Quality Review

**Review findings**
- ✅ No unused imports/vars (eslint clean across the codebase).
- ✅ Field names consistent end-to-end: contact (name/email/phone/message) and apply (+position) match form → zod → API route → submission schema. No drift.
- ✅ No dead queries/types — every export in `queries.ts` is consumed; `sanity-types` types back the projections.
- ⚠️ **Duplication:** the two forms repeat status state + honeypot/fetch/error logic + the success card. → extract.
- ⚠️ **Duplication:** the four list pages repeat the same page-header markup. → extract.
- Kept intentionally: shadcn `card.tsx` full sub-export set (primitive completeness); the extensible `ICONS` map in `service-card.tsx`.

**Changes**
- `frontend/lib/use-form-submit.ts` — hook: status + honeypot read + POST + error handling (returns success boolean).
- `frontend/components/site/form-success.tsx` — shared success card.
- `frontend/components/site/page-header.tsx` — shared `<h1>` + subtitle header.
- Refactor `contact-form.tsx` + `apply-form.tsx` onto the hook + `FormSuccess` (behavior-preserving).
- Refactor `services/projects/careers/contact` pages onto `PageHeader`.

**Verification gate:** `next build` (all routes prerender, content intact) + `tsc` + `eslint` clean; no behavior change.
