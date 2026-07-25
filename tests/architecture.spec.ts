import { test, expect } from "@playwright/test";
import { ArchitecturePage } from "./pages/architecture.page";

test.describe("Architecture page", () => {
  let arch: ArchitecturePage;

  test.beforeEach(async ({ page }) => {
    arch = new ArchitecturePage(page);
    await arch.goto();
  });

  test("lists real plugin packages, including the new ones", async () => {
    await expect(arch.heading).toBeVisible();
    for (const pkg of ["roadmap-plugin-context", "roadmap-plugin-e2e", "roadmap-plugin-brain"]) {
      await expect(arch.architectureSection.getByText(pkg, { exact: true })).toBeVisible();
    }
  });

  test("shows how-it-works and the promo video", async () => {
    await expect(arch.howSection).toBeVisible();
    await expect(arch.video).toBeVisible();
  });

  test("capture full-page screenshot", async () => {
    await arch.screenshot("architecture");
  });
});
