import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";

When(
    "the admin navigates to the Dynamic Field Settings page",
    { timeout: 20000 },
    async function (this: CustomWorld) {
        await this.pedagogyPage.navigateToDynamicFieldSettings();
    }
);

When(
    "the admin clicks the Pedagogy tab",
    { timeout: 20000 },
    async function (this: CustomWorld) {
        await this.pedagogyPage.clickPedagogy();
    }
);

When(
    "the admin opens the {string} pedagogy elements",
    { timeout: 20000 },
    async function (this: CustomWorld, activity: string) {
        await this.pedagogyPage.clickPedagogyElements(activity);
    }
);

When(
    "the admin adds a new element {string}",
    { timeout: 20000 },
    async function (this: CustomWorld, element: string) {
        await this.pedagogyPage.addNewElement(element);
    }
);

Then(
    "the pedagogy element {string} should be created successfully",
    { timeout: 30000 },
    async function (this: CustomWorld, element: string) {
        await this.pedagogyPage.verifyElementCreated(element);
    }
);

When(
    "the admin clicks the delete option and click the delete button",
    { timeout: 30000 },
    async function (this: CustomWorld) {
        await this.pedagogyPage.deletePedagogyElement();
    }
);

Then(
    "the element should be deleted from the pedagogy elements",
    { timeout: 30000 },
    async function (this: CustomWorld) {
        await this.pedagogyPage.verifyElementDeleted();
    }
);