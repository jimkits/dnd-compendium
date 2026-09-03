import { test, expect } from './fixtures';

test.describe('Monster Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('User navigates to the monsters page',
        { tag: ['@smoke', '@regression', '@prod'] },
        async ({ navigationPage: landingPage, monsterPage }) => {
        // Act
        await landingPage.navigateToMonsters();

        // Assert
        await test.step('verify monsters are displayed', async () => {
            await expect(monsterPage.monsterName.first()).toBeVisible();
            await expect(monsterPage.monsterDescription.first()).toBeVisible();
        });
    });

    test('Shows an error message when the API is unreachable',
        { tag: ['@regression'] },
        async ({ page, navigationPage: landingPage, monsterPage }) => {
        // Arrange
        await page.route('**/api/compendium/monsters', route => route.abort());

        // Act
        await landingPage.navigateToMonsters();

        // Assert
        await expect(monsterPage.errorMessage).toBeVisible();
        await expect(monsterPage.errorMessage).toHaveText('Unable to reach the server. Please try again later.');
    });
});
