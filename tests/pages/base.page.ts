import type { Page, Locator } from "@playwright/test";

/**
 * Shared elements present on every page of the site (the sticky top bar with the
 * Roadmap wordmark, and the footer). Concrete page objects extend this.
 */
export abstract class BasePage {
  readonly page: Page;

  /** Path this page lives at, e.g. "/" or "/download". */
  abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
  }

  get header(): Locator {
    return this.page.locator("header");
  }

  /** The "Roadmap MCP" wordmark in the top bar. */
  get wordmark(): Locator {
    return this.header.getByText("Roadmap MCP", { exact: true }).first();
  }

  get footer(): Locator {
    return this.page.locator("footer");
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  /** Full-page screenshot into `screenshots/<name>.png`. */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
}
