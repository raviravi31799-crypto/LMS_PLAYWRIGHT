import { expect, Page } from "@playwright/test";
import { Basepage } from "./Basepage";

export class EditDeletepage extends Basepage {

    constructor(page: Page) {
        super(page);
    }
    cousemodule=this.page.locator("//div[@title='Course Management']//div[@class='p-1.5']//*[name()='svg']");
    editCourse = this.page.locator("//button[normalize-space()='Edit Course']");
    nextButton = this.page.locator("//div[@role='dialog']//button[normalize-space()='Next']");
    previewUpdateButton = this.page.locator("//button[contains(.,'Preview') and contains(.,'Update')]");
    saveCourseLayoutButton = this.page.locator("//button[contains(.,'Save Course Layout')]");
    successMessage = this.page.locator('.Toastify__progress-bar--wrp');
    laterButton = this.page.locator('button:has-text("Later")');
    viewButton = this.page.locator("(//button[contains(.,'View')])[1]");
    courseList = this.page.locator("//h4[normalize-space()='Course Levels']/parent::div/following-sibling::div//span"); 
    subModuleCheckbox = this.page.locator("label[for='submodule-checkbox']:visible");
    topicCheckbox = this.page.locator("//input[@id='topic-checkbox']");
    subTopicCheckbox = this.page.locator("//input[@id='subtopic-checkbox']");
    loadingSpinner = this.page.locator("//div[contains(text(),'Loading course data')]");
    modalLoadingOverlay = this.page.locator("//div[@role='dialog']//div[contains(@class,'flex-1') and contains(@class,'items-center') and contains(@class,'justify-center')]");   
    deleteCourseOption = this.page.locator("//button[normalize-space()='Delete Course' and not(ancestor::div[@role='dialog'])]");
    confirmDeleteButton = this.page.locator("//div[@role='dialog']//button[normalize-space()='Delete Course']");
    noDataMessage = this.page.locator("//p[normalize-space()='No data matches your current criteria']"); 
    searchInput = this.page.locator("//input[@placeholder='Search courses, codes, clients, or categories...']");
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
    await this.modalLoadingOverlay.waitFor({ state: "hidden", timeout: 30000 }).catch(() => {});
    await this.nextButton.click();
}
async editCourseHierarchy() {
    await this.loadingSpinner.waitFor({ state: "hidden", timeout: 30000 });
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


async clickDeleteCourse() {
    await this.click(this.deleteCourseOption);
}

async confirmDeleteCourse() {
    await this.confirmDeleteButton.waitFor({ state: "visible" });
    await this.click(this.confirmDeleteButton);
    await this.confirmDeleteButton.waitFor({ state: "hidden", timeout: 15000 });
    await this.page.waitForLoadState("networkidle");
}

async searchCourse(courseId: string) {
    await this.filldata(this.searchInput, courseId);
}

async verifyCourseNotListed() {
    await this.page.screenshot({ path: 'debug-delete-search.png', fullPage: true });
    await expect(this.noDataMessage).toBeVisible({ timeout: 15000 });
}
}