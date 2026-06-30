# Pass 8 — Security Hardening

**Audit result — all applicable skill patterns already in place:**
- ✅ Honeypot + silent-200 reject (both `/api/contact` + `/api/apply`).
- ✅ `sourcePage` capped at 2048 before persisting the referer header.
- ✅ Read/write client split — `SANITY_API_WRITE_TOKEN` lives only in `client-write.ts` (server-only), imported solely by the two route handlers; no client component imports it (verified by grep).
- ✅ No `SANITY_API_*` token in any `NEXT_PUBLIC_*` var; only non-secret project id/dataset/site-url are public.
- ✅ Secret env files (`frontend/.env.local`, `studio/.env`) gitignored; only `.env.*.example` tracked (verified via `git check-ignore`).
- ✅ Resend sandbox-sender warning in `.env.local.example` + README.
- N/A in lite: defineLive `browserToken`, JSON-LD `<` escaping, revalidate webhook `_type` guard (no such features).

**Change (docs only, per skill — rate limiting belongs in WAF, not code):**
- README → "Security & rate limiting" section: Vercel Firewall rule for `/api/contact` + `/api/apply`, Cloudflare/Upstash alternatives, and the secrets-handling note.

**Verification gate:** README renders; final `npm run validate` + `next build` + `tsc` + `eslint` green (closing whole-project check).
