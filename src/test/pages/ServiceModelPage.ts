import { Page, expect } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { Basepage } from "./Basepage";

export class ServiceModelPage extends Basepage {

    private DynamicSettingBtn = this.page.locator("//div[@title='Dynamic Field Settings']");
    private ServiceModelBtn = this.page.locator("//button[normalize-space()='Service Model']");
    private addService = this.page.locator("//button[contains(normalize-space(),'Add Service')]");
    private addpopup = this.page.locator("//h3[text()='Add New Service']");
    private serviceName = this.page.getByPlaceholder("e.g., 'Software Development'");
    private serviceDescription = this.page.getByPlaceholder("Describe the service...");
    private createServiceBtn = this.page.getByRole("button", { name: "Create Service" });
    private duplicateToast = this.page.getByText("Request failed with status code 400");
    private successToast = this.page.getByText("Service created successfully");

    async clickDynamicSettingBtn() {
        logger.info("Navigating to Dynamic Field Settings");
        await this.click(this.DynamicSettingBtn);
    }

    async clickServiceBtn() {
        logger.info("Opening Service Model");
        await this.click(this.ServiceModelBtn);
    }

    async clickAddService() {
        logger.info("Opening Add Service popup");
        await this.click(this.addService);
        await expect(this.addpopup).toBeVisible();
    }

    async addServiceName(serviceName: string) {
        logger.info(`Entering Service Name: ${serviceName}`);
        await this.filldata(this.serviceName, serviceName);
    }

    async addServiceDescription(description: string) {
        await this.filldata(this.serviceDescription, description);
    }

    async clickCreateService() {
        logger.info("Creating Service");
        await this.click(this.createServiceBtn);
    }

    async validduplicate() {
        await expect(this.duplicateToast).toBeVisible({ timeout: 60000 });
        logger.info("Duplicate service validation completed successfully");
    }

    async validSuccess() {
        await expect(this.successToast).toBeVisible({ timeout: 60000 });
        logger.info("Service created successfully");
    }
}