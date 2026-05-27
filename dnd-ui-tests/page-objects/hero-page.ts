import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class HeroPage extends BasePage {
    page: Page;
    heroTitle: Locator;
    heroDescription: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.heroTitle = this.page.locator('span.name');
        this.heroDescription = this.page.locator('span.hero-description');
    }
}
