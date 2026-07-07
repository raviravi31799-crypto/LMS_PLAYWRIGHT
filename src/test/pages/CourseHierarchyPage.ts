import  addCourse from '../../../testdata/addCourse.json';
import {Basepage} from "./Basepage";
import {logger} from "../utils/winstonlogger"
import {expect} from '@playwright/test'
export class courseHierarchyPage extends Basepage{
private courseLevel=this.page.locator("//label[contains(normalize-space(),'Course Level')]/following::button[@role='combobox'][1]");
private description=this.page.locator("//div[contains(@class,'ProseMirror')]");
private module=this.page.locator("//label[contains(normalize-space(),'Module')]");
private submodule=this.page.locator("//label[contains(normalize-space(),'Submodule')]");
private iDoDropdown=this.page.locator("//label[contains(.,'Module')]/following::button[@role='combobox'][1]");
private weDoDropdown=this.page.locator("//label[contains(.,'Module')]/following::button[@role='combobox'][2]");
private youDoDropdown=this.page.locator("//label[contains(.,'Module')]/following::button[@role='combobox'][3]");
private preview=this.page.locator("//button[normalize-space()='Preview & Create']");
private courseLayoutPreview=this.page.locator("//div[@data-slot='dialog-header']//h2");
private saveLayout=this.page.locator("//button[normalize-space()='Save Course Layout']");
private later=this.page.locator("//button[normalize-space()='Later']");
private addCourseStructure=this.page.locator("//h2[normalize-space()='Add Course Structure?']");






async enterCourseHierarchy(data: any) {

        await this.select(this.courseLevel, data.courseLevel);

        await this.description.fill(data.description);
        await this.module.click();
        await this.submodule.click();


        await this.select(this.iDoDropdown, data.pedagogy.iDo);

        await this.select(this.weDoDropdown, data.pedagogy.weDo);

        await this.select(this.youDoDropdown, data.pedagogy.youDo);

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

}

