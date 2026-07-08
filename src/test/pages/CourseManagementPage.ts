import { Page, Locator, expect } from "@playwright/test";
import { Basepage } from "./Basepage";
import { logger } from "../utils/winstonlogger";

export class CourseManagementPage extends Basepage {

    constructor(page: Page) {
        super(page);
    }

    private searchedCourse = this.page.locator("//span[text()='J-BTI-H-006']");
    private courseManagementMenu = this.page.locator('//div[@title="Course Management"]');
    private searchInput = this.page.locator('input[data-slot="input"]');
    private addCourseStructureBtn = this.page.locator('button:has-text("Add Course Structure")');
    private emptyTableMessage = this.page.locator('//p[text()="No users found"]');
    private nextButton = this.page.locator('//button[contains(@data-slot,"button")]').nth(14);

    async clickCourseManagement() {
    await this.click(this.courseManagementMenu);
    await this.page.waitForTimeout(1500);
    logger.info("Clicked on Course Management menu");
    }

    async searchCourse(courseName: string) {
    await this.searchInput.fill(courseName);
    await this.page.waitForTimeout(2000);
    logger.info(`Searched for course: ${courseName}`);
    }

    async clickAddCourseStructure() {
    await this.addCourseStructureBtn.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.addCourseStructureBtn.first().click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);
    logger.info("Clicked Add Course Structure button");
    }

    async verifyCourseDisplayed() {
        await expect(this.searchedCourse).toContainText("J-BTI-H-006");
        logger.info("Course displayed successfully");
    }

    async verifyCourseNotFound(){
        await expect(this.emptyTableMessage).toBeVisible();
    }

    async navigateToNextPage(){
        await this.nextButton.click();
    }
}