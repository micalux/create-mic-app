# Boilerplate Upgrade Specs

## Stack (authoritative)
- **Framework:** Next.js (latest, App Router, RSC, Server Actions)
- **Lang:** TypeScript (strict)
- **UI:** Tailwind CSS + shadcn/ui + lucide-react
- **Auth:** Firebase Auth (client) + `firebase-admin` (server verification)
- **DB:** Supabase Postgres
- **ORM & Migrations:** Drizzle ORM + drizzle-kit
- **Validation:** Zod
- **Forms:** react-hook-form + @hookform/resolvers/zod
- **Pkg manager:** pnpm
- **Tests:** Playwright (e2e) + Vitest (unit)
- **Style:** functional programming only (no classes)

## Env Vars (names only — do not add values)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY` (escaped `\n`)
- `DATABASE_URL` (Supabase Postgres)
- (optional) `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` if client uses Supabase

> Never edit `.env*`. In PR body, list any new keys required.

## Required Project Shape (minimum)
app/
(marketing)/page.tsx
(app)/dashboard/page.tsx # protected
api/health/route.ts # { ok: true }
src/
db/schema/*.ts
db/index.ts
lib/firebase/client.ts
lib/firebase/admin.ts
lib/auth/verifyToken.server.ts
lib/utils.ts
drizzle.config.ts
drizzle/ # SQL migrations (generated)
docs/
upgrade-plan.md # your plan (<=200 lines)


## Implementation Tasks
1. **Next.js + TS**: App Router structure above; strict TS.
2. **Tailwind**: configure `tailwind.config.ts`, `postcss.config.js`, and `app/globals.css`.
3. **shadcn/ui**: init; add `button`, `input`, `form`, `dialog`, `toast`.
4. **Auth flow**
   - Client: Firebase Web SDK for sign-in/sign-out.
   - Server: verify Firebase ID token with `firebase-admin` in Server Actions or API routes.
   - On first verified request, **upsert** user in Postgres by `firebaseUid`.
5. **Database (Drizzle + Supabase)**
   - `src/db/schema/users.ts` minimal fields: `id (uuid pk)`, `firebaseUid (unique)`, `email`, `createdAt`, `updatedAt`.
   - Generate migration SQL via drizzle-kit into `drizzle/` (do not run).
6. **Validation & Forms**: Zod schemas for inputs; RHF with zod resolver on one example form.
7. **Testing**
   - Vitest: 1 small unit test (pure util).
   - Playwright: 1 e2e happy path (unauth → redirect; auth → dashboard).
8. **DX**
   - ESLint (next/core-web-vitals) + Prettier.
   - `husky` + `lint-staged` pre-commit (typecheck, lint, format staged).
   - Minimal GitHub Actions: install → typecheck → lint → test.

## Commands (pnpm)
- Install deps: `pnpm add <pkg>` / `pnpm add -D <pkg>`
- shadcn: `npx shadcn@latest init` / `npx shadcn@latest add <component>`
- Drizzle: `pnpm drizzle-kit generate`  _(user applies migrations manually)_
- Lint / types / tests: `pnpm lint` / `pnpm typecheck` / `pnpm test`

## Guardrails
- Do **not** mix package managers.
- Do **not** commit secrets or edit `.env*`.
- Do **not** start/stop the dev server.
- Keep PRs focused; include summary, env vars list, migrations, manual test plan.

## Acceptance Criteria
- `pnpm i` succeeds.
- `pnpm lint`, `pnpm typecheck`, `pnpm test` pass.
- Public page renders; dashboard requires auth.
- Drizzle SQL migrations generated and documented in PR.
