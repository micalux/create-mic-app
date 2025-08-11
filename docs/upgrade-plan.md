# Upgrade Plan

This repository is being upgraded to the standard stack and project shape defined in `SPECS.md`.

## Scope
- Convert repository to Next.js App Router project with strict TypeScript.
- Add Tailwind CSS, shadcn/ui baseline components, and lucide-react.
- Implement Firebase Auth (client) and `firebase-admin` verification (server).
- Add Drizzle ORM with Postgres (Supabase-compatible), schema, and generated SQL migrations.
- Add Zod + react-hook-form example.
- Add ESLint + Prettier, Husky + lint-staged, and CI workflow.
- Add Vitest unit test and Playwright basic e2e.

## Structure (result)
- `app/(marketing)/page.tsx`
- `app/(app)/dashboard/page.tsx` (protected)
- `app/api/health/route.ts`
- `src/db/schema/users.ts`
- `src/db/index.ts`
- `src/lib/firebase/client.ts`
- `src/lib/firebase/admin.ts`
- `src/lib/auth/verifyToken.server.ts`
- `src/lib/utils.ts`
- `drizzle.config.ts`
- `drizzle/` (generated SQL)
- `docs/upgrade-plan.md`
- `docs/upgrade-questions.md`

## Key Decisions
- Use cookie named `session` to store Firebase ID token on client; server validates via `firebase-admin`.
- Protect dashboard by server-side verification in the server component; redirect unauthenticated users to `/`.
- Use Drizzle with `pg` driver. No migrations executed automatically; only generated into `drizzle/`.
- shadcn/ui components are vendored into the repo (non-interactive), matching current Tailwind setup.

## Commands (pnpm)
- `pnpm dev` — Next dev server
- `pnpm build` — Next build
- `pnpm start` — Next start
- `pnpm lint` — ESLint
- `pnpm typecheck` — TypeScript `--noEmit`
- `pnpm test` — Vitest unit tests
- `pnpm e2e` — Playwright tests
- `pnpm drizzle:generate` — Generate Drizzle SQL migrations

## Acceptance
- `pnpm i` succeeds
- `pnpm lint`, `pnpm typecheck`, `pnpm test` pass
- Public page renders; dashboard requires auth
- Drizzle SQL migrations generated and documented in PR


