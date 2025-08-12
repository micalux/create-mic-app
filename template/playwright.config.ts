import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  // Intentionally omit webServer to not start dev server in this repo context.
});
