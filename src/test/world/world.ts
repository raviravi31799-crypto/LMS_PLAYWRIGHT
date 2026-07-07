import { courseHierarchyPage } from './../pages/CourseHierarchyPage';
import { Browser, BrowserContext, Page } from "@playwright/test";
import { Loginpage } from "../pages/Loginpage";
import { CourseStructure } from "../pages/AddCourseStructurePage";
import { CoursePage } from "../pages/CoursePage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    loginpage!: Loginpage;
    coursestructure!: CourseStructure;
    coursepage!: CoursePage;
    coursehierarchypage!:courseHierarchyPage;
}
