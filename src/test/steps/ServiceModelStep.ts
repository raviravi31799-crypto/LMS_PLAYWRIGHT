import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../world/world";

When("admin clicks the Dynamic field setting menu", async function (this: CustomWorld) {
    await this.servicemodelpage.clickDynamicSettingBtn();
    await this.servicemodelpage.clickServiceBtn();
});

When("the admin clicks the Add Service button", async function (this: CustomWorld) {
    await this.servicemodelpage.clickAddService();
});

When("the admin enters the service name {string}", async function (this: CustomWorld, ServiceName) {
    await this.servicemodelpage.addServiceName(ServiceName);
});

When("the admin enters the description {string}", async function (this: CustomWorld, Description) {
    await this.servicemodelpage.addServiceDescription(Description);
});

When("the admin clicks the Create Service button", async function (this: CustomWorld) {
    await this.servicemodelpage.clickCreateService();
});

Then("the service should be created successfully",{timeout:30000}, async function (this: CustomWorld) {
    await this.servicemodelpage.validSuccess();
});

