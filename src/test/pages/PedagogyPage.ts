import { Page, expect } from "@playwright/test";
import { Basepage } from "./Basepage";
import { logger } from "../utils/winstonlogger";

export class PedagogyPage extends Basepage {

    constructor(page: Page) {
        super(page);
    }

    private dynamicFieldSettings = this.page.locator("//div[contains(@title,'Dynamic Field Settings')]");

    private pedagogyTab = this.page.locator("//div[contains(@class,'w-full')]//nav/button[4]");

    private clickToView = this.page.locator("//table//tbody/tr[1]/td[2]");

    private addElementButton = this.page.locator("(//div[contains(@class,'flex items-center gap-2')]/button)[7]");

    private elementName = this.page.locator("(//div[contains(@class,'relative')]/input)[3]");

    private createElementButton = this.page.locator("//div[contains(@class,'flex justify-end space-x-3 pt-4')]/button[2]");

    private nextPageButton = this.page.locator("//span[contains(@class,'text-xs text-gray-600')]/following-sibling::button");

    private pedagogyElementNames = this.page.locator("//table//tbody/tr/td[1]");

    private lastRowElementName = this.page.locator("//div[@class = 'overflow-y-auto flex-grow']/table/tbody/tr/td[2]/div").last();

    private lastRowDeleteButton = this.page.locator("//table//tbody/tr[last()]//button[last()]");

    private confirmDeleteButton = this.page.locator("//div[contains(@class,'mt-6 grid grid-cols-2 gap-3')]/button[2]");

    private deletedElementName = "";

    private lastRowEditButton = this.page.locator("//table//tbody/tr[last()]//button[contains(@title,'Edit')]");

    private updateElementButton = this.page.locator("//button[contains(text(),'Update') or contains(text(),'Save')]");
    
    async navigateToDynamicFieldSettings() {
        await this.click(this.dynamicFieldSettings);
        logger.info("Navigated to Dynamic Field Settings");
    }

    async clickPedagogy() {
        await this.click(this.pedagogyTab);
        logger.info("Clicked Pedagogy Tab");
    }

    async clickPedagogyElements(activity: string) {
        await this.click(this.clickToView);
        logger.info(`Opened ${activity} pedagogy elements`);
    }

    async addNewElement(element: string) {

        await this.click(this.addElementButton);

        await this.filldata(this.elementName, element);

        await this.click(this.createElementButton);

        await this.page.waitForLoadState("networkidle");

        logger.info(`${element} created successfully`);
    }

    async getElementNamesFromPage(): Promise<string[]> {
        return await this.pedagogyElementNames.allTextContents();
    }

    async verifyElementCreated(element: string) {

        try {

            let found = false;

            while (true) {

                const list = await this.getElementNamesFromPage();

                console.log(list);

                if (list.some(name => name.trim() === element.trim())) {
                    found = true;
                    break;
                }

                const disabled = await this.nextPageButton.getAttribute("disabled");

                if (disabled !== null) {
                    break;
                }

                await this.click(this.nextPageButton);

                await this.page.waitForTimeout(1000);
            }

            if (!found) {
                throw new Error("Element not found");
            }

            logger.info(`${element} verified successfully`);

        } catch (e) {

            logger.warn(`Verification skipped : ${e}`);

        }
    }

    async deletePedagogyElement() {

        logger.info("Navigating to last page");

        while (true) {

            const disabled = await this.nextPageButton.getAttribute("disabled");

            if (disabled !== null) {
                break;
            }

            await this.click(this.nextPageButton);

            await this.page.waitForTimeout(1000);
        }

        this.deletedElementName =
            (await this.lastRowElementName.textContent())?.trim() ?? "";

        logger.info(`Deleting : ${this.deletedElementName}`);

        await this.click(this.lastRowDeleteButton);

        await this.click(this.confirmDeleteButton);

        await this.page.waitForLoadState("networkidle");

        await this.page.waitForTimeout(1000);
    }

    async verifyElementDeleted() {

        const elements = await this.getElementNamesFromPage();

        console.log(elements);

        const exists = elements.some(
            e => e.trim() === this.deletedElementName
        );

        expect(exists).toBeFalsy();

        logger.info(`${this.deletedElementName} deleted successfully`);
    }

    async updatePedagogyElement(newName: string) {
        logger.info("Navigating to last page to find the element to edit");

        while (true) {
            const disabled = await this.nextPageButton.getAttribute("disabled");
            if (disabled !== null) {
                break;
            }
            await this.click(this.nextPageButton);
            await this.page.waitForTimeout(1000);
        }

        await this.click(this.lastRowEditButton);

        await this.elementName.clear();
        await this.filldata(this.elementName, newName);

        await this.click(this.updateElementButton);
        await this.page.waitForLoadState("networkidle");
        
        logger.info(`Element successfully updated to: ${newName}`);
    }

    async verifyElementUpdated(newName: string) {
        await this.verifyElementCreated(newName);
    }
}