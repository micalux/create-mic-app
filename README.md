# create-mic-app

Standard Next.js stack boilerplate per `SPECS.md`.

## Stack
- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS + shadcn/ui (minimal vendored) + lucide-react
- Firebase Auth (client) + firebase-admin (server verification)
- Drizzle ORM + Postgres (Supabase-compatible)
- Zod + React Hook Form
- Vitest (unit) + Playwright (e2e)

## Project Structure
- `app/(marketing)/page.tsx` — public landing page with a Zod + RHF example
- `app/(app)/dashboard/page.tsx` — protected route, requires Firebase token
- `app/api/health/route.ts` — health check `{ ok: true }`
- `src/db/schema/users.ts` — Drizzle schema
- `src/db/index.ts` — Drizzle db client (node-postgres)
- `src/lib/firebase/*` — client and admin Firebase init
- `src/lib/auth/verifyToken.server.ts` — server verification + user upsert
- `src/lib/utils.ts` — Tailwind `cn`
- `drizzle.config.ts` + `drizzle/` — generated SQL migrations (do not run)
- `docs/upgrade-plan.md`, `docs/upgrade-questions.md`, `docs/PR_BODY.md`

## Scripts
- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm e2e`
- `pnpm drizzle:generate`

## Env Vars (names only)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY` (escaped `\n`)
- `DATABASE_URL`
- (optional) `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Development
1. Install dependencies with pnpm
2. Ensure env vars are set (do not commit `.env*`)
3. `pnpm dev`

## Testing
- `pnpm typecheck && pnpm lint && pnpm test`
- Playwright e2e placeholder is provided; wire to a running app as needed.

See `docs/upgrade-plan.md` for details. 