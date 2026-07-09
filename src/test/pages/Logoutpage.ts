import { expect, Page } from "@playwright/test";
import "../utils/envReader";
import { logger } from '../utils/winstonlogger';
import { Basepage } from "./Basepage";


export class Logoutpage extends Basepage{
    constructor(page:Page){
        super(page);
    }

    private profilelink =this.page.locator("//button[@id='radix-«r2»']");
    private signout=this.page.getByText("Sign Out");
    private loginpage=this.page.locator("//h1[text()='Login']");

    async clickonprofile(){
         await this.click(this.profilelink);
         logger.info("Clicked on profile");
    }
    async clicksignout(){
        await this.click(this.signout);
        logger.info("Clicked on signout");
    }
    async verifyLogintext(){
        const text=await this.getText(this.loginpage);
        await expect(text).toBe("Login");
        logger.info("Logged out successfully");
    }
    

}