import {Page,expect} from "@playwright/test"
import { logger } from './../utils/winstonlogger';
import { Basepage } from "./Basepage";

export class CoursePage extends Basepage{
    constructor(page:Page){
            super(page);
        }
    private coursePageTitle=this.page.locator("//span[text()='Create New Course Setup']");
    private courseClient = this.page.locator("//label[contains(normalize-space(),'Course Client')]/following::button[1]");
    private serviceType=this.page.locator("//label[contains(normalize-space(),'Service Type')]/following::button[1]");
    private serviceModel=this.page.locator("//label[contains(normalize-space(),'Service Model')]/following::button[1]");
    private category=this.page.locator("//label[contains(normalize-space(),'Course Category')]/following::button[1]");
    private courseName=this.page.locator("//label[contains(normalize-space(),'Course Name')]/following::button[1]");
    private courseID=this.page.locator("//label[contains(normalize-space(),'Course ID')]/following::button[1]");
    private courseNext=this.page.locator("//label[contains(normalize-space(),'Course ID')]/following::button[2]");
    private error=this.page.locator("//span[text()='Please enter a course name']");

async enterBasicConfiguration(client: string,serviceType: string,serviceModel: string,category: string,courseName: string) {
    if (client?.trim()) {
        await this.select(this.courseClient, client);
    }
    if (serviceType?.trim()) {
        await this.select(this.serviceType, serviceType);
    }
    if (serviceModel?.trim()) {
        await this.select(this.serviceModel, serviceModel);
    }
    if (category?.trim()) {
        await this.select(this.category, category);
    }
    if (courseName?.trim()) {
        await this.select(this.courseName, courseName);
    }
}

async clickNext(expectNavigation = true) {
    await this.courseNext.click();

    if (expectNavigation) {
        await expect(
            this.page.getByRole("heading", { name: /Course Hierarchy/ })
        ).toBeVisible();
    }
}
async verifyerrormsg(){
    await expect(this.error).toBeVisible();
}
async verifyCoursePage(){
    await expect(this.coursePageTitle).toBeVisible();
}
}