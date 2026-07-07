import { CourseManagementPage } from './../pages/CourseManagementPage';
import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";

Given('the user is logged into the lms website', async function (this: CustomWorld) {
    await this.loginpage.launch();
    await this.loginpage.enterdatas('testing@gmail.com', '123');
    await this.loginpage.clicksignin();
    await this.page.waitForLoadState('networkidle');
    await this.loginpage.dashboardpage();
});

Given("the user navigates to the Course Management page",{ timeout: 20000 },async function (this: CustomWorld) {
        await this.coursestructure.clickCourseManagement();
    }
);

When("the user enters a valid course name in the search box", async function (this: CustomWorld) {

     await this.coursestructure.searchCourse("ML");

});

Then("the matching course should be displayed in the search results", async function (this: CustomWorld) {

    await this.courseManagementpage.verifyCourseDisplayed();

});