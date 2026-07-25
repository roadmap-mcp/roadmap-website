import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";

const PATTERNS = ["Context Engineering", "Source Enrichment & Augmentation", "AI-Assisted Roundtrip"];

test.describe("Home page", () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test("renders the hero and platform positioning", async () => {
    await expect(home.heroHeading).toBeVisible();
    await expect(home.explorePatternsCta).toBeVisible();
    // The removed hero badge ("...software engineering") must be gone; the pattern-
    // language heading ("...software development") carries the framing.
    await expect(
      home.page.getByText("pattern language for AI-centered software engineering", { exact: false }),
    ).toHaveCount(0);
    await expect(
      home.page.getByRole("heading", { name: /pattern language for AI-centered software development/i }),
    ).toBeVisible();
  });

  test("brand is 'Roadmap MCP' and no 'Personal Edition' remains", async ({ page }) => {
    await expect(home.wordmark).toBeVisible();
    await expect(page.getByText(/personal edition/i)).toHaveCount(0);
  });

  test("promo video is fully visible below the hero (not clipped)", async ({ page }) => {
    await expect(home.video).toBeVisible();
    const heroBox = await page.locator("section").first().boundingBox();
    const videoBox = await home.video.boundingBox();
    expect(heroBox).not.toBeNull();
    expect(videoBox).not.toBeNull();
    // The whole video must sit below the hero's bottom edge (no overlap).
    expect(videoBox!.y).toBeGreaterThan(heroBox!.y + heroBox!.height);
  });

  test("architecture section lists real plugin packages", async () => {
    await expect(home.architectureSection).toBeVisible();
    await expect(home.architectureSection.getByText("roadmap-plugin-context", { exact: true })).toBeVisible();
    await expect(home.architectureSection.getByText("roadmap-plugin-jira", { exact: true })).toBeVisible();
  });

  test("patterns preview shows the patterns and no role workbenches", async ({ page }) => {
    await expect(home.patternsSection).toBeVisible();
    for (const title of PATTERNS) {
      await expect(home.patternCard(title)).toBeVisible();
    }
    // The aspirational role workbenches were removed.
    for (const removed of ["Business Analyst", "Tester Workbench", "Solution Architect", "Technical Designer"]) {
      await expect(page.getByText(removed, { exact: false })).toHaveCount(0);
    }
  });

  test("a pattern card links to its detail page", async ({ page }) => {
    await home.patternCard("Context Engineering").click();
    await expect(page).toHaveURL(/\/patterns\/context-engineering$/);
    await expect(page.getByRole("heading", { level: 1, name: "Context Engineering" })).toBeVisible();
  });

  test("hero CTA and nav go to the patterns page", async ({ page }) => {
    await home.explorePatternsCta.click();
    await expect(page).toHaveURL(/\/patterns$/);
    await expect(page.getByRole("heading", { level: 1, name: /pattern language/i })).toBeVisible();
  });

  test("capture full-page screenshot", async () => {
    await home.screenshot("home");
  });
});
