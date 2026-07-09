import { CourseManagementPage } from './../pages/CourseManagementPage';
import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";

Given('the admin is logged into the lms website',
  { timeout: 50000 }, async function (this: CustomWorld) {
    await this.loginpage.login();
});

Given("the admin navigates to the Course Management page",{ timeout: 20000 },async function (this: CustomWorld) {
        await this.courseManagementpage.clickCourseManagement();
    }
);

When("the admin enters a valid {string} in the search box",async function (this: CustomWorld, valid_coursename: string) {
    await this.courseManagementpage.searchCourse(valid_coursename);
  }
);

When("the admin enter a invalid {string} in the search box",async function (this: CustomWorld, invalid_coursename: string) {
    await this.courseManagementpage.searchCourse(invalid_coursename);
  }
);

When("the admin navigates to different page",async function(this:CustomWorld){
    await this.courseManagementpage.navigateToNextPage();
}
);

When("the admin enters the coursename",async function (this: CustomWorld, dataTable: DataTable) {
    const data = dataTable.hashes()[0] as { coursename: string };

    await this.courseManagementpage.searchCourse(data.coursename);
  }
);

Then("the matching course should be displayed in the search results", async function (this: CustomWorld) {

    await this.courseManagementpage.verifyCourseDisplayed();

});

Then("the matching course should not be displayed in the search results", async function (this: CustomWorld) {

    await this.courseManagementpage.verifyCourseNotFound();

});