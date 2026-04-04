import {test, expect} from '@playwright/test';
import { log, timeStamp } from 'console';

async function login(page, accountInformation, isReLogin = false) {
    if(!isReLogin){
        await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin');
    }
    await expect(page.locator('.wp-login-logo')).toBeVisible(); // Changed to use expect
    await expect(page.locator('#user_login')).toBeVisible(); // Changed to use expect
    await expect(page.locator('#user_login')).toBeEnabled();
    await expect(page.locator('#user_pass')).toBeVisible(); // Changed to use expect
    await expect(page.locator('#user_pass')).toBeEnabled(); 


    await page.locator('#user_login').fill(accountInformation.valid_user);
    console.log('Username: ' + accountInformation.valid_user);
    await page.locator('#user_pass').fill(accountInformation.valid_pass);
    console.log('Password: ' + accountInformation.valid_pass);
    await page.locator('#wp-submit').click();
    
}

async function logout(page) {
        //Hover to account avatar menu
        const account = page.locator('#wp-admin-bar-my-account');
        await expect(account).toBeVisible();
        await account.hover();
        // await expect(page.locator('#wp-admin-bar-logout')).toBeVisible();
        const logoutLink = page.locator("//li[@id='wp-admin-bar-logout']/a");
        // need to be check. this is sometimes the click action is not working, but when we use evaluate to click it, it works.
        // await expect(logoutLink).toBeVisible();
        await logoutLink.click();
        // await logoutLink.evaluate(el => el.click());
        await page.waitForURL(/wp-login\.php/);
        await expect(page.locator('.wp-login-logo')).toBeVisible();
}

async function verificationDisplayMenu(showupMenus, hiddenMenus, page){

    for (let menu of showupMenus){
        let menuItem = '#menu-${replace}'.replace('${replace}', menu);
        let menuLocator = page.locator(menuItem)
        await expect(menuLocator).toBeVisible();
        console.log('Menu ' + menu + ' is visible');
    }

    for (let hiddenMenu of hiddenMenus){
        let hiddenMenuItem = 'li.menu-icon-${replace}'.replace('${replace}', hiddenMenu);
        let hiddenMenuLocator = page.locator(hiddenMenuItem);
        await expect(hiddenMenuLocator).toBeHidden();
    }
}

const valid_user = 'betterbytes.academy.admin';
const valid_pass = 'StrongPass@BetterBytesAcademy';
const accountInformation = {
    valid_user: valid_user,
    valid_pass: valid_pass
}
let new_account;
test.describe.serial('ACCOUNT - Account', () => {
    test.beforeEach(async ({page})=> {
        //Step 1: Login to the system with admin account
        await login(page, accountInformation);
        await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible(); 

        //Step 2: Navigate to the "User" page
        await page.locator('.wp-menu-name:has-text("Users")').click();
        await expect(page.locator('a.page-title-action')).toBeEnabled();

        //Step 3: Click on "Add New" button
        await page.locator('a.page-title-action').click();
        await expect(page.locator('h1#add-new-user')).toBeVisible();
        
    });

    test('Create account with editor permission', async ({page})=> {
        //Step 4: Fill in the form with valid information and select "Editor" role
        await expect(page.locator('#user_login')).toBeVisible();
        await expect(page.locator('#user_login')).toBeEnabled();
        let new_username = 'k21_nguyenquoctrung'+ Date.now();
        await page.locator('#user_login').fill(new_username);

        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#email')).toBeEnabled();
        let email = 'trungnq16091997'+ Date.now() +'@gmail.com';
        await page.locator('#email').fill(email);

        await expect(page.locator('#first_name')).toBeVisible();
        await expect(page.locator('#first_name')).toBeEnabled();
        await page.locator('#first_name').fill('Trung');

        await expect(page.locator('#last_name')).toBeVisible();
        await expect(page.locator('#last_name')).toBeEnabled();
        await page.locator('#last_name').fill('Nguyen');

        //Get password

        const new_password = await page.locator('#pass1').getAttribute('data-pw');
        expect(new_password).toBeTruthy();
        console.log('New password: ' + new_password);

        //Select role
        await expect(page.locator('#role option[value="editor"]')).toBeAttached();
        await page.locator('#role').selectOption('Editor');


        //Click to Add User button 
        await expect(page.locator('#createusersub')).toBeEnabled();
        await page.locator('#createusersub').click();

        //Verify that the new account is created successfully
        await expect(page.locator('#message p')).toHaveText(/New user created/i);
        await logout(page);

        //Re-login with the new account
        new_account = {
            valid_user: new_username,
            valid_pass: new_password
        }

        console.log('New account username: ' + new_account.toString());
        await login(page, new_account, true);
        await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible(); 
        await verificationDisplayMenu(['dashboard', 'posts', 'media', 'pages', 'comments', 'users', 'tools'], ['appearance', 'uses', 'plugins'], page);
        await logout(page);
    });

    test('Create account with subscriber permission', async ({page})=> {
        //Step 4: Fill in the form with valid information and select "Editor" role
        await expect(page.locator('#user_login')).toBeVisible();
        await expect(page.locator('#user_login')).toBeEnabled();
        let new_username = 'k21_nguyenquoctrung'+ Date.now();
        await page.locator('#user_login').fill(new_username);

        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#email')).toBeEnabled();
        let email = 'trungnq16091997'+ Date.now() +'@gmail.com';
        await page.locator('#email').fill(email);

        await expect(page.locator('#first_name')).toBeVisible();
        await expect(page.locator('#first_name')).toBeEnabled();
        await page.locator('#first_name').fill('Trung');

        await expect(page.locator('#last_name')).toBeVisible();
        await expect(page.locator('#last_name')).toBeEnabled();
        await page.locator('#last_name').fill('Nguyen');

        //Get password

        const new_password = await page.locator('#pass1').getAttribute('data-pw');
        expect(new_password).toBeTruthy();
        console.log('New password: ' + new_password);

        //Select role
        await expect(page.locator('#role option[value="subscriber"]')).toBeAttached();
        await page.locator('#role').selectOption('Subscriber');


        //Click to Add User button 
        await expect(page.locator('#createusersub')).toBeEnabled();
        await page.locator('#createusersub').click();

        //Verify that the new account is created successfully
        await expect(page.locator('#message p')).toHaveText(/New user created/i);
        await logout(page);

        //Re-login with the new account
        new_account = {
            valid_user: new_username,
            valid_pass: new_password
        }

        console.log('New account username: ' + new_account.toString());
        await login(page, new_account, true);
        await expect(page.locator('h1:has-text("Profile")')).toBeVisible(); 
        await verificationDisplayMenu(['dashboard', 'users'], ['appearance', 'uses', 'plugins','posts', 'media', 'pages', 'comments','tools'], page);
        await logout(page);
    });



    test.afterEach('', async ({page, context}) => {
        // ✅ Always logout whatever account is currently logged in first
        const isLoggedIn = await page.locator('#wp-admin-bar-my-account').isVisible();
        if (isLoggedIn) {
            await logout(page);
        }
        
        await login(page,accountInformation, true);

        //Step 2: Navigate to the "User" page
        await page.locator('.wp-menu-name:has-text("Users")').click();
        await expect(page.locator('a.page-title-action')).toBeEnabled();

        //Step 3: Input user name to search object
        let search_username = new_account.valid_user;
        await page.locator('#user-search-input').fill(search_username);
        await page.locator('#search-submit').click();
        
        let resultRow = await page.locator('#the-list tr').first();
        let resultCount = await expect(resultRow).toHaveCount(1);
        await expect(resultRow.locator('td.username.column-username strong a')).toHaveText(search_username);
        console.log('Search result username: ' + resultRow.locator('td.username.column-username strong a').textContent());        

        //Step 4: Select items
        await resultRow.locator('th.check-column input').check();
        await expect(resultRow.locator('th.check-column input')).toBeChecked();

        //Step 5: Select "Delete" in bulk action and click "Apply" button
        await expect(page.locator('#bulk-action-selector-top option[value="delete"]')).toBeAttached();
        await page.locator('#bulk-action-selector-top').selectOption('delete');
        await page.locator('#doaction').click();

        //Step 6: Confirm delete action
        await expect(page.locator('h1:has-text("Delete Users")')).toBeVisible();
        try{
            await page.locator('#delete_option0').waitFor({state: 'visible', timeout: 3000});
            await page.locator('#delete_option0').check();
            await expect(page.locator('#delete_option0')).toBeChecked();
        }  catch{
            console.log('#delete_option0 is not appeared, skip it .. ');
        }

        await expect(page.locator('#submit')).toBeEnabled();
        await page.locator("//input[@value='Confirm Deletion']").click();
        await expect(page.locator("#message p")).toHaveText(/User deleted./);
    });
});