#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_ROOT = path.resolve(__dirname, '..');

async function copyTemplate(targetDir) {
  const exclude = new Set([
    'node_modules',
    '.git',
    '.next',
    'coverage',
    'dist',
    'pnpm-lock.yaml',
  ]);

  await fs.ensureDir(targetDir);

  const items = await fs.readdir(TEMPLATE_ROOT);
  for (const item of items) {
    if (exclude.has(item)) continue;
    const src = path.join(TEMPLATE_ROOT, item);
    const dest = path.join(targetDir, item);
    await fs.copy(src, dest, {
      filter: (srcPath) => {
        const rel = path.relative(TEMPLATE_ROOT, srcPath);
        if (!rel) return true;
        const parts = rel.split(path.sep);
        return !parts.some((p) => exclude.has(p));
      },
    });
  }
}

async function updatePackageName(targetDir, projectName) {
  const pkgPath = path.join(targetDir, 'package.json');
  if (!(await fs.pathExists(pkgPath))) return;
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'));
  pkg.name = projectName === '.' ? path.basename(targetDir) : projectName;
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
}

async function createApp(projectName, options) {
  const targetDir = path.resolve(process.cwd(), projectName || '.');
  const exists = await fs.pathExists(targetDir);
  if (!exists) await fs.ensureDir(targetDir);

  console.log(chalk.cyan.bold('🚀 Creating project...'));
  await copyTemplate(targetDir);
  await updatePackageName(targetDir, projectName || path.basename(targetDir));

  console.log('');
  console.log(chalk.green('✔ Project files created at:'), targetDir);
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${projectName === '.' ? path.basename(targetDir) : projectName}`);
  console.log('  pnpm install');
  console.log('  pnpm dev');
  console.log('');
}

async function showStatus(targetPath) {
  console.log(chalk.cyan('Status'));
  console.log('- Stack: Next.js + Tailwind + shadcn + Firebase + Drizzle + Zod');
  console.log('- Database: Postgres via DATABASE_URL');
}

program
  .name('create-mic-app')
  .description('CLI to scaffold a Next.js standard stack app (Firebase Auth, Drizzle + Postgres, Tailwind, shadcn)')
  .argument('[project-name]', 'Name of the project to create (or "." for current directory)')
  .option('--fast', 'Use smart defaults and minimal prompts')
  .option('--connect', 'Connect services to existing project mode')
  .option('--auth', 'Reserved flag for auth connection (not required for this template)')
  .option('--database [provider]', 'Reserved flag for database connection (postgres)')
  .option('--status', 'Show connection status')
  .action(async (projectName, options) => {
    try {
      if (options.connect || (options.status && !projectName)) {
        const targetPath = process.cwd();
        if (options.status) {
          await showStatus(targetPath);
        } else {
          console.log(chalk.yellow('Connect mode is not required for this standard template. Configure env vars as per README.'));
        }
        return;
      }
      await createApp(projectName || '.', options);
    } catch (err) {
      console.error(chalk.red('❌ Error:'), err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });

program.parseAsync();
