/*import {Locator, Page} from "@playwright/test"
export class StorePage{
    readonly page: Page;
    readonly usernameText: Locator
    readonly header: Locator;
   

        constructor(page:Page){
            this.page=page;
            this.usernameText = page.getByTestId("username")
            this.header = page.locator("h1")        
        }

}*/

import { Locator, Page, expect } from "@playwright/test";

export class StorePage {
    readonly page: Page;
    readonly header: Locator;
    readonly selectItemField: Locator;
    readonly addToCartButton: Locator;
    readonly buyButton: Locator;
    readonly cartList: Locator;
    readonly amountItemField: Locator;
    readonly purchaseHeader: Locator;
    readonly purchaseName: Locator;
    readonly purchaseAdress: Locator;
    readonly purchaseConfirmButton: Locator;
    readonly purchaseReceit: Locator;



    constructor(page: Page) {
        this.page = page;

        // Define locators
        this.header = page.locator('.header');
        this.selectItemField = page.locator('#select-product')
        this.addToCartButton = page.getByTestId('add-to-cart-button');
        this.buyButton = page.locator('#button-finalize-purchase');
        this.cartList = page.locator('#cartitems');
        this.amountItemField = page.getByLabel('Amount')
        this.purchaseHeader = page.locator('#purchaseModalLabel'); 
        this.purchaseName = page.locator('#buyerName');  
        this.purchaseAdress = page.locator('#buyerAddress'); 
        this.purchaseConfirmButton = page.locator('#confirmPurchaseButton'); 
        this.purchaseReceit = page.locator('#finalReceipt'); 
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

 
    async addProducts(productName: string, amountProduct: string){
       
        await this.selectItemField.selectOption(productName); 
        await this.amountItemField.fill(amountProduct);
        await this.page.keyboard.press('Enter');
        await this.addToCartButton.click()

    }

    async verifyAddedProducts(productName: string, amountProduct: string){
        await expect(this.cartList).toBeVisible();
        await expect(this.cartList).toContainText(productName)
        await expect(this.cartList).toContainText(amountProduct)
    }
   
    async verifyPurchaseHeaderVisible(purchaseHeaderText){
        await expect(this.purchaseHeader).toBeVisible();
        await expect(this.purchaseHeader).toContainText(purchaseHeaderText);

    }

    async proceedToCheckout(name: string, adress:string, productName: string, amountProduct: string) {
        await this.buyButton.click();
        await this.purchaseName.fill(name);
        await this.purchaseAdress.fill(adress);
        await this.purchaseConfirmButton.click()
        await expect(this.purchaseReceit).toBeVisible()
        await expect(this.purchaseReceit).toContainText(productName)
        await expect(this.purchaseReceit).toContainText(amountProduct)
        await expect(this.purchaseReceit).toContainText(name)
        await expect(this.purchaseReceit).toContainText(adress)
    }
    
    async verifyHeaderVisible(headerValue){
        await expect(this.header).toBeVisible()
        await expect(this.header).toContainText(headerValue)
    

    }
    

}