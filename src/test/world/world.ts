import { CourseHierarchyPage } from './../pages/CourseHierarchyPage';
import { CourseManagementPage } from './../pages/CourseManagementPage';
import { Browser, BrowserContext, Page } from "@playwright/test";
import { Loginpage } from "../pages/Loginpage";
import { CourseStructure } from "../pages/AddCourseStructurePage";
import { EditDeletepage } from "../pages/EditDeletepage";
import { CoursePage } from "../pages/CoursePage";
import {Logoutpage} from "../pages/Logoutpage";


export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    courseId!: string;

    loginpage!: Loginpage;
    coursestructure!: CourseStructure;
    coursepage!: CoursePage;
    coursehierarchypage!:CourseHierarchyPage;
    courseManagementpage!:CourseManagementPage;
    editdeletepage!:EditDeletepage;
    logoutpage!:Logoutpage;
}

