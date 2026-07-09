import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";


When("the admin navigates to the Dynamic Field Settings page", async function (this:CustomWorld) {
    await this.pedagogyPage.navigateToDynamicFieldSettings();
});

When("the admin clicks the Pedagogy tab", async function (this:CustomWorld) {
    await this.pedagogyPage.clickPedagogy();
});

When("the admin opens the {string} pedagogy elements",{ timeout: 20000 },async function (this:CustomWorld,activity: string) {
        await this.pedagogyPage.clickPedagogyElements(activity);
    }
);

When("the admin adds a new element {string}",async function (this:CustomWorld,element: string) {
        await this.pedagogyPage.addNewElement(element);
    }
);

Then("the pedagogy element {string} should be created successfully",async function (this:CustomWorld,element: string) {
        await this.pedagogyPage.verifyElementCreated(element);
    }
);