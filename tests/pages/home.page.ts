import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * The landing page ("/"): a values-driven page — hero ("AI you can build on."),
 * manifesto, three audience sections (developers / testers / architects & leaders),
 * trust band, and CTA. The technical content lives on /architecture.
 */
export class HomePage extends BasePage {
  readonly path = "/";

  constructor(page: Page) {
    super(page);
  }

  get heroHeading(): Locator {
    return this.page.getByRole("heading", { level: 1, name: /AI you can\s*build on/i });
  }

  /** The hero section's primary CTAs (scoped to the first section, not the nav). */
  get heroSection(): Locator {
    return this.page.locator("section").first();
  }
  get downloadCta(): Locator {
    return this.heroSection.getByRole("link", { name: "Download" });
  }
  get howItWorksCta(): Locator {
    return this.heroSection.getByRole("link", { name: "How it works" });
  }

  /** An audience section headline (h2). */
  audienceHeading(name: string | RegExp): Locator {
    return this.page.getByRole("heading", { level: 2, name });
  }
  /** An audience "learn more" link by its text. */
  audienceLink(name: string): Locator {
    return this.page.getByRole("link", { name });
  }

  get trustHeading(): Locator {
    return this.page.getByRole("heading", { name: /Local\.\s*Inspectable\.\s*Yours\./i });
  }

  /** Nav link in the sticky top bar. */
  navLink(name: string): Locator {
    return this.header.getByRole("link", { name });
  }
}
