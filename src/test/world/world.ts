import { CourseManagementPage } from './../pages/CourseManagementPage';
import { Browser, BrowserContext, Page } from "@playwright/test";
import { Loginpage } from "../pages/Loginpage";
import { CourseStructure } from "../pages/AddCourseStructurePage";
import { EditDeletepage } from "../pages/EditDeletepage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    courseId!: string;

    loginpage!: Loginpage;
    coursestructure!: CourseStructure;
    courseManagementpage!:CourseManagementPage;
    editdeletepage!:EditDeletepage;
}

