import { Page, expect } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { Basepage } from "./Basepage";

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

    private addCourseBtn=this.page.locator("//h1[normalize-space()='Course Structures']/following::button[1]");
 
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
  await this.addCourseStructureBtn.first().waitFor({
    state: "visible",
    timeout: 100000,
  });

  await this.addCourseStructureBtn.first().click();

  
  await this.page.waitForLoadState("networkidle");

  // Wait until the Module button is visible (indicates the page is ready)
  await this.page
    .locator('//button[@title="Add module"]')
    .waitFor({
      state: "visible",
      timeout: 10000,
    });

  logger.info("Successfully navigated to Add Course Structure page.");
}

    async verifyCourseDisplayed() {
        await expect(this.searchedCourse).toContainText("J-TM-T-006");
        logger.info("Course displayed successfully");
    }

    async verifyCourseNotFound(){
        await expect(this.emptyTableMessage).toBeVisible();
    }

    async navigateToNextPage(){
        await this.nextButton.click();
    }    
    async clickAddCourseBtn(){
        await this.click(this.addCourseBtn);
    }
}
