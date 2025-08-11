# Upgrade Questions / Assumptions

The following items are assumed or need confirmation. If correct, no action needed; otherwise please clarify.

1. Repository conversion: We will replace the existing CLI-focused layout with a Next.js application layout as per `SPECS.md`. The original CLI code will be removed/moved as necessary.
2. Database URL: We will expect a standard Postgres `DATABASE_URL` (Supabase-compatible). No RLS or Supabase-specific client usage is required unless `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` are provided.
3. Authentication cookie: We will store the Firebase ID token in a `session` cookie (HTTPOnly). If you prefer a different cookie name, please advise.
4. Deployment targets: No Cloudflare-specific deployment files will be added unless requested; CI is limited to typecheck/lint/test.
5. shadcn/ui: We will vendor a minimal set of components (`button`, `input`, `form`, `dialog`, `toast`) without running interactive init scripts.


