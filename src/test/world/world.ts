import { Browser, BrowserContext, Page } from "@playwright/test";
import { Loginpage } from "../pages/Loginpage";
import { CourseStructure } from "../pages/AddCourseStructurePage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    loginpage!: Loginpage;
    coursestructure!: CourseStructure;
}
