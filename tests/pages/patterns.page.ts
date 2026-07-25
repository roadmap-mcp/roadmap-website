import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

/** The pattern-language overview page ("/patterns"). */
export class PatternsPage extends BasePage {
  readonly path = "/patterns";

  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole("heading", { level: 1, name: /pattern language for AI-centered software development/i });
  }

  /** A pattern card (link) by its display title. */
  card(title: string): Locator {
    return this.page.getByRole("link").filter({
      has: this.page.getByRole("heading", { level: 3, name: title, exact: true }),
    });
  }
}
