import { Locator, Page } from "@playwright/test";


export class Basepage {
    
    readonly page : Page

    constructor(page:Page)
    {
        this.page = page
    }

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
         await locator.click();
         await this.page.getByRole("option", { name: value, exact: true }).click();
    }
    async enableResources(section: string, resources: string[]) {
        for (const resource of resources) {
            const toggle = this.page.locator(`//div[contains(.,'${resource}')]//button`);
            await toggle.click();
        }

    }
    async selectSkill(skill: string) {
        await this.page.getByText(skill, { exact: true }).click();
    }
}