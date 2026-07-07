import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";

Given('admin login with the valid credentials', { timeout: 50000 }, async function (this: CustomWorld) {
  await this.loginpage.launch();
  await this.loginpage.enterdatas('testing@gmail.com', '123');
  await this.loginpage.clicksignin();
  await this.page.waitForLoadState('networkidle');
  await this.loginpage.dashboardpage();
});

When('admin clicks the Course Management menu', async function (this: CustomWorld) {
  await this.coursestructure.clickCourseManagement();
});

When('admin search the course {string}', { timeout: 15000 }, async function (this: CustomWorld, search: string) {
  await this.coursestructure.searchCourse(search);
});

When('admin click the Add Course Structure', { timeout: 15000 }, async function (this: CustomWorld) {
  await this.coursestructure.clickAddCourseStructure();
});

When('admin click the module menu', { timeout: 15000 }, async function (this: CustomWorld) {
  await this.coursestructure.clickModuleMenu();
});

When('admin enter the title as {string}', { timeout: 15000 }, async function (this: CustomWorld, title: string) {
  await this.coursestructure.enterTitle(title);
});

When('admin enter the description as {string}', async function (this: CustomWorld, description: string) {
  await this.coursestructure.enterDescription(description);
});

When('admin select the skillset as {string}', { timeout: 15000 }, async function (this: CustomWorld, skillset: string) {
  await this.coursestructure.selectSkillset(skillset);
});

When('admin click the Add module', async function (this: CustomWorld) {
  await this.coursestructure.clickAddModule();
});

Then('admin should seen the {string} in the module', async function (this: CustomWorld, title: string) {
  await this.coursestructure.verifyModuleTitle(title);
});
