import { test, expect } from "@playwright/test";
import { DownloadPage } from "./pages/download.page";

test.describe("Download page", () => {
  let download: DownloadPage;

  test.beforeEach(async ({ page }) => {
    download = new DownloadPage(page);
    await download.goto();
  });

  test("renders heading, installer link and quick start", async () => {
    await expect(download.heading).toBeVisible();
    await expect(download.installerLink).toBeVisible();
    await expect(download.installerLink).toHaveAttribute("href", /roadmap-pe\.zip$/);
    await expect(download.quickStart).toBeVisible();
  });

  test("no 'Personal Edition' branding remains", async ({ page }) => {
    await expect(page.getByText(/personal edition/i)).toHaveCount(0);
  });

  test("registry link points at the plugins.json proxy", async () => {
    await expect(download.registryLink).toHaveAttribute("href", "/registry/plugins.json");
  });

  test("back-home link returns to the landing page", async ({ page }) => {
    await download.backHomeLink.click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("capture full-page screenshot", async () => {
    await download.screenshot("download");
  });
});
