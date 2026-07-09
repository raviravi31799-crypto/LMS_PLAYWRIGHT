import { Page } from "@playwright/test";
import { Basepage } from "./Basepage";

export class DynamicCourseCategoryPage extends Basepage {

    constructor(page: Page) {
        super(page);
    }

    dynamicFieldSettingsIcon = this.page.locator("//div[@title='Dynamic Field Settings']");
    courseCategoryTab = this.page.locator("//*[normalize-space()='Course Category']");
    addCategoryButton = this.page.locator("//button[contains(.,'Add Category')]");
    categoryNameInput = this.page.locator("//input[@placeholder='Enter category name']");
    courseNamesInput = this.page.locator("//input[@placeholder='Type course name and press Enter...']");
    categoryDescriptionTextarea = this.page.locator("//textarea[@placeholder='Enter category description']");
    createCategoryButton = this.page.locator("//button[normalize-space()='Create Category']");
    closeButton = this.page.locator("//button[normalize-space()='Close' and not(@data-slot='dialog-close')]");
    categoryNameColumn = this.page.locator("//table//tbody//tr/td[1]");
    categorySearchInput = this.page.locator("//input[@placeholder='Search by name, description, code or courses...']");

    async navigateToDynamicFieldsManagement() {
        await this.click(this.dynamicFieldSettingsIcon);
    }

    async navigateToCourseCategoryMenu() {
        await this.click(this.courseCategoryTab);
    }

    async clickAddCategory() {
        await this.click(this.addCategoryButton);
    }

    async fillCategoryDetails(categoryName: string, courseNames: string[], description: string) {
        await this.filldata(this.categoryNameInput, categoryName);
        for (const course of courseNames) {
            await this.filldata(this.courseNamesInput, course);
            await this.pressEnter(this.courseNamesInput);
        }
        await this.filldata(this.categoryDescriptionTextarea, description);
    }

    async clickCreateCategory() {
        await this.click(this.createCategoryButton);
    }

    async clickClose() {
        await this.click(this.closeButton);
    }

    async verifyCategoryDisplayed(categoryName: string) {
        await this.filldata(this.categorySearchInput, categoryName);
        await this.page.waitForLoadState("networkidle");
        const names = await this.getAllTextContents(this.categoryNameColumn);
        return names.includes(categoryName);
    }
}