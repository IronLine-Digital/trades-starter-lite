# Trades Starter Lite

**A free Next.js + Sanity starter for trades and contractor businesses** — electricians, plumbers, HVAC, roofers, landscapers, painters. Services, projects, careers, and a working contact form, content-managed in Sanity and deployable to Vercel.

**▶ [Live demo](https://trades-starter-lite-demo.vercel.app)** — the template running as shipped, with the demo content seeded.

This is the **lite** foundation of the [IronLine Trades Starter Kit](https://ironlinedigital.com/trades-starter). It ships seeded with a fictional electrician (Brightwork Electric) so the site looks real the moment you run it.

## What's included

- **Sanity-managed content** — `businessInfo` (singleton), `service`, `project`, `jobPosting`, plus `contactSubmission` / `applicationSubmission` capture.
- **5 pages** — Home (hero + services + recent projects + CTA), Services, Projects, Careers (with apply form), Contact.
- **Working forms** — contact + job application → saved to Sanity + emailed to the owner via Resend (honeypot spam protection, graceful no-op until email is configured).
- **Standalone Sanity Studio** — singleton-enforced business info, deployable to `*.sanity.studio`.
- **Mobile-first** — sticky tap-to-call bar, Oswald/Montserrat type, brand color tokens.

## Tech stack

- Next.js 16 (App Router, Turbopack) · React 19
- Sanity v5 (standalone Studio) · next-sanity 12 · `@sanity/image-url`
- Tailwind CSS v4 · Base UI + shadcn-style components · lucide-react
- react-hook-form + Zod · Resend (email)
- TypeScript, ESLint · monorepo (`frontend` + `studio`) via npm workspaces

## Getting Started

You need Node 20+ and a free [Sanity account](https://sanity.io/manage).

1. **Create a Sanity project** at [sanity.io/manage](https://sanity.io/manage). Note the **Project ID** and the dataset name (default `production`).
2. **Generate an API token** in your project → **API → Tokens** → add a token with the **Editor** role (used to save form submissions).
3. **Install dependencies** (from the repo root — installs both workspaces):
   ```bash
   npm install
   ```
4. **Configure environment variables.** Copy the examples and fill them in — use the **same project ID** in both files:
   ```bash
   cp studio/.env.example studio/.env
   cp frontend/.env.local.example frontend/.env.local
   ```
   - `studio/.env` → `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`
   - `frontend/.env.local` → `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SITE_URL`, `SANITY_API_WRITE_TOKEN` (and optionally `RESEND_API_KEY` + `OWNER_EMAIL`)
5. **Add a CORS origin** so the Studio and site can read your project:
   ```bash
   npx sanity cors add http://localhost:3333 --credentials
   npx sanity cors add http://localhost:3000 --credentials
   ```
6. **Run it** (Studio on :3333, site on :3000):
   ```bash
   npm run dev
   ```
   Or run them separately with `npm run dev:studio` and `npm run dev:frontend`.
7. **(Optional) Seed demo content** so the site isn't empty — log in once, then seed:
   ```bash
   npx sanity login
   npm run seed
   ```
   > **Seed once, onto an empty dataset.** The seeder writes fixed document IDs, so a
   > re-run replaces whatever now lives at them — including the Business Info
   > singleton holding your name, phone, address and license. It refuses to run once
   > the dataset holds content it didn't create, saved form submissions, or a business
   > name that is no longer the demo one. Override with `SEED_FORCE=1` only when you
   > actually want the demo content back.

Visit [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3333](http://localhost:3333) for the Studio.

## Environment variables

**`frontend/.env.local`**

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Your Sanity project ID (public) |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | Dataset name, e.g. `production` (public) |
| `NEXT_PUBLIC_SITE_URL` | yes | Site URL — `http://localhost:3000` locally |
| `SANITY_API_WRITE_TOKEN` | yes | Editor token — saves contact/application submissions (server only) |
| `RESEND_API_KEY` | optional | Resend API key for owner email notifications |
| `OWNER_EMAIL` | optional | Where form notifications are sent |

**`studio/.env`**

| Variable | Required | Purpose |
|---|---|---|
| `SANITY_STUDIO_PROJECT_ID` | yes | Same project ID as the frontend |
| `SANITY_STUDIO_DATASET` | yes | Same dataset as the frontend |

> **Email note:** `frontend/lib/email.ts` ships with Resend's sandbox sender (`onboarding@resend.dev`). It works for testing but lands in spam. Before production, verify your domain in [Resend](https://resend.com) and change the `from` address. Until `RESEND_API_KEY` + `OWNER_EMAIL` are set, forms still save to Sanity — they just skip the email.

## Project structure

```
trades-starter-lite/
├── frontend/                 # Next.js 16 public site
│   ├── app/                  # home, services, projects, careers, contact, api/{contact,apply}
│   ├── components/{ui,site}/ # primitives + header/footer/hero/cards/forms
│   ├── lib/                  # utils, format, email, zod schemas, types
│   └── sanity/lib/           # client (read), client-write, image, queries, fetch
└── studio/                   # standalone Sanity Studio
    ├── schemaTypes/          # businessInfo, service, project, jobPosting, *Submission
    └── scripts/seed.ts       # demo content seeder
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Run Studio (:3333) + frontend (:3000) together |
| `npm run dev:frontend` / `npm run dev:studio` | Run one at a time |
| `npm run build` | Production build of the frontend |
| `npm run build:studio` | Build the Studio |
| `npm run deploy:studio` | Deploy the Studio to `*.sanity.studio` |
| `npm run seed` | Seed demo content onto an empty dataset (run `npx sanity login` first) |
| `npm run lint` | Lint the frontend |
| `npm run validate` | Run the Sanity template validator |

## Deploy

- **Frontend → Vercel:** import the repo and set the **Root Directory** to `frontend`. Add the `frontend/.env.local` variables in the Vercel dashboard. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the production URL and add it to CORS:
  ```bash
  npx sanity cors add https://your-project.vercel.app --credentials
  ```
- **Studio → Sanity:** `npm run deploy:studio` publishes it to `https://<your-studio>.sanity.studio`.

## Customizing

| Want to change | Edit |
|---|---|
| Business name, phone, hours, services | **Business Info in the Studio** — no code. Page titles, `<title>` tags and OG cards all read from it. |
| Brand color | `--brand` in `frontend/app/globals.css` |
| Fonts | `frontend/app/layout.tsx` (swap the `next/font/google` pair) |
| Favicon | replace `frontend/app/icon.svg` |
| Service icons | the `ICONS` map in `frontend/components/site/service-card.tsx` |
| Demo content | `studio/scripts/seed.ts` (read the seeding note above before re-running) |

## Security & rate limiting

The contact and application forms include a hidden honeypot field (blocks naive bots), validate input with Zod, and cap stored header values. Tokens (`SANITY_API_WRITE_TOKEN`, `RESEND_API_KEY`) are server-only — never prefixed with `NEXT_PUBLIC_` — and live only in `.env.local` / `.env` (gitignored; only `.env.*.example` is committed).

Before going live with real traffic, add a rate limit so a scripted client can't flood the form endpoints (junk submissions + burned Resend quota):

- **Vercel (recommended):** Project → **Firewall → Rate Limiting** → add a rule matching `/api/contact` and `/api/apply` (POST), e.g. **5 requests / 5 min per IP**, action **Deny**. No code changes. On the Hobby plan, use the [`@vercel/firewall`](https://www.npmjs.com/package/@vercel/firewall) SDK in the route handlers.
- **Not on Vercel:** put Cloudflare's free WAF in front and rate-limit those paths, or add [`@upstash/ratelimit`](https://github.com/upstash/ratelimit) (Upstash Redis) at the top of each route handler.

## Upgrade to the full Trades Starter Kit

Need **visual editing, applicant tracking, an employee hub, and full SEO tooling?** The [full Trades Starter Kit](https://ironlinedigital.com/trades-starter) includes all of that and more. This lite template uses the same schema field names and component patterns, so upgrading is a natural step up — not a rewrite.

## License

MIT — free to use for client and personal projects.
