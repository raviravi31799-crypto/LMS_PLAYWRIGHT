import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { readCSV } from "../utils/csvReader";
import { ServiceData } from "../types/csvTypes";

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
When('the admin enters the service details', async function (this:CustomWorld) {
    const data = readCSV<ServiceData>("AddDuplicateService.csv");
    await this.servicemodelpage.addServiceName(data[0]!.ServiceName);
    await this.servicemodelpage.addServiceDescription(data[0]!.Description);
});
Then(
    "an error toast message should be displayed",
    { timeout: 60000 },
    async function (this: CustomWorld) {
        await this.servicemodelpage.validduplicate();
    }
);
When(
    "the admin searches for the service {string}",
    async function (this: CustomWorld, serviceName: string) {
        await this.servicemodelpage.searchServiceName(serviceName);
    }
);

Then(
    "the exact service {string} should be displayed",
    async function (this: CustomWorld, serviceName: string) {
        await this.servicemodelpage.verifyExactService(serviceName);
    }
);
