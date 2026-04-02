import { test, expect } from '@playwright/test';

test.describe('Material site', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://material.playwrightvn.com/index.html');
    });

    test.afterEach(async ({page}) => {
        // Using the test context to log information
        console.log('Test completed for URL:', page.url());
    })

    test('User registration page', async ({ page }) => {
        // Using the test context to log information
        await page.locator("//a[@href = '01-xpath-register-page.html']").click();
    });

    test('Product page', async ({ page }) => {
        // Using the test context to log information
        console.log('Product page test');
        await page.locator("//a[@href = '02-xpath-product-page.html']").click()
    });
}); 

