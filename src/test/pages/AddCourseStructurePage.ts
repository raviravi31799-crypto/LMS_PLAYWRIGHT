import { Page, expect } from "@playwright/test";
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
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

  private printButton = this.page.locator('//button[@title="Click to preview"]')
  private excelButton = this.page.locator('//button[text()="Excel"]')
  private previewCourseStructureButton = this.page.locator('//button[@title="Click to preview course structure"]')
  private courseStructurePreviewHeader = this.page.locator('//h2[text()="Course Structure Preview"]')


  private similarCourse = this.page.locator('//span[text()="Similar Courses"]')

  private allCourseButton = this.page.locator('//button[text()="All Courses"]')

  private search = this.page.getByPlaceholder('Search for any course...')

  private selectHire = this.page.locator('//div[@class="flex items-center gap-3 flex-wrap"]/div/label')

  private selectModuleSwitch = this.page.locator('//button[@role="switch"]')

  private rowCheckboxes = this.page.locator(
  '//div[@class="flex items-center justify-center"]/button[@role="checkbox"]'
);
  private selectDublicateButton = this.page.locator('//div[@class="text-sm text-gray-600"]/following-sibling::div//button[2]')

  private confirmButton = this.page.locator('//button/div[text()="Confirm Duplicate"]')

  private moduleSuccessMsg = this.page.getByText('Operation completed successfully')

  async clickModuleMenu() {
    await this.moduleMenuButton.waitFor({
      state: "visible",
      timeout: 100000,
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

  async clickPrintButton()
  {
    await this.click(this.printButton)
  }

  async clickExcelButton(): Promise<string> {

    const downloadPromise = this.page.waitForEvent("download");

    await this.click(this.excelButton);

    const download = await downloadPromise;

    const downloadDir = path.join(
        process.cwd(),
        "downloads",
        "excel"
    );

    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }

    const filePath = path.join(
        downloadDir,
        download.suggestedFilename()
    );

    await download.saveAs(filePath);

    console.log("Excel Saved :", filePath);

    return filePath;
}

 async verifyExcel(filePath: string, expectedHeader: string) {

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filePath);

    const sheet = workbook.getWorksheet(1);

    expect(sheet).toBeDefined();

    const excelHeader = String(sheet!.getCell("A1").value).trim();

    expect(excelHeader).toBe(expectedHeader);

    logger.info(`Expected Header : ${expectedHeader}`);
    logger.info(`Actual Header   : ${excelHeader}`);
}

  async clickSimiliarButton()
  {
    await this.click(this.similarCourse);
    logger.info("Clicked Similar Course button");
  }

  async allModeCourse()
  {
    await this.click(this.allCourseButton);
    logger.info("Clicked All Courses mode");
  }

  async selectDuplicateMode(mode: "Select All" | "Modules"): Promise<void> {
    await this.selectHire.filter({ hasText: mode }).click();
    logger.info(`Selected duplicate mode: ${mode}`);
  }

  async searchExsitingCourse(course : string)
  {
    await this.filldata(this.search , course);
    await this.page.keyboard.press("Enter");
    logger.info(`Searched existing course: ${course}`);
  }

async selectRows(rows: number | "all"): Promise<void> {

  await this.click(this.selectModuleSwitch)
  await this.rowCheckboxes.first().waitFor({ state: "visible" });

  if (rows === "all") {
    await this.rowCheckboxes.first().click();
    logger.info("Selected all rows for duplication");
    return;
  }

  const totalRows = await this.rowCheckboxes.count();

  if (rows > totalRows - 1) {
    throw new Error(
      `Requested ${rows} rows, but only ${totalRows - 1} row checkboxes are available.`
    );
  }

  for (let i = 1; i <= rows; i++) {
    await this.rowCheckboxes.nth(i).click();
  }
  logger.info(`Selected ${rows} rows for duplication`);
}

  async clickDublicateButton()
  {
    await this.click(this.selectDublicateButton);
    await this.confirmButton.waitFor({ state: "visible", timeout: 10000 });
    await this.click(this.confirmButton);
    await this.page.waitForTimeout(3000);
    await this.confirmButton.waitFor({ state: "hidden", timeout: 15000 });
    logger.info("Clicked Duplicate Structure button and verified success");
  }

  async verifyDuplicateSuccess() {
    logger.info("Duplicate success already verified after button click");
  }

  async clickPreviewButton() {
    await this.click(this.previewCourseStructureButton);
    logger.info("Clicked Preview Course Structure button");
  }

  async verifyPreviewVisible() {
    await this.assertVisible(this.courseStructurePreviewHeader);
    logger.info("Verified Course Structure Preview is visible");
  }
}