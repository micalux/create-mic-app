# Upgrade to Standard Stack

## Summary of Changes
- Next.js App Router structure with strict TypeScript
- Tailwind CSS + minimal shadcn-style components (button, input, dialog placeholder) + sonner toasts
- Firebase Auth client + firebase-admin server verification
- Drizzle ORM setup with Postgres (Supabase-compatible)
- Users table schema and generated SQL migration
- Zod + RHF example form on marketing page
- ESLint (next/core-web-vitals) + Prettier; Husky + lint-staged configured
- Vitest unit test and Playwright placeholder e2e
- GitHub Actions CI: install → typecheck → lint → test

## Env Vars (names only)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY`
- `DATABASE_URL`
- (optional) `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Drizzle Migrations (generated, not run)
- `drizzle/0000_initial_users.sql`

## Manual Test Plan
1. Visit `/api/health` → expect `{ ok: true }`
2. Visit `/` → marketing page renders; submit form validates email (client-only)
3. Without auth, visit `/dashboard` → expect redirect to `/`
4. With valid `session` cookie (Firebase ID token), visit `/dashboard` → see email and no redirect
5. Run `pnpm typecheck && pnpm lint && pnpm test` → all pass
