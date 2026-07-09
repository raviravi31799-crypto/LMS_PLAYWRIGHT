import { CourseHierarchyPage } from './../pages/CourseHierarchyPage';
import { CourseManagementPage } from './../pages/CourseManagementPage';
import { Browser, BrowserContext, Page } from "@playwright/test";
import { Loginpage } from "../pages/Loginpage";
import { CourseStructure } from "../pages/AddCourseStructurePage";
import { EditDeletepage } from "../pages/EditDeletepage";
import { CoursePage } from "../pages/CoursePage";
import { PedagogyPage } from '../pages/PedagogyPage';
import {Logoutpage} from "../pages/Logoutpage";


import { ServiceModelPage } from '../pages/ServiceModelPage';
import { DynamicCourseCategoryPage } from '../pages/DynamicCourseCategoryPage';



export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;


    courseId!: string;
    categoryName!: string;
    courseName!: string;
    updatedCategoryName!:string;
  

    loginpage!: Loginpage;
    coursestructure!: CourseStructure;
    coursepage!: CoursePage;
    coursehierarchypage!:CourseHierarchyPage;
    courseManagementpage!:CourseManagementPage;
    editdeletepage!:EditDeletepage;
    pedagogyPage!:PedagogyPage;
    logoutpage!:Logoutpage;
    servicemodelpage!:ServiceModelPage;
    dynamiccoursecategorypage!:DynamicCourseCategoryPage;
   
    
}

