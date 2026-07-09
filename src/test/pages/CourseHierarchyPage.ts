import { Basepage } from "./Basepage";
import { logger } from "../utils/winstonlogger";
import { expect } from "@playwright/test";

export class CourseHierarchyPage extends Basepage {

    private courseLevel = this.page.locator("//label[contains(normalize-space(),'Course Level')]/following::button[@role='combobox'][1]");
    private description = this.page.locator("//div[contains(@class,'ProseMirror')]");
    private module = this.page.locator("//label[contains(normalize-space(),'Module')]");
    private submodule = this.page.locator("//label[contains(normalize-space(),'Submodule')]");

    private pedagogyDropdown(index: number) {
        return this.page.locator("button[role='combobox']").nth(index);
    }

    private preview = this.page.locator("//button[normalize-space()='Preview & Create']");
    private iDo = this.page.locator("(//button[@role='combobox'])[2]").first();
    private weDo = this.page.locator("(//button[@role='combobox'])[3]").first();
    private youDo = this.page.locator("(//button[@role='combobox'])[4]").first();

    private courseLayoutPreview = this.page.locator("//div[@data-slot='dialog-header']//h2");
    private saveLayout = this.page.locator("//button[normalize-space()='Save Course Layout']");
    private later = this.page.locator("//button[normalize-space()='Later']");
    private addCourseStructure = this.page.locator("//h2[normalize-space()='Add Course Structure?']");

    async enterCourseHierarchy(data: any) {

        logger.info("Entering Course Hierarchy details");

        await this.select(this.courseLevel, data.courseLevel);
        logger.info(`Course Level selected: ${data.courseLevel}`);

        await this.description.fill(data.description);

        await this.module.click();
        await this.submodule.click();
        logger.info("Module and Submodule selected");

        await this.selectFirstOption(this.iDo);
        await this.selectFirstOption(this.weDo);
        await this.selectFirstOption(this.youDo);
        logger.info("I Do, We Do and You Do pedagogy selected");

        for (const skill of data.skills.coreProgramming) {
            await this.selectSkill(skill);
        }

        for (const skill of data.skills.frontend) {
            await this.selectSkill(skill);
        }

        for (const skill of data.skills.database) {
            await this.selectSkill(skill);
        }
        logger.info("All required skills selected");

        await this.enableResources("I Do", data.resourceType.iDo);
        await this.enableResources("We Do", data.resourceType.weDo);
        await this.enableResources("You Do", data.resourceType.youDo);
        logger.info("Resources enabled successfully");
    }

    async clickPreviewCreate() {
        await this.preview.click();
        logger.info("Clicked Preview & Create button");
    }

    async verifyCourseCreated() {
        await expect(this.courseLayoutPreview).toBeVisible();
        logger.info("Course Layout Preview displayed successfully");
    }

    async clicksaveLayout() {
        await this.saveLayout.click();
        logger.info("Clicked Save Course Layout button");
    }

    async verifycourseadded() {
        await expect(this.addCourseStructure).toBeVisible();
        logger.info("Add Course Structure popup verified");

        await this.later.click();
        logger.info("Clicked Later button");
    }

    async validateSelectedValue(value: string) {
        await expect(this.page.locator("span.font-medium")).toContainText(value);
        logger.info(`Validated selected value: ${value}`);
    }
}