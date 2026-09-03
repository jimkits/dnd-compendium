import { test, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class NavigationPage extends BasePage {
    homeButton: Locator;
    heroesButton: Locator;
    monstersButton: Locator;

    constructor(page: Page) {
        super(page);

        this.homeButton = this.page.locator('a.btn-home');
        this.heroesButton = this.page.locator('a.btn-heroes');
        this.monstersButton = this.page.locator('a.btn-monsters');
    }

    async navigateToHome(): Promise<this> {
        await test.step('navigate to home page', async () => {
            await this.homeButton.click();
        });

        return this;
    }

    async navigateToHeroes(): Promise<this> {
        await test.step('navigate to the heroes page', async () => {
            await this.heroesButton.click();
        });

        return this;
    }

    async navigateToMonsters(): Promise<this> {
        await test.step('navigate to the monsters page', async () => {
            await this.monstersButton.click();
        });

        return this;
    }
}
