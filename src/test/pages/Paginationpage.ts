import { Basepage } from "./Basepage";
import { CourseManagementPage } from "./CourseManagementPage";
import { logger } from "../utils/winstonlogger";
import{Page,expect} from "@playwright/test";

export class paginationpage extends Basepage{
    constructor (page:Page){
        super(page);
    }

   // private previous=this.page.locator("//div[@class='flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 font-sans']//div[@class='flex items-center gap-2']");
    private firstpage=this.page.locator("//button[text()='1']");
    private nextbtn=this.page.getByText("Next");
    private secondpage=this.page.locator("//button[text()='2']");

     async verifyFirstPage() {
        await expect(this.firstpage).toHaveText("1");
        logger.info("Firstpage is verified successfully");
    }

    async clickNextButton() {
        await this.nextbtn.click();
        logger.info("Clicked on next button");
    }

    async verifySecondPage() {
        await expect(this.secondpage).toHaveText("2");
        logger.info("Fuctionality of next button is verified successfully");
    }

}
