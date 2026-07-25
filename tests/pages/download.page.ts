import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

/** The "/download" page: installer link, quick-start steps and the plugins note. */
export class DownloadPage extends BasePage {
  readonly path = "/download";

  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole("heading", { level: 1, name: /run roadmap mcp on your machine/i });
  }

  get installerLink(): Locator {
    return this.page.getByRole("link", { name: /download installer/i });
  }

  get githubDownloadsLink(): Locator {
    return this.page.getByRole("link", { name: /all downloads on github/i });
  }

  get quickStart(): Locator {
    return this.page.getByRole("heading", { level: 2, name: "Quick start" });
  }

  get registryLink(): Locator {
    return this.page.getByRole("link", { name: "/registry/plugins.json" });
  }

  get backHomeLink(): Locator {
    return this.page.getByRole("link", { name: /back to home/i });
  }
}
