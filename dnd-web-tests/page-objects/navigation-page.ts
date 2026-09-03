import { test, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class NavigationPage extends BasePage {
    page: Page;
    homeButton: Locator;
    heroesButton: Locator;
    monstersButton: Locator;
    logoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.homeButton = this.page.locator('a.btn-home');
        this.heroesButton = this.page.locator('a.btn-heroes');
        this.monstersButton = this.page.locator('a.btn-monsters');
        this.logoutButton = this.page.locator('a.btn-logout');
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

    async logout(): Promise<this> {
        await test.step('click the logout button', async () => {
            await this.logoutButton.click();
        });

        return this;
    }
}
