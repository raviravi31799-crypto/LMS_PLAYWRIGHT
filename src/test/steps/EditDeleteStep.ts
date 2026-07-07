import {  Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { expect} from "@playwright/test";

Given('the Admin is logged into the application successfully',  { timeout: 30000 }, async function (this: CustomWorld) {
    await this.loginpage.launch();
    await this.loginpage.enterdatas("testing@gmail.com", "123");
    await this.loginpage.clicksignin();
    await this.page.waitForLoadState("networkidle");
    await this.loginpage.dashboardpage();
});

Given('the user navigates to the Course Management', async function (this: CustomWorld) {
    await this.editdeletepage.navigatecoursemodule();
});

When('Admin clicks the three dot menu for a course',  { timeout: 30000 },async function (this: CustomWorld, dataTable) {

    const data = dataTable.hashes();
    this.courseId = data[0].CourseID;
    await this.editdeletepage.clickThreeDot(this.courseId);

});

When('Admin selects Edit Course option', async function (this: CustomWorld) {

    await this.editdeletepage.clickEditCourse();

});

When('Admin clicks the Next button',  { timeout: 50000 },async function (this: CustomWorld) {

    await this.editdeletepage.clickNextButton();

});

When('Admin edits the course hierarchy by selecting a Sub Module, Topic, and Sub Topic', { timeout: 50000 }, async function (this: CustomWorld) {

    await this.editdeletepage.editCourseHierarchy();

});

When('Admin clicks the Preview & Update button', async function (this: CustomWorld) {

    await this.editdeletepage.clickPreviewUpdate();

});

When('Admin clicks the Save Course Layout button', async function (this: CustomWorld) {

    await this.editdeletepage.clickSaveCourseLayout();

});

Then('A success message should be displayed', async function (this: CustomWorld) {

    await this.editdeletepage.verifySuccessMessage();

});

Then('Admin clicks the Later button', async function (this: CustomWorld) {

    await this.editdeletepage.clickLater();

});

When('Admin clicks the View button', async function (this: CustomWorld) {

    await this.editdeletepage.clickView(this.courseId);

});

Then('The selected Sub Module, Topic, and Sub Topic should be displayed', async function (this: CustomWorld) {

  const expected = ["Sub Module", "Topic", "Sub Topic"];
    const actual = await this.editdeletepage.getAllTextContents(this.editdeletepage.courseList);
   await expect(actual).toEqual(expect.arrayContaining(expected));

});