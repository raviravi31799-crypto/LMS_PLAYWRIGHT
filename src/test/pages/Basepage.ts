import { Locator, Page, expect } from "@playwright/test";


export class Basepage {
    
    readonly page : Page

    constructor(page:Page)
    {
        this.page = page
    }

    async click(locator: Locator)
    {
        await locator.click(
            {
                timeout : 50000
            }
        );
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
        return await locator.textContent();
    }

   
    async getAllTextContents(locator: Locator){
        return await locator.allTextContents();
    }

    async select(dropdown: Locator, value: string) {
    if (!value?.trim()) {
        return;
    }

    await dropdown.click();
    await this.page.getByRole('option', { name: value, exact: true }).click();
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

     async assertContainsText(locator: Locator, expected: string) {
        await expect(locator).toContainText(expected);
    }

    async assertText(locator: Locator, expected: string) {
        await expect(locator).toHaveText(expected);
    }

    async assertVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }
//  async multiSelect(locator: Locator, values: string[]) {

//     await locator.click();

//     for (const value of values) {
//         await this.page.getByText(value, { exact: true }).click({timeout:50000});
//     }

//     await this.page.keyboard.press("Escape");
// }
// async multiSelect(dropdown: Locator, value: string) {

//     await dropdown.click();

//     const listBox = this.page.locator('[role="listbox"]').last();

//     await listBox
//         .locator("label")
//         .filter({ hasText: value })
//         .first()
//         .click();

//     // Close the dropdown
//     await this.page.mouse.click(10, 10);
// }
//       async pressEnter(locator: Locator) {
//         await locator.press("Enter");
// }
// async selectMultiDropdown(index: number, value: string) {

//     const dropdown = this.page
//         .locator("button[role='combobox']")
//         .nth(index);

//     await dropdown.click();

//     const listBox = this.page.locator("[role='listbox']").last();

//     await listBox
//         .locator("label")
//         .filter({ hasText: value })
//         .first()
//         .click();

//     await this.page.mouse.click(10, 10);
// }
async multiSelect(dropdown: Locator, value: string) {

    await dropdown.waitFor({ state: "visible" });
    await dropdown.scrollIntoViewIfNeeded();
    await dropdown.click();

    const option = this.page
        .locator("[role='listbox']")
        .last()
        .locator("label")
        .filter({ hasText: value })
        .first();

    await option.waitFor({ state: "visible" });
    await option.click();

    // Close the dropdown
    await this.page.keyboard.press("Escape");

    // Wait for the UI to stabilize
    await this.page.waitForTimeout(500);
}
async pressEnter(locator: Locator) {
    await locator.press("Enter");
}
    async selectFirstOption(dropdown: Locator) {

    await dropdown.waitFor({ state: "visible" });
    await dropdown.click();

    const listBox = this.page.locator("[role='listbox']").last();

    await listBox.locator("label").first().click();

    await this.page.keyboard.press("Escape");
}
}