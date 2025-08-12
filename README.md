# create-mic-app (CLI)

CLI to scaffold a Next.js standard stack app (Next.js App Router, Tailwind, shadcn/ui, Firebase Auth, Drizzle, Zod) from the `template/` directory.

## Usage

- From npm (after publish):
```bash
npx create-mic-app my-app
```

- From GitHub branch (before publish):
```bash
npx -y -p git+https://github.com/micalux/create-mic-app.git#chore/upgrade-standard-stack create-mic-app my-app
```

- From local clone:
```bash
node ./bin/cli.js my-app
```

## What it does
- Copies `template/` into the target directory
- Renames `template/package.json` name field to your project name
- Prints next steps: `pnpm install` and `pnpm dev`

## Template stack
See `template/README.md` for full details (env vars, scripts, structure).

## Publish notes
- Remove `private: true` and run `npm publish` to publish the CLI as `create-mic-app`.
- Ensure package.json has:
  - `"bin": { "create-mic-app": "./bin/cli.js" }`
  - `"files": ["bin", "template"]`
- Test with `pnpm pack` and `pnpm dlx file:./<tgz> create-mic-app test-app` before publishing.