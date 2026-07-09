import {Basepage} from "./Basepage";
import {logger} from "../utils/winstonlogger"
import {expect} from '@playwright/test'
export class CourseHierarchyPage extends Basepage{
private courseLevel=this.page.locator("//label[contains(normalize-space(),'Course Level')]/following::button[@role='combobox'][1]");
private description=this.page.locator("//div[contains(@class,'ProseMirror')]");
private module=this.page.locator("//label[contains(normalize-space(),'Module')]");
private submodule=this.page.locator("//label[contains(normalize-space(),'Submodule')]");
private iDoDropdown = this.page.locator(
  "//p[normalize-space()='Teacher demonstrates concepts and skills']/following::button[@role='combobox'][1]"
);

//private weDoDropdown = this.page.locator(
 // "//p[normalize-space()='Guided practice with instructor support']/following::button[@role='combobox'][1]"
//);
private weDoDropdown = this.page.locator(
"//p[normalize-space()='Guided practice with instructor support']/following::button[@role='combobox'][1]"
);
private weDoSection = this.page.locator("div").filter({
    hasText: "Guided practice with instructor support"
});

//private weDoDropdown = this.weDoSection.getByRole("combobox");

private youDoDropdown = this.page.locator(
  "//p[normalize-space()='Independent practice and application']/following::button[@role='combobox'][1]"
);private preview=this.page.locator("//button[normalize-space()='Preview & Create']");
private courseLayoutPreview=this.page.locator("//div[@data-slot='dialog-header']//h2");
private saveLayout=this.page.locator("//button[normalize-space()='Save Course Layout']");
private later=this.page.locator("//button[normalize-space()='Later']");
private addCourseStructure=this.page.locator("//h2[normalize-space()='Add Course Structure?']");

async enterCourseHierarchy(data: any) {

        await this.select(this.courseLevel, data.courseLevel);

        await this.description.fill(data.description);
        await this.module.click();
        await this.submodule.click();
        // await this.multiSelect(this.iDoDropdown, data.pedagogy.iDo);
        // await this.validateSelectedValue(data.pedagogy.iDo);
        // await this.multiSelect(this.weDoDropdown, data.pedagogy.weDo);
        // await this.validateSelectedValue(data.pedagogy.weDo);
        // await this.multiSelect(this.youDoDropdown, data.pedagogy.youDo);
        // await this.validateSelectedValue(data.pedagogy.youDo);
        await this.multiSelect(this.iDoDropdown, data.pedagogy.iDo.value);
        //await this.validateSelectedValue(data.pedagogy.iDo.value);
        await this.multiSelect(this.weDoDropdown, data.pedagogy.weDo.value);
        //await this.validateSelectedValue(data.pedagogy.weDo.value);
        await this.multiSelect(this.youDoDropdown, data.pedagogy.youDo.value);
        //await this.validateSelectedValue(data.pedagogy.youDo.value);

        for (const skill of data.skills.coreProgramming) {
            await this.selectSkill(skill);
        }

        for (const skill of data.skills.frontend) {
            await this.selectSkill(skill);
        }

        for (const skill of data.skills.database) {
            await this.selectSkill(skill);
        }

        await this.enableResources("I Do", data.resourceType.iDo);

        await this.enableResources("We Do", data.resourceType.weDo);

        await this.enableResources("You Do", data.resourceType.youDo);

    }
async clickPreviewCreate(){
    await this.preview.click();
}
async verifyCourseCreated(){
    await expect(this.courseLayoutPreview).toBeVisible();
}
async clicksaveLayout(){
    await this.saveLayout.click();
}
async verifycourseadded(){
    await expect(this.addCourseStructure).toBeVisible();
    await this.later.click();
}
async validateSelectedValue(value: string) {
    await expect(this.page.locator("span.font-medium")).toContainText(value);
}

}

