import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * The landing page ("/"): hero, promo video, plugin architecture, recipes,
 * how-it-works, local pillars and CTA.
 */
export class HomePage extends BasePage {
  readonly path = "/";

  constructor(page: Page) {
    super(page);
  }

  // ── Hero ──────────────────────────────────────────────────────────────
  get heroHeading(): Locator {
    return this.page.getByRole("heading", {
      level: 1,
      name: /modular platform for building software with AI/i,
    });
  }

  get explorePatternsCta(): Locator {
    return this.page.getByRole("link", { name: "Explore the patterns" });
  }

  get browseAllPatternsCta(): Locator {
    return this.page.getByRole("link", { name: "Browse all patterns" });
  }

  // ── Sections (anchored by id) ─────────────────────────────────────────
  get video(): Locator {
    return this.page.locator("#demo video");
  }

  get architectureSection(): Locator {
    return this.page.locator("#architecture");
  }

  get patternsSection(): Locator {
    return this.page.locator("#patterns");
  }

  /** A pattern card (a link) by its title, e.g. "Context Engineering". */
  patternCard(title: string): Locator {
    return this.patternsSection.getByRole("link").filter({
      has: this.page.getByRole("heading", { level: 3, name: title, exact: true }),
    });
  }

  /** Nav link in the sticky top bar. */
  navLink(name: string): Locator {
    return this.header.getByRole("link", { name });
  }
}
