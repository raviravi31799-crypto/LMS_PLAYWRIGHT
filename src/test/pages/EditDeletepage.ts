import { expect, Page } from "@playwright/test";
import { Basepage } from "./Basepage";

export class EditDeletepage extends Basepage {

    constructor(page: Page) {
        super(page);
    }
    cousemodule=this.page.locator("//div[@title='Course Management']//div[@class='p-1.5']//*[name()='svg']");
    editCourse = this.page.locator("//button[normalize-space()='Edit Course']");
    nextButton = this.page.locator("//button[normalize-space()='Next']");
    previewUpdateButton = this.page.locator("//button[contains(.,'Preview') and contains(.,'Update')]");
    saveCourseLayoutButton = this.page.locator("//button[contains(.,'Save Course Layout')]");
    successMessage = this.page.locator("//div[contains(@class,'Toastify') or contains(text(),'success')]");
    laterButton = this.page.locator('button:has-text("Later")');
    viewButton = this.page.locator("(//button[contains(.,'View')])[1]");
    courseList = this.page.locator("//h4[normalize-space()='Course Levels']/parent::div/following-sibling::div//span");
    subModuleCheckbox = this.page.locator("//input[@id='submodule-checkbox']");
    topicCheckbox = this.page.locator("//input[@id='topic-checkbox']");
    subTopicCheckbox = this.page.locator("//input[@id='subtopic-checkbox']");
 async navigatecoursemodule(){
       await this.click(this.cousemodule);
  }
    getThreeDotButton(courseId: string) {
        return this.page.locator(
            `(//tr[.//span[normalize-space()='${courseId}']]//button)[last()]`
        );
    }

    async clickThreeDot(courseId: string) {
        await this.click(this.getThreeDotButton(courseId));
    }

    async clickEditCourse() {
        await this.click(this.editCourse);
    }

    async clickNextButton() {
        await this.nextButton.waitFor({ state: "visible" });
        await this.nextButton.click({ force: true });
    }

    async editCourseHierarchy() {
    await this.checkbox(this.subModuleCheckbox);
    await this.checkbox(this.topicCheckbox);
    await this.checkbox(this.subTopicCheckbox);
   }
    async clickPreviewUpdate() {
        await this.click(this.previewUpdateButton);
    }

    async clickSaveCourseLayout() {
        await this.click(this.saveCourseLayoutButton);
    }

    async verifySuccessMessage() {
        await expect(this.successMessage).toBeVisible();
    }

    async clickLater() {
        await this.click(this.laterButton);
    }

    
getViewButton(courseId: string) {
    return this.page.locator(
        `//tr[.//*[normalize-space()='${courseId}']]//td[5]//button`
    );
}

async clickView(courseId: string) {
    await this.click(this.getViewButton(courseId));
}

}