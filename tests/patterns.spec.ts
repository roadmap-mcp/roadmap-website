import { test, expect } from "@playwright/test";
import { PatternsPage } from "./pages/patterns.page";
import { PatternDetailPage } from "./pages/pattern-detail.page";

const ALL_TITLES = [
  "Context Engineering",
  "Source Enrichment & Augmentation",
  "AI-Assisted Roundtrip",
];

test.describe("Patterns overview", () => {
  let patterns: PatternsPage;

  test.beforeEach(async ({ page }) => {
    patterns = new PatternsPage(page);
    await patterns.goto();
  });

  test("lists every pattern in the language", async () => {
    await expect(patterns.heading).toBeVisible();
    for (const title of ALL_TITLES) {
      await expect(patterns.card(title)).toBeVisible();
    }
  });

  test("no removed role workbenches remain", async ({ page }) => {
    for (const removed of ["Business Analyst", "Tester Workbench", "Solution Architect", "Technical Designer"]) {
      await expect(page.getByText(removed, { exact: false })).toHaveCount(0);
    }
  });

  test("a card navigates to the pattern page", async ({ page }) => {
    await patterns.card("AI-Assisted Roundtrip").click();
    await expect(page).toHaveURL(/\/patterns\/ai-assisted-roundtrip$/);
  });

  test("capture full-page screenshot", async () => {
    await patterns.screenshot("patterns");
  });
});

test.describe("Pattern detail (classic structure)", () => {
  test("renders Context / Problem / Solution and cross-references", async ({ page }) => {
    const detail = new PatternDetailPage(page, "source-enrichment");
    await detail.goto();

    await expect(detail.title).toHaveText("Source Enrichment & Augmentation");
    await expect(page.getByText("SourceEnrichment", { exact: true })).toBeVisible();

    for (const label of ["Context", "Consider these patterns first", "Problem", "Solution", "Consider next"]) {
      await expect(detail.section(label)).toBeVisible();
    }

    // "Consider first" links back to the foundational pattern by its PascalCase name.
    await expect(detail.crossRef("ContextEngineering")).toBeVisible();
    await detail.crossRef("ContextEngineering").first().click();
    await expect(page).toHaveURL(/\/patterns\/context-engineering$/);
  });

  test("foundational pattern notes it has no prerequisites", async ({ page }) => {
    const detail = new PatternDetailPage(page, "context-engineering");
    await detail.goto();
    await expect(detail.section("Consider these patterns first")).toBeVisible();
    await expect(page.getByText(/foundational pattern/i)).toBeVisible();
  });

  test("back link returns to the overview", async ({ page }) => {
    const detail = new PatternDetailPage(page, "ai-assisted-roundtrip");
    await detail.goto();
    await detail.backToAll.click();
    await expect(page).toHaveURL(/\/patterns$/);
  });

  test("capture a detail-page screenshot", async ({ page }) => {
    const detail = new PatternDetailPage(page, "context-engineering");
    await detail.goto();
    await detail.screenshot("pattern-context-engineering");
  });
});
