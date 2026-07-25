import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";

test.describe("Home page", () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test("hero shows the 'AI you can build on' tagline and CTAs", async () => {
    await expect(home.heroHeading).toBeVisible();
    await expect(home.downloadCta).toBeVisible();
    await expect(home.howItWorksCta).toBeVisible();
  });

  test("brand is 'Roadmap MCP' and no 'Personal Edition' remains", async ({ page }) => {
    await expect(home.wordmark).toBeVisible();
    await expect(page.getByText(/personal edition/i)).toHaveCount(0);
  });

  test("shows the three audience sections", async () => {
    await expect(home.audienceHeading("Give your AI the right context.")).toBeVisible();
    await expect(home.audienceHeading("Author tests by talking.")).toBeVisible();
    await expect(home.audienceHeading("One brain for the whole team.")).toBeVisible();
  });

  test("developer audience links to the context pattern", async ({ page }) => {
    await home.audienceLink("Explore context engineering").click();
    await expect(page).toHaveURL(/\/patterns\/context-engineering$/);
  });

  test("tester audience links to the test-design pattern", async ({ page }) => {
    await home.audienceLink("See AI test design").click();
    await expect(page).toHaveURL(/\/patterns\/test-design$/);
  });

  test("architect audience links to the company-brain pattern", async ({ page }) => {
    await home.audienceLink("Meet the Company Brain").click();
    await expect(page).toHaveURL(/\/patterns\/company-brain$/);
  });

  test("trust band communicates the core values", async ({ page }) => {
    await expect(home.trustHeading).toBeVisible();
    for (const v of ["Runs locally", "Database-free", "Open source", "Bring your own AI"]) {
      await expect(page.getByText(v, { exact: true }).first()).toBeVisible();
    }
  });

  test("hero 'How it works' goes to the architecture page", async ({ page }) => {
    await home.howItWorksCta.click();
    await expect(page).toHaveURL(/\/architecture$/);
    await expect(page.getByRole("heading", { level: 1, name: /Everything is a plugin/i })).toBeVisible();
  });

  test("capture full-page screenshot", async () => {
    await home.screenshot("home");
  });
});
