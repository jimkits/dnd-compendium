import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class MonsterPage extends BasePage {
    monsterName: Locator;
    monsterDescription: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.monsterName = this.page.locator('h1.monster-name');
        this.monsterDescription = this.page.locator('p.monster-description');
        this.errorMessage = this.page.locator('span.error-message');
    }
}
