import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";

Given('the user is on the login page', async function (this:CustomWorld) {
  await this.loginpage.launch();
});

Given('the user enters valid login details', async function (this:CustomWorld,dataTable) {
    const data=dataTable.hashes()[0];
    await this.loginpage.enterdatas(
    data.email,
    data.password
 );
});

When('the user clicks Signin button', async function (this:CustomWorld) {
  await this.loginpage.clicksignin();
});

Then('the user is redirected to dashboardpage',{timeout:50000}, async function (this:CustomWorld) {
  await this.loginpage.dashboardpage();
});
