import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../world/world";
import { readCSV } from "../utils/csvReader";
import { logger } from "../utils/winstonlogger";
import { CategoryCsvRow } from "../types/csvTypes";

const csvRows = readCSV<CategoryCsvRow>("DynamicCourseCategoryData.csv");

const addCsvData = csvRows[0]!;
const searchEditCsvData = csvRows[1]!;
const deleteCsvData = csvRows[2]!;


// ============================================================
// Navigate to Course Category
// ============================================================

When('Admin navigates to the CourseCategory menu', async function (this: CustomWorld) {

    logger.info("Navigating to Course Category menu");

    await this.dynamiccoursecategorypage.navigateToCourseCategoryMenu();
});


// ============================================================
// Add Category
// ============================================================

When('Admin clicks the Add Category button', async function (this: CustomWorld) {

    logger.info("Clicking Add Category button");

    await this.dynamiccoursecategorypage.clickAddCategory();
});


When('Admin fills the category details from the csv file', { timeout: 40000 }, async function (this: CustomWorld) {

    this.categoryName =
        `${addCsvData.CategoryName}_${Date.now()}`;

    const courseNames =
        addCsvData.CourseNames.split(";");

    logger.info(
        `Filling category details for: ${this.categoryName}`
    );

    await this.dynamiccoursecategorypage.fillCategoryDetails(
        this.categoryName,
        courseNames,
        addCsvData.CategoryDescription
    );
});


When('Admin clicks the Create Category button', { timeout: 60000 }, async function (this: CustomWorld) {

    logger.info("Clicking Create Category button");

    await this.dynamiccoursecategorypage.clickCreateCategory();
});


When('Admin clicks the Close button', { timeout: 60000 }, async function (this: CustomWorld) {

    logger.info("Clicking Close button");

    await this.dynamiccoursecategorypage.clickClose();
});


// ============================================================
// Verify New Category
// ============================================================

Then('the new category should be displayed in the category list', { timeout: 40000 }, async function (this: CustomWorld) {

    const isDisplayed =
        await this.dynamiccoursecategorypage.verifyCategoryDisplayed(
            this.categoryName
        );

    logger.info(
        `Category "${this.categoryName}" displayed: ${isDisplayed}`
    );

    expect(isDisplayed).toBeTruthy();
});


// ============================================================
// Search Course - Edit
// ============================================================

When('Admin searches for a course', { timeout: 40000 }, async function (this: CustomWorld, dataTable) {

    const columnName =
        dataTable.raw()[0][0] as keyof CategoryCsvRow;

    this.courseName =
        searchEditCsvData[columnName]
            .split(";")[0]!;

    logger.info(
        `Searching for course: ${this.courseName}`
    );

    await this.dynamiccoursecategorypage.searchCourse(
        this.courseName
    );
});


Then('the course should be displayed in the category list', { timeout: 40000 }, async function (this: CustomWorld) {

    const isDisplayed =
        await this.dynamiccoursecategorypage.verifyCourseDisplayed(
            this.courseName
        );

    logger.info(
        `Course "${this.courseName}" displayed: ${isDisplayed}`
    );

    expect(isDisplayed).toBeTruthy();
});


// ============================================================
// Click Three Dot - Edit Category
// ============================================================

When('Admin clicks the three dot menu for a category', { timeout: 40000 }, async function (this: CustomWorld, dataTable) {

    const columnName =
        dataTable.raw()[0][0] as keyof CategoryCsvRow;

    /*
     * Edit uses CSV row 2:
     *
     * Aiml,BFS;DL,AI is important,Aiml_Updated
     *
     * CourseNames -> BFS;DL
     * First course -> BFS
     */

    const courseName =
        searchEditCsvData[columnName]
            .split(";")[0]!;

    this.courseName = courseName;

    logger.info(
        `Searching using Edit course: ${courseName}, then clicking three dot`
    );

    await this.dynamiccoursecategorypage.searchCourse(
        courseName
    );

    /*
     * Click the three-dot button from the
     * SAME row that contains the course.
     */
    await this.dynamiccoursecategorypage.clickThreeDotForCourse(
        courseName
    );
});


// ============================================================
// Edit Category
// ============================================================

When('Admin selects Edit option', { timeout: 40000 }, async function (this: CustomWorld) {

    logger.info("Selecting Edit option");

    await this.dynamiccoursecategorypage.clickEdit();
});


When('Admin updates the category name', { timeout: 40000 }, async function (this: CustomWorld) {

    this.updatedCategoryName =
        searchEditCsvData.UpdatedCategoryName;

    logger.info(
        `Updating the category name to: ${this.updatedCategoryName}`
    );

    await this.dynamiccoursecategorypage.updateCategoryName(
        this.updatedCategoryName
    );
});


When('Admin clicks the Update Category button', { timeout: 40000 }, async function (this: CustomWorld) {

    logger.info("Clicking Update Category button");

    await this.dynamiccoursecategorypage.clickUpdateCategory();
});


// ============================================================
// Verify Updated Category
// ============================================================

Then('the updated category should be displayed in the category list', { timeout: 40000 }, async function (this: CustomWorld) {

    const isDisplayed =
        await this.dynamiccoursecategorypage.verifyCategoryDisplayed(
            this.updatedCategoryName
        );

    logger.info(
        `Updated category "${this.updatedCategoryName}" displayed: ${isDisplayed}`
    );

    expect(isDisplayed).toBeTruthy();
});


// ============================================================
// Delete Category
// ============================================================

When('Admin clicks the three dot menu for delete category', { timeout: 40000 }, async function (this: CustomWorld) {

    /*
     * Delete uses CSV row 3:
     *
     * IT,FSWD,developing a website,
     *
     * CourseNames -> FSWD
     */

    const courseName =
        deleteCsvData.CourseNames
            .split(";")[0]!;

    this.courseName = courseName;

    logger.info(
        `Searching using Delete course: ${courseName}, then clicking three dot`
    );

    /*
     * Search using Delete-specific CSV data.
     */
    await this.dynamiccoursecategorypage.searchCourse(
        courseName
    );

    /*
     * Click the three-dot button from the
     * SAME row that contains FSWD.
     */
    await this.dynamiccoursecategorypage.clickThreeDotForCourse(
        courseName
    );
});


When('Admin selects Delete option', { timeout: 40000 }, async function (this: CustomWorld) {

    logger.info("Selecting Delete option");

    await this.dynamiccoursecategorypage.clickDelete();
});


When('Admin confirms the category deletion', { timeout: 40000 }, async function (this: CustomWorld) {

    logger.info("Confirming category deletion");

    await this.dynamiccoursecategorypage.confirmDeleteCategory();
});


// ============================================================
// Verify Deleted Category
// ============================================================

Then('the category should no longer be displayed in the category list', { timeout: 40000 }, async function (this: CustomWorld) {

    const isDisplayed =
        await this.dynamiccoursecategorypage.verifyCourseNotDisplayed(
            this.courseName
        );

    logger.info(
        `Course "${this.courseName}" is no longer displayed after category deletion: ${isDisplayed}`
    );

    expect(isDisplayed).toBeTruthy();
});