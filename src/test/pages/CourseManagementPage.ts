import { Page, Locator, expect } from "@playwright/test";
import { Basepage } from "./Basepage";
import { logger } from "../utils/winstonlogger";

export class CourseManagementPage extends Basepage {

    constructor(page: Page) {
        super(page);
    }

    private courseManagementMenu = this.page.locator("//div[contains(@class,'p-1.5 bg-blue-100')]");
    private searchBox = this.page.locator("/html/body/div[3]/div/main/div/div/div/div[1]/div/div[2]/div[1]/div/input");
    private searchedCourse = this.page.locator("/html/body/div[3]/div/main/div/div/div/div[2]/div/div/div/div[1]/div/table/tbody/tr/td[3]/span/button/span[2]");

    async navigateToCourseManagement() {
        await this.click(this.courseManagementMenu);
        logger.info("Navigated to Course Management page");
    }

    async searchCourse(courseName: string) {
        await this.filldata(this.searchBox, courseName);
        logger.info(`Searched for course : ${courseName}`);
    }

    async verifyCourseDisplayed() {
        await expect(this.searchedCourse).toContainText("J-BTI-H-006");
        logger.info("Course displayed successfully");
    }
}