import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class MainPage extends BasePage {
    pageTitle: Locator;
    welcomeText: Locator;

    constructor(page: Page) {
        super(page);

        this.pageTitle = this.page.locator('h1', { hasText: 'Dungeons and Dragons' });
        this.welcomeText = this.page.locator('h2', { hasText: 'Welcome to the world of' });
    }
}
