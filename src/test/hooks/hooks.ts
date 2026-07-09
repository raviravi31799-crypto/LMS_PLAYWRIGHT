import { logger } from '../utils/winstonlogger';
import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { CustomWorld } from "../world/world";
import { Loginpage } from '../pages/Loginpage';
import { CourseStructure } from '../pages/AddCourseStructurePage';
import { CoursePage } from '../pages/CoursePage';
import { CourseHierarchyPage } from '../pages/CourseHierarchyPage';
import { CourseManagementPage } from '../pages/CourseManagementPage';
import { EditDeletepage } from '../pages/EditDeletepage';
import { PedagogyPage } from '../pages/PedagogyPage';
import { Logoutpage } from '../pages/Logoutpage';
import { ServiceModelPage } from '../pages/ServiceModelPage';
import { DynamicCourseCategoryPage } from '../pages/DynamicCourseCategoryPage';



let browser: Browser;
BeforeAll(async () => {
    logger.info("Launching browser");
    browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld, scenario) {
    logger.info(`Starting scenario:${scenario.pickle.name}`);
    this.browser=browser;
    this.context=await browser.newContext();
    this.page=await this.context.newPage();
    this.loginpage=new Loginpage(this.page);
    this.editdeletepage=new EditDeletepage(this.page);
    this.coursestructure = new CourseStructure(this.page);
    this.coursepage = new CoursePage(this.page);
    this.coursehierarchypage=new CourseHierarchyPage(this.page);
    this.coursepage = new CoursePage(this.page); 
    this.courseManagementpage = new CourseManagementPage(this.page);
    this.pedagogyPage = new PedagogyPage(this.page);
    this.logoutpage=new Logoutpage(this.page);
    this.servicemodelpage=new ServiceModelPage(this.page);

    this.dynamiccoursecategorypage = new DynamicCourseCategoryPage(this.page);
    this.servicemodelpage=new ServiceModelPage(this.page);

});

After(async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === "FAILED") {
        const path = `reports/screenshots/${Date.now()}.png`;
        await this.page.screenshot({ path });
        logger.error(`Screenshot FAILED:${scenario.pickle.name}`);
        logger.error(`Screenshot saved:${path}`);
    } else {
        logger.info(`Scenario PASSED:${scenario.pickle.name}`);
    }
    await this.page.close();
    await this.context.close();
});

AfterAll(async () => {
    logger.info("closing browser");
    await browser.close();
});
