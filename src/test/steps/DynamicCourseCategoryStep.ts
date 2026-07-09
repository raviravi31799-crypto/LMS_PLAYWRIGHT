import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../world/world";
import { readCSV } from "../utils/csvReader";
import { logger } from "../utils/winstonlogger";
import { CategoryCsvRow } from "../types/csvTypes";

const csvData = readCSV<CategoryCsvRow>("DynamicCourseCategoryData.csv")[0]!;

When('Admin navigates to the Dynamicfields management', async function (this: CustomWorld) {
    logger.info("Navigating to Dynamic Fields management");
    await this.dynamiccoursecategorypage.navigateToDynamicFieldsManagement();
});

When('Admin navigates to the CourseCategory menu', async function (this: CustomWorld) {
    logger.info("Navigating to Course Category menu");
    await this.dynamiccoursecategorypage.navigateToCourseCategoryMenu();
});

When('Admin clicks the Add Category button', async function (this: CustomWorld) {
    logger.info("Clicking Add Category button");
    await this.dynamiccoursecategorypage.clickAddCategory();
});

When('Admin fills the category details from the csv file', async function (this: CustomWorld) {
    this.categoryName = csvData.CategoryName;
    const courseNames = csvData.CourseNames.split(";");
    logger.info(`Filling category details for: ${this.categoryName}`);
    await this.dynamiccoursecategorypage.fillCategoryDetails(this.categoryName, courseNames, csvData.CategoryDescription);
});

When('Admin clicks the Create Category button', { timeout: 60000 }, async function (this: CustomWorld) {
    logger.info("Clicking Create Category button");
    await this.dynamiccoursecategorypage.clickCreateCategory();
});

When('Admin clicks the Close button', { timeout: 60000 }, async function (this: CustomWorld) {
    logger.info("Clicking Close button");
    await this.dynamiccoursecategorypage.clickClose();
});

Then('the new category should be displayed in the category list', async function (this: CustomWorld) {
    const isDisplayed = await this.dynamiccoursecategorypage.verifyCategoryDisplayed(this.categoryName);
    logger.info(`Category "${this.categoryName}" displayed: ${isDisplayed}`);
    expect(isDisplayed).toBeTruthy();
});