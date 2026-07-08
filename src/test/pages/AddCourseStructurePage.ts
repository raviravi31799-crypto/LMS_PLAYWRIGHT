import { Page } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { Basepage } from "./Basepage";

export class CourseStructure extends Basepage {
  constructor(page: Page) {
    super(page);
  }

  private moduleMenuButton = this.page.locator('//button[@title="Add module"]');
  private titleInput = this.page.locator('textarea#title');
  private descriptionInput = this.page.locator('textarea#description');
  private addModuleButton = this.page.locator('//form//button[@type="submit"]');
  private lastRow = this.page.locator("//table//tbody//tr").last();
  private deleteButton = this.page.locator('//button[text()="Delete"]');
  private moreButton = this.page.getByRole("button", { name: "More" });
  private submodule = this.page.locator('//button[@title="Add New Sub Module"]').last();

  private hierarchyActionsToggle = this.page.locator(
    '//span[normalize-space()="Hierarchy Actions"]/ancestor::label//div[contains(@class,"w-9 h-4")]'
  );

  private saveSubModule = this.page.locator('//button[@type="submit"]');

  private hierarchyLabel = this.page.locator(
    '//span[normalize-space()="Hierarchy Actions"]/ancestor::label'
  );

  private hierarchyCheckbox = this.page.locator(
    '//span[normalize-space()="Hierarchy Actions"]/ancestor::label//input[@type="checkbox"]'
  );

  private moduleRow = (moduleName: string) =>
    this.page.locator(
      `//table//tbody//tr[td[normalize-space()="${moduleName}"]]`
    );

  private subModuleCell = (moduleName: string) =>
    this.page.locator(
      `//table//tbody//tr[td[normalize-space()="${moduleName}"]]/td[2]`
    );

  async clickModuleMenu() {
    await this.moduleMenuButton.waitFor({
      state: "visible",
      timeout: 10000,
    });

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
      const scrollContainer = this.page.locator(".thin-scrollbar");

      if ((await scrollContainer.count()) > 0) {
        await scrollContainer.evaluate(
          (el) => (el.scrollTop = el.scrollHeight)
        );
        await this.page.waitForTimeout(1500);
      }

      const radio = this.page.locator(
        `//td[text()="${skillset}"]/preceding-sibling::td//input[@type="radio"]`
      );

      const radioAlt = this.page
        .locator(
          `//label[text()="${skillset}"]/preceding::input[@type="radio"]`
        )
        .first();

      const radioByText = this.page
        .locator(`input[type="radio"]:right-of(:text("${skillset}"))`)
        .first();

      const radioByTextLeft = this.page
        .locator(`input[type="radio"]:left-of(:text("${skillset}"))`)
        .first();

      if (await radio.count()) {
        await radio.click();
      } else if (await radioByTextLeft.count()) {
        await radioByTextLeft.click();
      } else if (await radioByText.count()) {
        await radioByText.click();
      } else if (await radioAlt.count()) {
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
    await this.assertContainsText(this.lastRow, title);

    logger.info(`Verified '${title}' is added as the last module.`);
  }

  async addModule() {
    await this.clickModuleMenu();
    await this.enterTitle("deepLearning");
    await this.enterDescription("suprevised deepLearning");
    await this.selectSkillset("Python");
    await this.clickAddModule();

    await this.click(this.moreButton);
    await this.click(this.hierarchyActionsToggle);

    await this.page.locator("body").click({
      position: { x: 50, y: 50 },
    });
  }

  async clickSubModule() {
    logger.info("Clicking Sub Module");
    await this.click(this.submodule);
  }

  async saveSubModules() {
    await this.click(this.saveSubModule);
    logger.info("Clicked Save Sub Module");
  }

  async assertSubModule(subModuleName: string) {
    const dataTable = this.page.locator("div.flex-1.overflow-auto table");

    const cell = dataTable
      .locator("tbody tr td")
      .filter({ hasText: subModuleName })
      .last();

    await this.assertVisible(cell);
    await this.assertText(cell, subModuleName);

    logger.info(`Verified Sub Module '${subModuleName}'`);
  }

  async verifySubModule(moduleName: string, subModule: string) {
    logger.info(
      `Verifying Sub Module '${subModule}' in module '${moduleName}'`
    );

    const row = this.moduleRow(moduleName);

    await this.assertContainsText(row, subModule);

    logger.info("Verified Sub Module");
  }
}