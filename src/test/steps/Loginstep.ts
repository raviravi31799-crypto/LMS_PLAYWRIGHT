import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import logindata from "../../../testdata/logindata.json";

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
Given('the user enters invalid email and valid password', async function (this:CustomWorld) {
  await this.loginpage.enterdatas(
   logindata.invalidemail.email,
   logindata.invalidemail.password
  );
  
});

Then('the user receives warning text',{timeout:30000}, async function (this:CustomWorld) {
    await this.loginpage.getWarningtext();
});

Given('the user enters valid email and invalid password', async function (this:CustomWorld) {
     await this.loginpage.enterdatas(
      logindata.invalidpassword.email,
      logindata.invalidpassword.password
     );
});

Then('the user receives warning intimating invalid password',{timeout:50000}, async function (this:CustomWorld) {
       await this.loginpage.Errortext();
});

When('the user enters {string} and {string}', async function (this:CustomWorld,email, password) {
     await this.loginpage.enterdatas(email,password);
});

Then('the browser displays {string} validation', async function (this:CustomWorld,message) {
  await this.loginpage.getvalidationmessage(message);
});
