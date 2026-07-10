import {Given,When,Then} from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";



Given('the user is logged to the application',{timeout:50000}, async function (this:CustomWorld) {
  await this.loginpage.login();
});

Given('navigated to coursemanagement page',{timeout:40000},async function (this:CustomWorld) {
 await this.courseManagementpage.clickCourseManagement();
});

Given('the application should display the contents of first page',{timeout:50000}, async function (this:CustomWorld) {
  await this.paginationpage.verifyFirstPage();
});

When('the user clicks the next button',{timeout:50000}, async function (this:CustomWorld) {
 await this.paginationpage.clickNextButton();
});

Then('the second page should be displayed',{timeout:30000} ,async function (this:CustomWorld) {
  await this.paginationpage.verifySecondPage();
});