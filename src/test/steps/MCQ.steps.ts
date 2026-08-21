import { DataTable, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { MCQDataRow } from "../pages/quiz.page";

When('admin click the question bank menu', { timeout: 30000 }, async function (this: CustomWorld) {
    await this.quizPage.clickQuestionBankMenu();
});

When('admin click the create question button', { timeout: 30000 }, async function (this: CustomWorld) {
    await this.quizPage.clickCreateQuestionButton();
});

When('admin click the MCQ Question button', { timeout: 30000 }, async function (this: CustomWorld) {
    await this.quizPage.clickMCQQuestionButton();
});

When('admin enter the category', { timeout: 30000 }, async function (this: CustomWorld) {
    await this.quizPage.enterCategory();
});

When('admin click the question type dropdown', { timeout: 30000 }, async function (this: CustomWorld) {
    await this.quizPage.clickQuestionTypeDropdown();
});

When('admin choose the multiple choice option', { timeout: 30000 }, async function (this: CustomWorld) {
    await this.quizPage.chooseMultipleChoiceOption();
});

When('admin choose the true or false option', { timeout: 30000 }, async function (this: CustomWorld) {
    await this.quizPage.chooseTrueFalseOption();
});

When('admin add the question and options using the following data', { timeout: 120000 }, async function (this: CustomWorld, dataTable: DataTable) {
    const rows = dataTable.hashes() as unknown as MCQDataRow[];
    await this.quizPage.addQuestionsAndOptions(rows);
});

When('admin add the true false questions and options using the following data', { timeout: 120000 }, async function (this: CustomWorld, dataTable: DataTable) {
    const rows = dataTable.hashes() as unknown as MCQDataRow[];
    await this.quizPage.addTrueFalseQuestionsAndOptions(rows);
});

When('admin add the true false questions and options from excel file {string}', { timeout: 120000 }, async function (this: CustomWorld, fileName: string) {
    await this.quizPage.addTrueFalseQuestionsFromExcel(fileName);
});

When('admin add the questions and options from excel file {string}', { timeout: 120000 }, async function (this: CustomWorld, fileName: string) {
    await this.quizPage.addQuestionsFromExcel(fileName);
});

When('admin click the save questions', { timeout: 60000 }, async function (this: CustomWorld) {
    await this.quizPage.clickSaveQuestions();
});

Then('admin should see the pop message for the question added successfully', { timeout: 60000 }, async function (this: CustomWorld) {
    await this.quizPage.verifySuccessPopupMessage();
});



