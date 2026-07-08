import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";

Given('admin login with the valid credentials', { timeout: 500000 }, async function (this: CustomWorld) {
  await this.loginpage.login()
});

When('admin clicks the Course Management menu',{ timeout: 15000 }, async function (this: CustomWorld) {
  await this.coursestructure.clickCourseManagement();
});

When('admin search the course {string}', { timeout: 15000 }, async function (this: CustomWorld, search: string) {
  await this.coursestructure.searchCourse(search);
});

When('admin click the Add Course Structure', { timeout: 30000 }, async function (this: CustomWorld) {
  await this.coursestructure.clickAddCourseStructure();
});

When('admin click the module menu', { timeout: 15000 }, async function (this: CustomWorld) {
  await this.coursestructure.clickModuleMenu();
});

When('admin enter the title as {string}', { timeout: 15000 }, async function (this: CustomWorld, title: string) {
  await this.coursestructure.enterTitle(title);
});

When('admin enter the description as {string}',{ timeout: 15000 }, async function (this: CustomWorld, description: string) {
  await this.coursestructure.enterDescription(description);
});

When('admin select the skillset as {string}', { timeout: 15000 }, async function (this: CustomWorld, skillset: string) {
  await this.coursestructure.selectSkillset(skillset);
});

When('admin click the Add module',{ timeout: 15000 }, async function (this: CustomWorld) {
  await this.coursestructure.clickAddModule();
});

Then('admin should seen the {string} in the module', { timeout: 30000 }, async function (this: CustomWorld, title: string) {
  await this.coursestructure.verifyModuleTitle(title);
  // await this.coursestructure.deleteModule(title)
});

When('admin Add the module',{timeout : 50000}, async function (this : CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
   await this.coursestructure.addModule()
});

When('admin click the submodule menu', { timeout: 50000 }, async function (this: CustomWorld) {
   await this.coursestructure.clickSubModule()
});

When('admin click the Add submodulemodule',{timeout : 50000} , async function (this : CustomWorld) {
  await this.coursestructure.saveSubModules()
});

Then('admin should seen the {string} in the submodule', { timeout: 30000 }, async function (this: CustomWorld, title: string) {
  await this.coursestructure.assertSubModule(title)
});
