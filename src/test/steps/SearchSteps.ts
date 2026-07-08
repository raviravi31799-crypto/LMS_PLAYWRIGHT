import { CourseManagementPage } from './../pages/CourseManagementPage';
import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";

Given('the admin is logged into the lms website',
  { timeout: 30000 }, async function (this: CustomWorld) {
    await this.loginpage.launch();
    await this.loginpage.enterdatas('testing@gmail.com', '123');
    await this.loginpage.clicksignin();
    await this.page.waitForLoadState('networkidle');
    await this.loginpage.dashboardpage();
});

Given("the admin navigates to the Course Management page",{ timeout: 20000 },async function (this: CustomWorld) {
        await this.courseManagementpage.clickCourseManagement();
    }
);

When("the admin enters a valid {string} in the search box",async function (this: CustomWorld, coursename: string) {
    await this.courseManagementpage.searchCourse(coursename);
  }
);

Then("the matching course should be displayed in the search results", async function (this: CustomWorld) {

    await this.courseManagementpage.verifyCourseDisplayed();

});