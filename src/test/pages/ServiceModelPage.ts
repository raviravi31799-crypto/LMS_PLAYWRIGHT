import {Page,expect} from "@playwright/test"
import { logger } from './../utils/winstonlogger';
import { Basepage } from "./Basepage";
export class ServiceModelPage extends Basepage{
private DynamicSettingBtn=this.page.locator("//div[@title='Dynamic Field Settings']");
private ServiceModelBtn=this.page.locator("//button[normalize-space()='Service Model']");
private addService=this.page.locator("//button[contains(normalize-space(),'Add Service')]");
private addpopup=this.page.locator("//h3[text()='Add New Service']");
private serviceName = this.page.getByPlaceholder("e.g., 'Software Development'");
private serviceDescription = this.page.getByPlaceholder("Describe the service...");
private createServiceBtn = this.page.getByRole('button', { name: 'Create Service' });
async clickDynamicSettingBtn(){
    await this.click(this.DynamicSettingBtn);
}
async clickServiceBtn(){
    await this.click(this.ServiceModelBtn);
}
async clickAddService(){
    await this.click(this.addService);
}
async addNewService(serviceName: string,description: string){
    await expect(this.addpopup).toBeVisible();
    await this.filldata(this.serviceName, serviceName);
    await this.filldata(this.serviceDescription, description);
}
async clickCreateService(){
    await this.click(this.createServiceBtn);
}
}
