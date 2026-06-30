# Pass 1 — Foundation

**Scope:** monorepo skeleton + standalone Sanity v5 Studio (all 6 schemas + structure config) + Next.js 16 frontend scaffold + Sanity client wiring. **No** pages, components, queries, seed, or API routes (those are Passes 2–5).

## Files

### Root
- `package.json` — npm workspaces `["frontend","studio"]`; scripts dev/dev:frontend/dev:studio/build/build:studio/deploy:studio/seed/lint/validate; devDep `concurrently`.
- `.gitignore` — node_modules, .next, dist, .env*, .sanity, .vercel.
- `PLAN.md`, `pass1-plan.md`, `HANDOFF.md`.

### studio/ (standalone Sanity v5.23.0)
- `package.json` — sanity ^5.23.0, @sanity/vision ^5.23.0, react/react-dom ^19.2.4, styled-components ^6.4.1, lucide-react ^1.14.0; dev typescript/@types/react(-dom). scripts dev/build/deploy/start/seed.
- `sanity.config.ts` — `structureTool` ONLY (no presentationTool). businessInfo singleton via `document.actions` filter + `newDocumentOptions`. Desk: Business Info (singleton) · Services · Projects · Job Postings · divider · Contact Submissions · Application Submissions. visionTool for dev.
- `sanity.cli.ts` — `defineCliConfig({api:{projectId,dataset}})` from `SANITY_STUDIO_*`, autoUpdates.
- `tsconfig.json`, `.env.example` (`SANITY_STUDIO_PROJECT_ID=`, `SANITY_STUDIO_DATASET=production`).
- `schemaTypes/{index,businessInfo,service,project,jobPosting,contactSubmission,applicationSubmission}.ts` — trimmed per master plan, full-repo field names preserved.

### frontend/ (Next 16.2.4)
- `package.json` — deps per probe (Next/React/next-sanity/@sanity/image-url/@base-ui/react/shadcn/zod/react-hook-form/@hookform/resolvers/@portabletext/react/resend/cva/clsx/tailwind-merge/tw-animate-css/lucide-react); dev tailwind v4/eslint/eslint-config-next 16.2.4/babel-plugin-react-compiler/types/prettier/typescript. (No nuqs — no portfolio filters in lite.)
- `next.config.ts` (reactCompiler + images.remotePatterns cdn.sanity.io + images.unsplash.com), `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `components.json`, `.env.local.example`.
- `sanity/env.ts` (NEXT_PUBLIC_* projectId/dataset/apiVersion), `sanity/lib/client.ts` (useCdn:true, **no stega**), `sanity/lib/image.ts` (urlFor).
- `lib/utils.ts` (cn).
- Minimal `app/{layout.tsx,globals.css,page.tsx}` placeholder so dev/build boot (real pages in Pass 3; tokens in Pass 4). Placeholder page does NOT import the Sanity client (keeps build env-free).

## Verification gate
- `npm install` (root) clean.
- `tsc --noEmit` clean in **both** workspaces.
- frontend `eslint` clean.
- frontend `next build` succeeds (placeholder page, no Sanity calls → no env needed).
- studio: schemas + config typecheck (`tsc --noEmit`).

## Deferred to the Pass 1→2 check-in (needs a Sanity project)
Live `sanity dev` boot + browser confirmation of the 6 types + businessInfo singleton requires a real `SANITY_STUDIO_PROJECT_ID`/dataset. At the check-in: either create a fresh Sanity project via the Sanity MCP, or get projectId/dataset + an Editor token from the user. Live studio boot + seed verification then happen at the start of Pass 2.
