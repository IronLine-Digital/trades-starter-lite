# Pass 6 — Production Readiness + Exchange compliance

**Scope:** make the template Sanity-Exchange-submittable + deployable.

## Files
- `.github/workflows/validate.yml` — official action (`sanity-io/template-validator@v2`, on push). Mirrors the template-kit.
- root `package.json` — `validate` script = `sanity-template-validate`; devDep `@sanity/template-validator@^2`.
- `frontend/vercel.json` — framework nextjs + baseline security headers.
- root `README.md` — Sanity-Template-Kit format with the **required `## Getting Started`** H2 (step-by-step), env-var tables, project structure, scripts table, deploy notes (Vercel root=frontend; `sanity deploy` for studio; CORS reminder), customization, and the **full-kit upsell** linking ironlinedigital.com/trades-starter with the exact line from the brief.
- env templates already finalized (no whitespace around `=`); `frontend/.env.local.example` carries the Resend sandbox-domain warning.

## Verification gate
- `npm install` adds the validator.
- `npm run validate` passes (Studio config + frontend config + env templates + `## Getting Started` detected).
- frontend `next build` still green.
