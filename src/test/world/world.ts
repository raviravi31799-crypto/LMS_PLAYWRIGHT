import{Browser,BrowserContext,Page} from "@playwright/test";
import{Loginpage} from "../pages/Loginpage";

export class CustomWorld{
    browser!:Browser;
    context!:BrowserContext;
    page!:Page;
    

    loginpage!:Loginpage;

    

   
}