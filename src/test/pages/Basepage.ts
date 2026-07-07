import { Page, Locator } from "@playwright/test";


export class Basepage {
    constructor(protected page: Page) {}

    async click(locator: Locator) {
        await locator.click();
    }

    async filldata(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async launchapplication(url: string) {
        await this.page.goto(url);
    }

    
    async checkbox(locator: Locator) {
        await locator.check();
    }

    
    async getText(locator: Locator)  {
        return await locator.innerText();
    }

   
    async getAllTextContents(locator: Locator){
        return await locator.allTextContents();
    }

    async select(locator: Locator, value: string) {
    await locator.selectOption(value);
}
}