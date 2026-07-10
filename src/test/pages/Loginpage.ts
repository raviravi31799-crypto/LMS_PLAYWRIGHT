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
  //private text=this.page.locator("h1");
  private warningtext=this.page.locator("//div[text()='Email is invalid']");
  private errormsg=this.page.locator("//div[text()='Password is incorrect']");


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
    await this.page.waitForLoadState("domcontentloaded");
    const dashboardtext= await this.getText(this.text);
    await expect(dashboardtext).toContain("Executive Overview");
    logger.info("Logged in successfully");

  }

  //Invalid login with invalid email
  async getWarningtext(){
      const msg=await this.getText(this.warningtext);
      await expect(msg).toContain("Email is invalid");
      
      logger.info("Invalid login using invalid email is verified");
  }
  //Invalidlogin with invalid password
    async Errortext() {
      const error=await this.getText(this.errormsg);
      await expect(error).toContain("Password is incorrect");
      logger.info("Invalid login using invalid password is verified successfully");

    }
    //invalid login with blank mandatory fields
    async getvalidationmessage(message:string){
      let validationMessage;
       if (!await this.email.inputValue()) {
       validationMessage =await this.email.evaluate((el: HTMLInputElement) => el.validationMessage);
    } 
    else {
      validationMessage =await this.password.evaluate((el: HTMLInputElement) => el.validationMessage);
    }
     expect(validationMessage).toBe(message);
     logger.info("Invalid login with blank mandatory fields is verified");
  }


  //Reusable login method

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