import { logger } from './../utils/winstonlogger';
import { Basepage } from "./Basepage";
import {expect} from '@playwright/test'

export class CoursePage extends Basepage{
    private addCoursebtn=this.page.getByRole('button',{name:'Add Course'});
    private courseClient = this.page.locator("//label[contains(normalize-space(),'Course Client')]/following::button[1]");
    private serviceType=this.page.locator("//label[contains(normalize-space(),'Service Type')]/following::button[1]");
    private serviceModel=this.page.locator("//label[contains(normalize-space(),'Service Model')]/following::button[1]");
    private category=this.page.locator("//label[contains(normalize-space(),'Course Category')]/following::button[1]");
    private courseName=this.page.locator("//label[contains(normalize-space(),'Course Name')]/following::button[1]");
    private courseID=this.page.locator("//label[contains(normalize-space(),'Course ID')]/following::button[1]");
    private courseNext=this.page.locator("//label[contains(normalize-space(),'Course ID')]/following::button[2]");

async enterBasicConfiguration(client: string,serviceType: string,serviceModel: string,category: string,courseName: string) {

    await this.select(this.courseClient, client);
    await this.select(this.serviceType, serviceType);
    await this.select(this.serviceModel, serviceModel);
    await this.select(this.category, category);
    await this.select(this.courseName,courseName);
}
}