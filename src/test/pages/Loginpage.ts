import{Page} from "@playwright/test";
import { Basepage } from "./Basepage";
import { logger } from '../utils/winstonlogger';
import "../utils/envReader";
import{expect} from "@playwright/test";

export class Loginpage extends Basepage{
    constructor(page:Page){
        super(page);
    }
  private email=this.page.locator("//input[@id='email']");
  private password=this.page.locator("//input[@id='password']");
  private sigin=this.page.locator("button[type='submit']");
  private text=this.page.locator("//div[@class='jsx-19ca30d8d511510e']/descendant::h1");


  async launch(){
    await this.launchapplication(process.env.BASE_URL!);
    logger.info("Application launched succesfully");
  }
  async enterdatas(email:string,password:string){
    await this.email.fill(email);
    await this.password.fill(password);
    logger.info("Valid login datas are entered");
  }
  async clicksignin(){
    await this.click(this.sigin);
    logger.info("Clicked on signin");
  }

  async dashboardpage(){
    const dashboardtext= await this.text.textContent();
    await expect(dashboardtext).toContain("Executive Overview");
    logger.info("Logged in successfully");

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