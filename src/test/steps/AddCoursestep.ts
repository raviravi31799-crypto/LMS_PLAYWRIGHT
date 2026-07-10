import { CoursePage } from './../pages/CoursePage';
import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import addCourse from "../../../testdata/addCourse.json";

Given('the user is logged-in with the valid credentials',{timeout:40000} ,async function () {
  await this.loginpage.login();
});

When('the user clicks the Add Course button', async function () {
  await this.courseManagementpage.clickAddCourseBtn();
});

When('the user enters the course basic configuration',  { timeout: 50000 }, async function (dataTable: DataTable) {
   const data = dataTable.hashes();

    if (data.length === 0) {
      throw new Error("DataTable is empty");
    }
    const course = data[0]!;
    await this.coursepage.enterBasicConfiguration(course.Client,course.ServiceType,course.ServiceModel,course.Category,course.CourseName);
});

When('the user clicks the Next button', async function (this:CustomWorld) {
      await this.coursepage.clickNext(true);
});
When('the user enters the course hierarchy details',{ timeout: 120000 },async function (this: CustomWorld) {

    await this.coursehierarchypage.enterCourseHierarchy(addCourse.courseHierarchy);
  });


When('the user clicks the Preview & Create button', async function (this: CustomWorld) {
await this.coursehierarchypage.clickPreviewCreate();
});

Then('the course preview should be displayed', async function (this: CustomWorld) {
     await this.coursehierarchypage.verifyCourseCreated();
});

When('the user clicks the Save Course Layout button', async function (this: CustomWorld) {
      await this.coursehierarchypage.clicksaveLayout();

});

Then('the course should be created successfully',  { timeout: 50000 },async function (this:CustomWorld) {
    await this.coursehierarchypage.verifycourseadded();

});
Then('the user should see a validation message for the mandatory Course Name field', async function (this:CustomWorld) {
    await this.coursepage.verifyerrormsg();
});

Then('the user should remain on the Add Course page', async function (this:CustomWorld) {
    await this.coursepage.verifyCoursePage();
});
When('the user clicks the Next button without navigating', async function (this:CustomWorld) {
  await this.coursepage.clickNext(false);
});

Then('the user should see the error message to fill the field', async function () {
    await this.coursepage.verifyerrormsg();
});



