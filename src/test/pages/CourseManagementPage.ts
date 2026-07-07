import { Page, Locator, expect } from "@playwright/test";
import { Basepage } from "./Basepage";
import { logger } from "../utils/winstonlogger";

export class CourseManagementPage extends Basepage {

    constructor(page: Page) {
        super(page);
    }

    private searchedCourse = this.page.locator("/html/body/div[3]/div/main/div/div/div/div[2]/div/div/div/div[1]/div/table/tbody/tr/td[3]/span/button/span[2]");

    async verifyCourseDisplayed() {
        await expect(this.searchedCourse).toContainText("J-BTI-H-006");
        logger.info("Course displayed successfully");
    }
}