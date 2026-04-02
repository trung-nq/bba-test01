import {test, expect} from '@playwright/test';

test.describe('Authentication', () => {
    test.beforeEach(async ({page})=> {
        await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin');
        await expect(page.locator('.wp-login-logo')).toBeVisible(); // Changed to use expect
        await expect(page.locator('#user_login')).toBeVisible(); // Changed to use expect
        await expect(page.locator('#user_login')).toBeEnabled();
        await expect(page.locator('#user_pass')).toBeVisible(); // Changed to use expect
        await expect(page.locator('#user_pass')).toBeEnabled(); 
    });

    test('Login with invalid credentials', async ({page}) => {
        let invalid_user = 'invalid_user';
        await page.locator('#user_login').fill(invalid_user);
        await page.locator('#user_pass').fill('invalid_password');
        await page.locator('#wp-submit').click();
        await expect(page.locator('#login_error')).toContainText(' is not registered on this site. If you are unsure of your username, try your email address instead.');
    });

    test('Login with valid credentials', async ({page}) => {
        let valid_user = 'betterbytes.academy.admin';
        let valid_pass = 'StrongPass@BetterBytesAcademy';
        await page.locator('#user_login').fill(valid_user);
        await page.locator('#user_pass').fill(valid_pass);
        await page.locator('#wp-submit').click();
        await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible(); 
    });
});