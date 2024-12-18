import {expect, Locator, Page} from "@playwright/test"
export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly chooseUser: Locator;
    readonly logInUser: Locator;
    readonly errorMessage: Locator;


        constructor(page:Page){
            this.page=page;
            this.usernameInput = page.getByLabel("Username")
            this.passwordInput = page.getByLabel("Password")        
            this.submitButton = page.getByRole('button', {name: "Login"})
            this.chooseUser = page.getByLabel('Select role')
            this.logInUser = page.getByTestId('username')
            this.errorMessage = page.getByTestId('error-message')

            
        }
        // function for login and verify user
        async login(username: string, password:string, usertype: string){
           await this.usernameInput.fill(username);
           await this.passwordInput.fill(password);
           await this.chooseUser.selectOption(usertype); 
           await this.submitButton.click()
           await expect(this.logInUser).toContainText(username)
        }
        // function for login and verify user
        async failLogin(username: string, wrongPassword:string, usertype: string){
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(wrongPassword);
            await this.chooseUser.selectOption(usertype); 
            await this.submitButton.click()
            await expect( this.errorMessage).toBeVisible()
            await expect( this.errorMessage).toContainText('Incorrect password')
         }
 



}
