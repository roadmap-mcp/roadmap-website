import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for the Roadmap marketing site.
 *
 * Tests live in `tests/`, page objects in `tests/pages/`. Screenshots are written
 * to `screenshots/` by the specs. The dev server is started automatically (or an
 * already-running one on :3000 is reused).
 */
export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
  ],
  // Run e2e against a production server: pages are prerendered, so there's no
  // on-demand dev compilation (which can crash Next's compile workers under the
  // parallel load of a full run). A stray dev server on :3000 is not reused.
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
