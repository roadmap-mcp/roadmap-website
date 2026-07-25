import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * A single pattern's page ("/patterns/<slug>"), laid out in the classic pattern
 * form: Name, Context, Consider first, Problem, Solution, Consider next.
 */
export class PatternDetailPage extends BasePage {
  readonly slug: string;
  readonly path: string;

  constructor(page: Page, slug: string) {
    super(page);
    this.slug = slug;
    this.path = `/patterns/${slug}`;
  }

  get title(): Locator {
    return this.page.getByRole("heading", { level: 1 });
  }

  /** A classic pattern field by its label (Context, Problem, Solution, …). */
  section(label: string): Locator {
    return this.page.getByRole("heading", { level: 2, name: label, exact: true });
  }

  get backToAll(): Locator {
    return this.page.getByRole("link", { name: /all patterns/i });
  }

  /** A cross-reference link to another pattern, by its PascalCase name. */
  crossRef(name: string): Locator {
    return this.page.getByRole("link", { name, exact: true });
  }
}
