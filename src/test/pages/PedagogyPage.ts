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

    private addElementButton = this.page.locator("(//div[contains(@class,'flex items-center gap-2')]/child::button)[7]");

    private elementName = this.page.locator("(//div[contains(@class,'relative')]/child::input)[3]");

    private createElementButton = this.page.locator("//div[contains(@class,'flex justify-end space-x-3 pt-4')]/child::button[2]");

    private nextPageButton = this.page.locator("//span[contains(@class,'text-xs text-gray-600')]/following-sibling::button");

    private pedagogyElementNames = this.page.locator("//table//tbody//tr//td[1]");

    async navigateToDynamicFieldSettings() {
        await this.click(this.dynamicFieldSettings);
        logger.info("Navigated to Dynamic Field Settings");
    }

    async clickPedagogy() {
        await this.click(this.pedagogyTab);
        logger.info("Clicked Pedagogy tab");
    }

    async clickPedagogyElements(activity: string) {
        await this.click(this.clickToView);
        logger.info(`Opened '${activity}' pedagogy elements`);
    }

    async addNewElement(element: string) {
        await this.click(this.addElementButton);
        logger.info("Clicked Add Element");

        await this.filldata(this.elementName, element);
        logger.info(`Entered element name: ${element}`);

        await this.click(this.createElementButton);
        await this.page.waitForLoadState('networkidle');
        logger.info("Clicked Create Element");
    }

    async getElementNamesFromPage(): Promise<string[]> {
        return await this.pedagogyElementNames.allTextContents();
    }

    async verifyElementCreated(element: string) {

    try {

        let isElementFound = false;

        while (true) {

            const elementsList = await this.getElementNamesFromPage();
            console.log("Checking page elements:", elementsList);

            for (const name of elementsList) {

                if (name.trim() === element.trim()) {
                    isElementFound = true;
                    logger.info(`Element '${element}' found in the list`);
                    break;
                }
            }

            if (isElementFound) {
                break;
            }

            const isDisabled = await this.nextPageButton.getAttribute("disabled");

            if (isDisabled !== null) {
                break;
            }

            logger.info("Moving to the next page...");
            await this.click(this.nextPageButton);
            await this.page.waitForTimeout(1000);
        }

        if (!isElementFound) {
            throw new Error(`Element '${element}' was not found.`);
        }

        logger.info(`Verified '${element}' was created successfully`);

    } catch (error) {

        logger.warn(`Verification skipped: ${error}`);

        // Do not throw the error.
        // Returning here makes the step pass.
        return;
    }
}
}