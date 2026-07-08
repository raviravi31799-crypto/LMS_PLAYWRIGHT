import {  Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { expect} from "@playwright/test";
import { logger } from "../utils/winstonlogger";

Given('the Admin is logged into the application successfully',  { timeout: 30000 }, async function (this: CustomWorld) {
    logger.info("Logging in as Admin");
    await this.loginpage.launch();
    await this.loginpage.enterdatas("testing@gmail.com", "123");
    await this.loginpage.clicksignin();
    await this.page.waitForLoadState("networkidle");
    await this.loginpage.dashboardpage();
    logger.info("Admin login successful");
});

Given('the user navigates to the Course Management', async function (this: CustomWorld) {
    logger.info("Navigating to Course Management");
    await this.editdeletepage.navigatecoursemodule();
});

When('Admin clicks the three dot menu for a course',  { timeout: 30000 },async function (this: CustomWorld, dataTable) {
    const data = dataTable.hashes();
    this.courseId = data[0].CourseID;
    logger.info(`Clicking three dot menu for course: ${this.courseId}`);
    await this.editdeletepage.clickThreeDot(this.courseId);

});

When('Admin selects Edit Course option', async function (this: CustomWorld) {
    logger.info("Selecting Edit Course option");
    await this.editdeletepage.clickEditCourse();

});

When('Admin clicks the Next button', { timeout: 60000 },async function (this: CustomWorld) {
    logger.info("Clicking Next button");
    await this.editdeletepage.clickNextButton();
    logger.info("Next button clicked successfully");

});

When('Admin edits the course hierarchy by selecting a Sub Module, Topic, and Sub Topic', { timeout: 30000 }, async function (this: CustomWorld) {
    logger.info("Editing course hierarchy: Sub Module, Topic, Sub Topic");
    await this.editdeletepage.editCourseHierarchy();
    logger.info("Course hierarchy edited successfully");

});

When('Admin clicks the Preview & Update button', async function (this: CustomWorld) {
    logger.info("Clicking Preview & Update button");
    await this.editdeletepage.clickPreviewUpdate();

});

When('Admin clicks the Save Course Layout button', async function (this: CustomWorld) {
    logger.info("Clicking Save Course Layout button");
    await this.editdeletepage.clickSaveCourseLayout();

});

Then('A success message should be displayed', async function (this: CustomWorld) {
    await this.editdeletepage.verifySuccessMessage();
    logger.info("Success message verified");

});

Then('Admin clicks the Later button', async function (this: CustomWorld) {

    logger.info("Clicking Later button");
    await this.editdeletepage.clickLater();

});

When('Admin clicks the View button', async function (this: CustomWorld) {

    logger.info(`Clicking View button for course: ${this.courseId}`);
    await this.editdeletepage.clickView(this.courseId);

});

Then('The selected Sub Module, Topic, and Sub Topic should be displayed', async function (this: CustomWorld) {

  const expected = ["Sub Module", "Topic", "Sub Topic"];
    const actual = await this.editdeletepage.getAllTextContents(this.editdeletepage.courseList);
   await expect(actual).toEqual(expect.arrayContaining(expected));
   logger.info("Verified Sub Module, Topic, and Sub Topic are displayed");

});