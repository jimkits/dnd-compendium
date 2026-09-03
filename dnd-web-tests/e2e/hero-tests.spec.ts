import { test, expect } from './fixtures';

test.describe('Hero Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('User navigates to the heroes page',
        { tag: ['@smoke', '@regression', '@prod'] },
        async ({ navigationPage: landingPage, heroPage }) => {
        // Act
        await landingPage.navigateToHeroes();

        // Assert
        await test.step('verify the heroes page contains heroes', async () => {
            await expect(heroPage.heroTitle.first()).toBeVisible();
            await expect(heroPage.heroDescription.first()).toBeVisible();
        });
    });

    test('Searching narrows the hero list to matching names',
        { tag: ['@regression'] },
        async ({ navigationPage: landingPage, heroPage }) => {
        // Arrange
        await landingPage.navigateToHeroes();
        const firstHeroName = (await heroPage.heroTitle.first().textContent())?.trim() ?? '';

        // Act
        await heroPage.searchInput.fill(firstHeroName.slice(0, 3).toLowerCase());

        // Assert
        await test.step('verify only matching heroes are shown', async () => {
            const count = await heroPage.heroTitle.count();
            expect(count).toBeGreaterThan(0);
            for (let i = 0; i < count; i++) {
                const name = (await heroPage.heroTitle.nth(i).textContent())?.toLowerCase() ?? '';
                expect(name).toContain(firstHeroName.slice(0, 3).toLowerCase());
            }
        });
    });

    test('Searching for a non-existent hero returns no results',
        { tag: ['@regression'] },
        async ({ navigationPage: landingPage, heroPage }) => {
        // Arrange
        await landingPage.navigateToHeroes();

        // Act
        await heroPage.searchInput.fill('zzznonexistentherozzz');

        // Assert
        await expect(heroPage.heroTitle).toHaveCount(0);
    });

    test('Shows an error message when the API is unreachable',
        { tag: ['@regression'] },
        async ({ page, navigationPage: landingPage, heroPage }) => {
        // Arrange
        await page.route('**/api/compendium/heroes', route => route.abort());

        // Act
        await landingPage.navigateToHeroes();

        // Assert
        await expect(heroPage.errorMessage).toBeVisible();
        await expect(heroPage.errorMessage).toHaveText('Unable to reach the server. Please try again later.');
    });
});
