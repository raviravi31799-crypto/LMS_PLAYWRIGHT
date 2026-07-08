import { expect, Page } from "@playwright/test";
import "../utils/envReader";
import { logger } from '../utils/winstonlogger';
import { Basepage } from "./Basepage";

export class Loginpage extends Basepage{
    constructor(page:Page){
        super(page);
    }
  private email=this.page.locator("//input[@id='email']");
  private password=this.page.locator("//input[@id='password']");
  private sigin=this.page.locator("button[type='submit']");
  private text=this.page.locator("//div[@class='jsx-19ca30d8d511510e']/descendant::h1");
  private warningtext=this.page.locator("//div[text()='Email is invalid']");


  async launch(){
    await this.launchapplication(process.env.BASE_URL!);
    logger.info("Application launched succesfully");
  }
  async enterdatas(email:string,password:string){
    await this.filldata(this.email,email);
    await this.filldata(this.password,password);
    logger.info("login datas are entered");
  }
  async clicksignin(){
    await this.click(this.sigin);
    logger.info("Clicked on signin");
  }

  async dashboardpage(){
    const dashboardtext= await this.getText(this.text);
    await expect(dashboardtext).toContain("Executive Overview");
    logger.info("Logged in successfully");

  }
  async getWarningtext(){
      const msg=await this.getText(this.warningtext);
      await expect(msg).toBe("Email is invalid");
      logger.info("Invalid login using invalid email is verified");

  }

  async login(){
    await this.launch();
    await this.enterdatas(
      process.env.EMAIL!,
      process.env.PASSWORD!
    );
    await this.clicksignin();
    await this.dashboardpage();
  }
}