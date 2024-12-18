import { test, expect } from "@playwright/test";
import {StorePage} from "../pages/storepage"
import {LoginPage} from "../pages/loginpage"


test.describe('Final assignment', () => {
   
    const consumerUsername = 'Bobby'
    const businessUsername = 'Robby'
    const userpassword =  process.env.PASSWORD;
    const wrongpassword = 'this is wrong password'
    const consumerUserRole = 'Consumer'
    const businessUserRole = 'Business'

    const headerStore = 'Store'
    const productname = 'Apple'
    const productAmount = '2'
    const adress = 'Teststreet 55'

    

    test('Verify login consumer', async ({ page }) => {
        const storePage = new StorePage(page);
        const loginPage = new LoginPage(page);

        await page.goto('https://hoff.is/login/');
        // login and verify user
        await loginPage.login(consumerUsername,userpassword,consumerUserRole)
    
        // Verify header 
        await storePage.verifyHeaderVisible(headerStore);

        //verify url 
        const currentUrl = page.url();
        expect(currentUrl).toContain('username='+consumerUsername);
        expect(currentUrl).toContain('role=consumer');

    });

    test('Verify login business', async ({ page }) => {
        const storePage = new StorePage(page);
        const loginPage = new LoginPage(page);

        await page.goto('https://hoff.is/login/');
        // login and verify user
        await loginPage.login(businessUsername,userpassword,businessUserRole)
    
        // Verify header 
        await storePage.verifyHeaderVisible(headerStore);

        //Verify url 
          const currentUrl = page.url();
          expect(currentUrl).toContain('username='+businessUsername);
          expect(currentUrl).toContain('role=business');

    });

    test('Usability: Verify login error for invalid business credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await page.goto('https://hoff.is/login/');
        // failed login and verify error message
        await loginPage.failLogin(consumerUsername,wrongpassword,businessUserRole)
        
    });

    test('Usability: Verify login error for invalid consumer credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await page.goto('https://hoff.is/login/');
        // failed login and verify error message
        await loginPage.failLogin(consumerUsername,wrongpassword,consumerUserRole)
        
    });

    test('Buy products', async ({ page }) => {
        const storePage = new StorePage(page);
        const loginPage = new LoginPage(page);

        await page.goto('https://hoff.is/login/');
        // login and verify user
        await loginPage.login(consumerUsername,userpassword,consumerUserRole)
        // Add a product
        await storePage.addProducts(productname,productAmount);

        // Add an item to the cart
        await storePage.verifyAddedProducts(productname,productAmount);

        // Proceed to checkout and verify consumerUsername, adress, product name,product amount in the receit
        await storePage.proceedToCheckout(consumerUsername, adress, productname,productAmount);

    });


    

 
});
