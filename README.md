# create-mic-app

A CLI tool to scaffold a production-ready Next.js application with a modern, opinionated tech stack.

## Quick Start

```bash
# Create a new app
npx create-mic-app@latest my-app

# Navigate to the project
cd my-app

# Install dependencies
pnpm install  # or npm install

# Start development server
pnpm dev  # or npm run dev
```

## What You Get

When you create a new app with `create-mic-app`, you get a fully configured Next.js application with:

### 🎯 Core Technologies

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript (strict mode enabled)
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### 🔐 Authentication

- **[Firebase Auth](https://firebase.google.com/products/auth)** - Complete authentication solution
- **Firebase Admin SDK** - Server-side token verification
- Protected routes with automatic redirects
- User session management

### 💾 Database

- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Production database (Supabase-compatible)
- Ready-to-use user schema with Firebase integration
- Database migrations setup

### 📝 Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant form library
- **[Zod](https://zod.dev/)** - Schema validation
- Type-safe form handling with TypeScript integration

### 🧪 Testing

- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Playwright](https://playwright.dev/)** - E2E testing framework
- Pre-configured test setup

### 🛠️ Developer Experience

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[Lint-staged](https://github.com/okonet/lint-staged)** - Run linters on staged files
- TypeScript path aliases configured (`@/components/*`, `@/lib/*`, `@/db/*`)

## Project Structure

The scaffolded project includes:

```
my-app/
├── app/                      # Next.js App Router
│   ├── (app)/               # Authenticated app routes
│   │   └── dashboard/       # Protected dashboard page
│   ├── (marketing)/         # Public marketing pages
│   │   └── page.tsx        # Landing page with form example
│   ├── api/                 # API routes
│   │   └── health/         # Health check endpoint
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── src/
│   ├── components/
│   │   └── ui/             # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── sonner.tsx  # Toast notifications
│   ├── db/
│   │   ├── index.ts        # Database client
│   │   └── schema/
│   │       └── users.ts    # User schema
│   └── lib/
│       ├── auth/
│       │   └── verifyToken.server.ts  # Server-side auth
│       ├── firebase/
│       │   ├── admin.ts    # Firebase Admin SDK
│       │   └── client.ts   # Firebase client SDK
│       └── utils.ts        # Utility functions
├── drizzle/                 # Database migrations
├── e2e/                     # Playwright tests
├── drizzle.config.ts       # Drizzle configuration
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vitest.config.ts        # Vitest configuration
```

## Available Scripts

Your new project comes with these npm scripts:

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `typecheck` - Check TypeScript types
- `test` - Run unit tests
- `test:watch` - Run tests in watch mode
- `e2e` - Run Playwright tests
- `e2e:ui` - Open Playwright test UI
- `drizzle:generate` - Generate database migrations

## Required Environment Variables

Create a `.env.local` file with these variables:

```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=  # Use escaped newlines (\n)

# Database
DATABASE_URL=  # PostgreSQL connection string

# Optional: Supabase (if using Supabase for Postgres)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Use from CLI

[[memory:5837702]]

### Installation Options

```bash
# From npm (latest stable version)
npx create-mic-app@latest my-app

# From GitHub branch (development version)
npx -y -p git+https://github.com/micalux/create-mic-app.git#main create-mic-app my-app

# From local clone (for development)
git clone https://github.com/micalux/create-mic-app.git
cd create-mic-app
node ./bin/cli.js ../my-app
```

### CLI Options

- `--fast` - Use smart defaults and minimal prompts
- `--status` - Show template information
- `--connect` - Reserved for future features
- `--auth` - Reserved for future features
- `--database` - Reserved for future features

## Features Out of the Box

### ✅ Authentication Flow
- Sign up / Sign in with Firebase
- Protected routes requiring authentication
- Server-side token verification
- Automatic user creation in database

### ✅ Database Integration
- Type-safe database queries with Drizzle ORM
- PostgreSQL with migration support
- User management integrated with Firebase Auth
- Ready for Supabase or any PostgreSQL provider

### ✅ UI Components
- Pre-styled components from shadcn/ui
- Toast notifications with Sonner
- Form components with validation
- Responsive design with Tailwind CSS

### ✅ Developer Tools
- Hot reload in development
- Type checking and linting
- Git hooks for code quality
- Organized project structure

## Next Steps After Creating Your App

1. **Set up environment variables** - Add your Firebase and database credentials
2. **Install dependencies** - Run `pnpm install` or `npm install`
3. **Start developing** - Run `pnpm dev` to start the development server
4. **Customize** - Modify the template to fit your needs

## Publishing to npm

To publish this CLI tool to npm:

1. Ensure `package.json` has the correct configuration:
   - `"bin": { "create-mic-app": "./bin/cli.js" }`
   - `"files": ["bin", "template"]`
2. Test locally with `pnpm pack`
3. Publish with `npm publish --access public`

## License

MIT

## Support

For issues and questions, please visit [GitHub Issues](https://github.com/micalux/create-mic-app/issues).