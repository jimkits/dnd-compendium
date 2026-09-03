import { test, expect } from './fixtures';

test.describe('Monster Tests', () => {
    const baseUrl: string = process.env.BASE_URL!;

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
    });

    test.afterEach(async ({ page }) => {
        page.close();
    });

    test('User navigates to the monsters page',
        { tag: ['@smoke', '@regression'] },
        async ({ navigationPage: landingPage, monsterPage }) => {
        // Act
        await landingPage.navigateToMonsters();

        // Assert
        await test.step('verify monsters are displayed', async () => {
            await expect(monsterPage.monsterName.first()).toBeVisible();
            await expect(monsterPage.monsterDescription.first()).toBeVisible();
        });
    });
});
