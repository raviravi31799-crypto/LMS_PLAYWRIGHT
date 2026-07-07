import {Basepage} from "./Basepage";
import {logger} from "../utils/winstonlogger"
import {expect} from '@playwright/test'
export class courseHierarchyPage extends Basepage{
private courseLevel=this.page.locator("//label[contains(normalize-space(),'Course Level')]/following::button[@role='combobox'][1]");
}
