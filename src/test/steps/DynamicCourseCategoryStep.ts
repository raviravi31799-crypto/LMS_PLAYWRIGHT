import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../world/world";
import { readCSV } from "../utils/csvReader";
import { logger } from "../utils/winstonlogger";
import { CategoryCsvRow } from "../types/csvTypes";

const csvData = readCSV<CategoryCsvRow>("DynamicCourseCategoryData.csv")[0]!;

When('Admin navigates to the Dynamicfields management',{timeout:40000}, async function (this: CustomWorld) {
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

When('Admin fills the category details from the csv file',{timeout:40000}, async function (this: CustomWorld) {
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

Then('the new category should be displayed in the category list',{timeout:40000}, async function (this: CustomWorld) {
    const isDisplayed = await this.dynamiccoursecategorypage.verifyCategoryDisplayed(this.categoryName);
    logger.info(`Category "${this.categoryName}" displayed: ${isDisplayed}`);
    expect(isDisplayed).toBeTruthy();
});

When('Admin searches for a course', {timeout:40000},async function (this: CustomWorld, dataTable) {
    const columnName = dataTable.raw()[0][0] as keyof CategoryCsvRow;
    this.courseName = csvData[columnName].split(";")[0]!;
    logger.info(`Searching for course: ${this.courseName}`);
    await this.dynamiccoursecategorypage.searchCourse(this.courseName);
});

Then('the course should be displayed in the category list', {timeout:40000},async function (this: CustomWorld) {
    const isDisplayed = await this.dynamiccoursecategorypage.verifyCourseDisplayed(this.courseName);
    logger.info(`Course "${this.courseName}" displayed: ${isDisplayed}`);
    expect(isDisplayed).toBeTruthy();
});

When('Admin clicks the three dot menu for a category', async function (this: CustomWorld, dataTable) {
    const columnName = dataTable.raw()[0][0] as keyof CategoryCsvRow;
    const searchTerm = csvData[columnName].split(";")[0]!;
    this.courseName = csvData.CourseNames;
    logger.info(`Searching using: ${searchTerm}, then clicking three dot for category: ${this.courseName}`);
    await this.dynamiccoursecategorypage.searchCategoryByName(searchTerm);
    await this.dynamiccoursecategorypage.clickThreeDot(this.courseName);
});

When('Admin selects Edit option', async function (this: CustomWorld) {
    logger.info("Selecting Edit option");
    await this.dynamiccoursecategorypage.clickEdit();
});

When('Admin updates the category name', async function (this: CustomWorld) {
    this.updatedCategoryName = `${csvData.CategoryName}Updated`;
    logger.info(`Updating category name to: ${this.updatedCategoryName}`);
    await this.dynamiccoursecategorypage.updateCategoryName(this.updatedCategoryName);
});

When('Admin clicks the Update Category button', async function (this: CustomWorld) {
    logger.info("Clicking Update Category button");
    await this.dynamiccoursecategorypage.clickUpdateCategory();
});

Then('the updated category should be displayed in the category list', async function (this: CustomWorld) {
    const isDisplayed = await this.dynamiccoursecategorypage.verifyCategoryDisplayed(this.updatedCategoryName);
    logger.info(`Updated category "${this.updatedCategoryName}" displayed: ${isDisplayed}`);
    expect(isDisplayed).toBeTruthy();
});