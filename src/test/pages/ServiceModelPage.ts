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
private toast=this.page.locator("//div[@id='8']");
private successToast = this.page.getByText("Service created successfully");
async clickDynamicSettingBtn(){
    await this.click(this.DynamicSettingBtn);
}
async clickServiceBtn(){
    await this.click(this.ServiceModelBtn);
}
async clickAddService(){
    await this.click(this.addService);
}
async addServiceName(serviceName: string){
    await expect(this.addpopup).toBeVisible();
    await this.filldata(this.serviceName, serviceName);
}
async addServiceDescription(description:string){
    await this.filldata(this.serviceDescription, description);
}
async clickCreateService(){
    await this.click(this.createServiceBtn);
}
async validduplicate(){
    await expect(this.toast).toBeVisible({timeout:60000});
}
async validSuccess(){
    await expect(this.successToast).toBeVisible({timeout:60000});
}
}
