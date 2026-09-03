import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class MonsterPage extends BasePage {
    page: Page;
    monsterName: Locator;
    monsterDescription: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.monsterName = this.page.locator('h1.monster-name');
        this.monsterDescription = this.page.locator('p.monster-description');
    }
}
