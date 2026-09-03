import { test, expect } from './fixtures';

test.describe('Hero Tests', () => {
    const baseUrl: string = process.env.BASE_URL!;

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
    });

    test.afterEach(async ({ page }) => {
        page.close();
    });

    test('User navigates to the heroes page',
        { tag: ['@smoke', '@regression'] },
        async ({ navigationPage: landingPage, heroPage }) => {
        // Act
        await landingPage.navigateToHeroes();

        // Assert
        await test.step('verify the heroes page contains heroes', async () => {
            await expect(heroPage.heroTitle.first()).toBeVisible();
            await expect(heroPage.heroDescription.first()).toBeVisible();
        });
    });
});
