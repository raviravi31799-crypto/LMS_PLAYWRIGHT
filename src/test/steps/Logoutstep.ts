import{Given,When,Then} from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";



Given('the user is logged into the application successfully',{timeout:50000}, async function (this:CustomWorld) {
 await this.loginpage.login();
});

Given('the user selects profile menu', async function (this:CustomWorld) {
   await this.logoutpage.clickonprofile();
});

When('the user clicks on Signout Button', async function (this:CustomWorld) {
 await this.logoutpage.clicksignout();
});

Then('the user is navigated to login page again',{timeout:50000}, async function (this:CustomWorld) {
  await this.logoutpage.verifyLogintext();
});
