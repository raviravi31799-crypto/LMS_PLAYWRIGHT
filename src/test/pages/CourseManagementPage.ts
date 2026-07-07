import { Page, Locator, expect } from "@playwright/test";
import { Basepage } from "./Basepage";

export class CourseManagementPage extends Basepage {

    readonly searchBox: Locator;
    readonly searchedCourse: Locator;

    constructor(page: Page) {
        super(page);

        this.searchBox = page.locator("/html/body/div[3]/div/main/div/div/div/div[1]/div/div[2]/div[1]/div/input");
        this.searchedCourse = page.locator("/html/body/div[3]/div/main/div/div/div/div[2]/div/div/div/div[1]/div/table/tbody/tr/td[3]/span/button/span[2]");
    }

    async searchCourse(courseName: string) {
        await this.filldata(this.searchBox, courseName);
    }

    async verifyCourseDisplayed(courseName: string) {
        await expect(this.searchedCourse).toContainText("J-BTI-H-006");
    }
}