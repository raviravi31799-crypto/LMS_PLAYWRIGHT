
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import fs from "fs";

import { AddStructureData } from "../types/csvTypes";
import { readCSV } from "../utils/csvReader";
import { CustomWorld } from "../world/world";

import testData from "../../../testdata/addStructure.json";

const data: AddStructureData = testData;

interface DuplicateData {
  newCourse: string;
  existingCourse: string;
  hierarchyLevel: string;
  rows: string;
}

const duplicateData = readCSV<DuplicateData>("DuplicateCourseData.csv")[0]!;

interface PreviewData {
  courseName: string;
}

const previewData = readCSV<PreviewData>("PreviewCourseData.csv");

let excelPath: string;

Given('admin login with the valid credentials', { timeout: 500000 }, async function (this: CustomWorld) {
  await this.loginpage.login()
});

When('admin clicks the Course Management menu',{ timeout: 15000 }, async function (this: CustomWorld) {
  await this.courseManagementpage.clickCourseManagement();
});

When('admin search the course {string}', { timeout: 15000 }, async function (this: CustomWorld, search: string) {
  await this.courseManagementpage.searchCourse(search);
});

When('admin click the Add Course Structure', { timeout: 120000 }, async function (this: CustomWorld) {
  if ((this as any).previewFlowDone) return;
  await this.courseManagementpage.clickAddCourseStructure();
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

When('admin search the course', { timeout: 30000 }, async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.courseManagementpage.searchInputByJson(
      data.courseName
    );
});

When('admin click the print button',{ timeout: 30000 } , async function (this : CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.coursestructure.clickPrintButton()
});

When('admin click the excel button', { timeout: 30000 },async function (this : CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  excelPath = await this.coursestructure.clickExcelButton();
});

When('admin save the excel seet', { timeout: 30000 },async function (this : CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  expect(fs.existsSync(excelPath)).toBeTruthy();

  console.log("Excel Saved Successfully : " + excelPath);
});

Then('admin shoud view the module details in the excel sheet',{ timeout: 30000 }, async function (this : CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.coursestructure.verifyExcel(
      excelPath,
      data.header
    );
});

When('admin search the new course for dublicate', { timeout: 30000 }, async function (this : CustomWorld) {
  await this.courseManagementpage.searchCourse(duplicateData.newCourse);
});

When('admin click the similar course button', { timeout: 30000 }, async function (this : CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.coursestructure.clickSimiliarButton()
});

When('admin change the mode to the all course', { timeout: 30000 }, async function (this : CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.coursestructure.allModeCourse()
});

When('admin search the existed course for dublicate', { timeout: 30000 }, async function (this : CustomWorld) {
  await this.coursestructure.searchExsitingCourse(duplicateData.existingCourse)
});

When('admin choose the hierarchy level', { timeout: 30000 }, async function (this : CustomWorld) {
  await this.coursestructure.selectDuplicateMode(duplicateData.hierarchyLevel as "Select All" | "Modules")
});

When('admin Select module no rows to duplicate', { timeout: 30000 }, async function (this : CustomWorld) {
  await this.coursestructure.selectRows(Number(duplicateData.rows))

});

When('admin click the dublicate structure button', { timeout: 30000 }, async function (this : CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.coursestructure.clickDublicateButton()
  
});

Then('admin should seen the pop message', { timeout: 30000 }, async function (this: CustomWorld) {
  await this.coursestructure.verifyDuplicateSuccess();
});

When('admin search the course for Preview', { timeout: 300000 }, async function (this: CustomWorld) {
 
    
    await this.courseManagementpage.searchCourse(data.courseName);
    
});

When('admin click the Preview button', { timeout: 30000 }, async function (this: CustomWorld) {
  
  await this.coursestructure.clickPreviewButton();
});

Then('admin shoud seen the Complete hierarchy view', { timeout: 30000 }, async function (this: CustomWorld) {
  
  await this.coursestructure.verifyPreviewVisible();
});