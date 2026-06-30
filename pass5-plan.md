# Pass 5 — Backend (forms + email)

**Scope:** make the two forms work end to end. No SEO/areas/webhook (excluded from lite).

## Files
- `frontend/sanity/lib/client-write.ts` — server-only write client (`SANITY_API_WRITE_TOKEN`, `useCdn:false`, `perspective:'published'`). Warns if token missing.
- `frontend/lib/email.ts` — Resend wrapper: `sendContactEmail` + `sendApplicationEmail`. Graceful no-op + console.warn when `RESEND_API_KEY`/`OWNER_EMAIL` unset. Sandbox sender `onboarding@resend.dev`; HTML + text with escaping. Best-effort (never throws to the route).
- `frontend/app/api/contact/route.ts` — POST: honeypot silent-200 → `contactSchema.parse` (400 on ZodError/bad JSON) → cap `sourcePage` to 2048 → `writeClient.create({_type:'contactSubmission', ...submittedAt})` (502 on write fail) → `sendContactEmail` (best-effort) → `{ok:true}`.
- `frontend/app/api/apply/route.ts` — same shape → `applicationSubmission` (+ `position`).

## Skill security guardrails applied
honeypot + silent-200; `sourcePage` capped at 2048; read/write client split (write client server-only, never imported by client code); no tokens in `NEXT_PUBLIC_*`; email best-effort so a delivery failure never loses the submission.

## Verification gate
- `next build` + `tsc` + `eslint` clean.
- Live (prod server): POST valid contact → `200 {ok:true}`; bad body → `400`; honeypot populated → `200` with **no** doc written; POST valid apply → `200`.
- API check: exactly 1 `contactSubmission` + 1 `applicationSubmission` created; honeypot created none. Email no-ops cleanly (RESEND unset). **Clean up** the test docs afterward.
