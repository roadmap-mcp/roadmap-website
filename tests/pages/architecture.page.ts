import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * The /architecture page: the technical story — "Everything is a plugin", the plugin
 * grid, how-it-works, a patterns teaser, and the promo video.
 */
export class ArchitecturePage extends BasePage {
  readonly path = "/architecture";

  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole("heading", { level: 1, name: /Everything is a plugin/i });
  }

  get architectureSection(): Locator {
    return this.page.locator("#architecture");
  }

  get howSection(): Locator {
    return this.page.locator("#how");
  }

  get video(): Locator {
    return this.page.locator("#demo video");
  }
}
