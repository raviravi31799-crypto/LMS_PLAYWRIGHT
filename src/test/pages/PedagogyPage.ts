import { Page, expect } from "@playwright/test";
import { Basepage } from "./Basepage";
import { logger } from "../utils/winstonlogger";

export class PedagogyPage extends Basepage {

    constructor(page: Page) {
        super(page);
    }

    private dynamicFieldSettings = this.page.locator("xpath=/html/body/div[3]/div/aside/div/div/div/div[3]");

    private pedagogyTab = this.page.locator("//button").nth(12);

    private clickToView = this.page.locator("xpath=/html/body/div[3]/div/main/div/div/div/div[2]/div[2]/div/div/div/div[3]/div/div[1]/div/table/tbody/tr[1]/td[2]/span/div");

    private addElementButton = this.page.locator("xpath=/html/body/div[3]/div/main/div/div/div/div[2]/div[2]/div/div/div/div[4]/div/div[1]/div[2]/button[1]");

    private elementName = this.page.locator("xpath=/html/body/div[3]/div/main/div/div/div/div[2]/div[2]/div/div/div/div[5]/div/form/div[1]/div[2]/input");

    private createElementButton = this.page.locator("xpath=/html/body/div[3]/div/main/div/div/div/div[2]/div[2]/div/div/div/div[5]/div/form/div[2]/button[2]");

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
        logger.info("Clicked Create Element");
    }

    async verifyElementCreated(element: string) {
        await expect(this.page.getByText(element)).toBeVisible();
        logger.info(`Verified '${element}' was created successfully`);
    }
}