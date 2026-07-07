import { Page, expect } from "@playwright/test";
import { Basepage } from "./Basepage";
import { logger } from '../utils/winstonlogger';

export class CourseStructure extends Basepage {
  constructor(page: Page) {
    super(page);
  }

  private courseManagementMenu = this.page.locator('//div[@title="Course Management"]');
  private searchInput = this.page.locator('input[data-slot="input"]');
  private addCourseStructureBtn = this.page.locator('button:has-text("Add Course Structure")');
  private moduleMenuButton = this.page.locator('//button[@title="Add module"]');
  private titleInput = this.page.locator('textarea#title');
  private descriptionInput = this.page.locator('textarea#description');
  private addModuleButton = this.page.locator('//form//button[@type="submit"]');

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

  async clickModuleMenu() {
    await this.moduleMenuButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.click(this.moduleMenuButton);
    await this.page.waitForTimeout(2000);
    logger.info("Clicked module menu button");
  }

  async enterTitle(title: string) {
    await this.filldata(this.titleInput, title);
    logger.info(`Entered title: ${title}`);
  }

  async enterDescription(description: string) {
    if (description) {
      await this.filldata(this.descriptionInput, description);
      logger.info(`Entered description: ${description}`);
    }
  }

  async selectSkillset(skillset: string) {
    if (skillset) {
      const scrollContainer = this.page.locator('.thin-scrollbar');
      if (await scrollContainer.count() > 0) {
        await scrollContainer.evaluate(el => el.scrollTop = el.scrollHeight);
        await this.page.waitForTimeout(1500);
      }
      const radio = this.page.locator(`//td[text()="${skillset}"]/preceding-sibling::td//input[@type="radio"]`);
      const radioAlt = this.page.locator(`//label[text()="${skillset}"]/preceding::input[@type="radio"]`).first();
      const radioByText = this.page.locator(`input[type="radio"]:right-of(:text("${skillset}"))`).first();
      const radioByTextLeft = this.page.locator(`input[type="radio"]:left-of(:text("${skillset}"))`).first();
      if (await radio.count() > 0) {
        await radio.click();
      } else if (await radioByTextLeft.count() > 0) {
        await radioByTextLeft.click();
      } else if (await radioByText.count() > 0) {
        await radioByText.click();
      } else if (await radioAlt.count() > 0) {
        await radioAlt.click();
      } else {
        await this.page.locator(`text="${skillset}"`).first().click();
      }
      await this.page.waitForTimeout(1000);
      logger.info(`Selected skillset: ${skillset}`);
    }
  }

  async clickAddModule() {
    await this.click(this.addModuleButton);
    await this.page.waitForTimeout(2000);
    logger.info("Clicked Add Module button");
  }

  async verifyModuleTitle(title: string) {
    const moduleRow = this.page.locator(`//tr[contains(td, "${title}")]`).first();
    await expect(moduleRow).toBeVisible({ timeout: 10000 });
    logger.info(`Verified module title "${title}" is visible in table`);
  }
}