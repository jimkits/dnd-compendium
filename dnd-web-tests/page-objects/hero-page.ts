import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class HeroPage extends BasePage {
    heroTitle: Locator;
    heroDescription: Locator;
    searchInput: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.heroTitle = this.page.locator('span.name');
        this.heroDescription = this.page.locator('span.description');
        this.searchInput = this.page.locator('input.search-text');
        this.errorMessage = this.page.locator('span.error-message');
    }
}
