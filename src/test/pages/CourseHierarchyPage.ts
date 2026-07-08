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
private weDoSection = this.page.locator("div").filter({
    hasText: "Guided practice with instructor support"
});

private weDoDropdown = this.weDoSection.getByRole("combobox");

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
        const count = await this.page.locator("button[role='combobox']").count();
console.log("Combobox Count:", count);
        console.log("I Do");
await this.multiSelect(this.iDoDropdown, data.pedagogy.iDo);
console.log("We Do");
console.log("We Do Count:", await this.weDoDropdown.count());

await this.weDoDropdown.highlight(); // Optional (Playwright 1.20+)
await this.page.screenshot({
    path: "beforeWeDo.png",
    fullPage: true
});
await expect(this.weDoDropdown).toBeVisible({ timeout: 50000 });
await this.multiSelect(this.weDoDropdown, data.pedagogy.weDo);

console.log("You Do");
await this.multiSelect(this.youDoDropdown, data.pedagogy.youDo);
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

