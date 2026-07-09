import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { readCSV } from "../utils/csvReader";
import { pedagogyElement } from "../types/pedagogy";
import * as fs from "fs";
import * as path from "path";

function readJSON(fileName: string) {
    const filePath = path.resolve(__dirname, "../../../testdata", fileName); // Adjust path relative to your steps folder
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

When("the admin navigates to the Dynamic Field Settings page",{ timeout: 20000 },async function (this: CustomWorld) {
        await this.pedagogyPage.navigateToDynamicFieldSettings();
    }
);

When("the admin clicks the Pedagogy tab",{ timeout: 20000 },async function (this: CustomWorld) {
        await this.pedagogyPage.clickPedagogy();
    }
);

When("the admin opens the {string} pedagogy elements",{ timeout: 20000 },async function (this: CustomWorld, activity: string) {
        await this.pedagogyPage.clickPedagogyElements(activity);
    }
);

When("the admin adds a new element",{ timeout: 20000 },async function (this: CustomWorld) {
        const jsonData = readJSON("pedagogy_add.json");
        const element = jsonData.elementName;
        
        if (!element) {
            throw new Error("Property 'elementName' not found in pedagogy_add.json");
        }

        await this.pedagogyPage.addNewElement(element);

        (this as any).targetCreatedName = element;
    }
);

Then("the pedagogy element should be created successfully",{ timeout: 30000 },async function (this: CustomWorld) {
        const expectedName = (this as any).targetCreatedName;
        await this.pedagogyPage.verifyElementCreated(expectedName);
    }
);

When("the admin clicks the edit option and update the element",{ timeout: 30000 },async function (this: CustomWorld) {
        const dataList = readCSV("pedagogy.csv") as pedagogyElement[];

        const updatedName = dataList[0]?.newName;
        if (!updatedName) {
            throw new Error("No update data found under the 'newName' column in pedagogy.csv");
        }

        (this as any).targetUpdatedName = updatedName;
    }
);

When("the admin clicks update element button",{ timeout: 30000 },async function (this: CustomWorld) {
        const updatedName = (this as any).targetUpdatedName;
        await this.pedagogyPage.updatePedagogyElement(updatedName);
    }
);

Then("the element should be successfully updated",{ timeout: 30000 },async function (this: CustomWorld) {
        const expectedName = (this as any).targetUpdatedName;
        await this.pedagogyPage.verifyElementUpdated(expectedName);
    }
);

When("the admin clicks the delete option and click the delete button",{ timeout: 30000 },async function (this: CustomWorld) {
        await this.pedagogyPage.deletePedagogyElement();
    }
);

Then("the element should be deleted from the pedagogy elements",{ timeout: 30000 },async function (this: CustomWorld) {
        await this.pedagogyPage.verifyElementDeleted();
    }
);