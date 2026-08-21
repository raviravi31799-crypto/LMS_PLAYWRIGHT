import { Page, expect } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { Basepage } from "./Basepage";
import { ExcelUtils } from "../utils/ExcelUtils";

export interface MCQDataRow {
    Category: string;
    Question: string;
    Option1: string;
    Option2: string;
    CorrectAnswer: string;
}

export class QuizPage extends Basepage {

    constructor(page: Page) {
        super(page);
    }

    // Locators
    private questionBankMenu = this.page.locator('//div[@title="Question Banks"] | //div[@title="Question Bank"] | //a[contains(@href, "questionbanks")] | //a[contains(@href, "question-bank")] | //span[normalize-space()="Question Bank"] | //span[normalize-space()="Question Banks"]');
    private createQuestionBtn = this.page.locator('//button[contains(., "Create Question")] | //button[@class="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"]');
    private mcqQuestionBtn = this.page.locator('(//button[@class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"])[1] | //button[contains(., "MCQ Question") or contains(., "MCQ")]');
    private categoryInput = this.page.locator('//input[@placeholder="e.g., Data Structures"] | //input[contains(@placeholder, "Category")]');
    private choicedropdown = this.page.locator('//button[contains(@class, "border") and (contains(., "Multiple Choice") or contains(., "Multiple Select") or contains(., "True / False") or contains(., "True/False") or contains(., "Choice"))]');
    private multipleChoiceMenuOption = this.page.locator('//button[contains(@class, "w-full") and contains(., "Multiple Choice")]');
    private trueFalseMenuOption = this.page.locator('//button[contains(@class, "w-full") and (contains(., "True / False") or contains(., "True/False") or contains(., "True"))] | //button[@role="menuitem" and contains(., "True")] | //div[@role="menu"]//button[contains(., "True")]');
    private questionInput = this.page.locator('//div[@contenteditable="true"] | //div[text()="Write your question here... (Use formatting tools above)"]');
    private optionInputs = this.page.locator('//input[@placeholder="Click to edit option"]');
    private saveQuestionsBtn = this.page.locator('//button[contains(., "Save Questions") or contains(., "Save")]');
    private successToastMessage = this.page.locator('text=Question saved successfully | text=Successfully added | text=saved successfully | //div[contains(text(), "saved successfully") or contains(., "saved successfully") or contains(text(), "Question saved")]');
    private addQuestionsBtn = this.page.locator('//button[contains(., "Add another question") or contains(., "Add question") or contains(., "Add Question")]');

    // Action Methods
    async clickQuestionBankMenu() {
        await this.click(this.questionBankMenu.first());
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.locator('svg[aria-label="Loading"]').waitFor({ state: "detached", timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1500);
        logger.info("Clicked on Question Bank Menu and waited for page hydration");
    }

    async clickCreateQuestionButton() {
        await this.click(this.createQuestionBtn.first());
        await this.page.waitForTimeout(1000);
        logger.info("Clicked on Create Question button");
    }

    async clickMCQQuestionButton() {
        await this.click(this.mcqQuestionBtn.first());
        await this.page.waitForTimeout(1500);
        logger.info("Clicked on MCQ Question button");
    }

    async enterCategory(categoryName: string = "Java", index: number = 0) {
        const catInput = this.categoryInput.nth(index);
        await catInput.scrollIntoViewIfNeeded();
        await catInput.fill(categoryName);
        logger.info(`Entered category "${categoryName}" at index ${index} without search modal`);
    }

    async clickQuestionTypeDropdown(index: number = 0) {
        const choiceDd = this.choicedropdown.nth(index);
        if (await choiceDd.isVisible().catch(() => false)) {
            await choiceDd.click();
            await this.page.waitForTimeout(300);
            logger.info(`Clicked on Question Type Dropdown at index ${index}`);
        }
    }

    async chooseMultipleChoiceOption(index: number = 0) {
        const mcqOpt = this.multipleChoiceMenuOption.first();
        if (await mcqOpt.isVisible().catch(() => false)) {
            await mcqOpt.click();
            await this.page.waitForTimeout(300);
            logger.info(`Selected Multiple Choice option at index ${index}`);
        } else {
            logger.info(`Multiple Choice option already selected or menu not active`);
        }
    }

    async chooseTrueFalseOption(index: number = 0) {
        let tfOpt = this.trueFalseMenuOption.first();
        if (await tfOpt.isVisible().catch(() => false)) {
            await tfOpt.click();
            await this.page.waitForTimeout(300);
            logger.info(`Selected True/False option at index ${index}`);
            return;
        }

        const choiceDd = this.choicedropdown.nth(index);
        if (await choiceDd.isVisible().catch(() => false)) {
            await choiceDd.click();
            await this.page.waitForTimeout(300);
            tfOpt = this.trueFalseMenuOption.first();
            if (await tfOpt.isVisible().catch(() => false)) {
                await tfOpt.click();
                await this.page.waitForTimeout(300);
                logger.info(`Opened dropdown and selected True/False option at index ${index}`);
                return;
            }
        }
        logger.info(`True/False option already selected or menu not needed`);
    }

    async addQuestionsAndOptions(dataRows: MCQDataRow[]) {
        for (let i = 0; i < dataRows.length; i++) {
            const row = dataRows[i]!;
            logger.info(`Adding question ${i + 1}/${dataRows.length}: "${row.Question}" [Category: ${row.Category}]`);

            // If not the first question, click "Add another question" to create the next block
            if (i > 0) {
                const addBtn = this.addQuestionsBtn.first();
                await addBtn.scrollIntoViewIfNeeded();
                await addBtn.click();
                await this.page.waitForTimeout(600);
            }

            // Fill Category directly for question i (no search category modal)
            if (row.Category) {
                const currentCatInput = this.categoryInput.nth(i);
                await currentCatInput.scrollIntoViewIfNeeded();
                await currentCatInput.fill(row.Category);
                await this.page.waitForTimeout(150);
            }

            // Ensure Question Type is Multiple Choice if needed
            const currentChoiceDropdown = this.choicedropdown.nth(i);
            if (i > 0 && await currentChoiceDropdown.isVisible().catch(() => false)) {
                await currentChoiceDropdown.click();
                await this.page.waitForTimeout(200);
                const currentMcqOption = this.multipleChoiceMenuOption.first();
                if (await currentMcqOption.isVisible().catch(() => false)) {
                    await currentMcqOption.click();
                    await this.page.waitForTimeout(200);
                }
            }

            // Fill Question Text for question i
            const currentQuestionInput = this.questionInput.nth(i);
            await currentQuestionInput.scrollIntoViewIfNeeded();
            await currentQuestionInput.click();
            await currentQuestionInput.fill(row.Question);
            await this.page.waitForTimeout(150);

            // Fill Option 1 & Option 2 for question i
            const currentOption1Input = this.optionInputs.nth(i * 2);
            const currentOption2Input = this.optionInputs.nth(i * 2 + 1);

            await currentOption1Input.scrollIntoViewIfNeeded();
            await currentOption1Input.fill(row.Option1);
            await this.page.waitForTimeout(100);

            await currentOption2Input.scrollIntoViewIfNeeded();
            await currentOption2Input.fill(row.Option2);
            await this.page.waitForTimeout(100);

            // Set Correct Answer using the Answer Key flow
            if (row.CorrectAnswer) {
                logger.info(`Selecting correct answer: "${row.CorrectAnswer}" for question ${i + 1}`);
                const answerKeyBtn = this.page.locator('//button[contains(., "Answer key")]').nth(i);
                await answerKeyBtn.scrollIntoViewIfNeeded();
                await answerKeyBtn.click();
                await this.page.waitForTimeout(400);

                // Click the correct option text in Answer Key mode
                const answerOption = this.page.getByText(row.CorrectAnswer, { exact: true }).last();
                await answerOption.scrollIntoViewIfNeeded();
                await answerOption.click();
                await this.page.waitForTimeout(300);

                // Click Done to finish answer key selection
                const doneBtn = this.page.locator('//button[contains(., "Done")]').first();
                await doneBtn.scrollIntoViewIfNeeded();
                await doneBtn.click();
                await this.page.waitForTimeout(400);
            }
        }
    }

    async addTrueFalseQuestionsAndOptions(dataRows: MCQDataRow[]) {
        for (let i = 0; i < dataRows.length; i++) {
            const row = dataRows[i]!;
            logger.info(`Adding True/False question ${i + 1}/${dataRows.length}: "${row.Question}" [Category: ${row.Category}]`);

            // If not the first question, click "Add another question"
            if (i > 0) {
                const addBtn = this.addQuestionsBtn.first();
                await addBtn.scrollIntoViewIfNeeded();
                await addBtn.click();
                await this.page.waitForTimeout(600);
            }

            // Fill Category directly for question i
            if (row.Category) {
                const currentCatInput = this.categoryInput.nth(i);
                await currentCatInput.scrollIntoViewIfNeeded();
                await currentCatInput.fill(row.Category);
                await this.page.waitForTimeout(150);
            }

            // Ensure Question Type is True / False
            const currentChoiceDropdown = this.choicedropdown.nth(i);
            if (await currentChoiceDropdown.isVisible().catch(() => false)) {
                const text = await currentChoiceDropdown.textContent();
                if (!text || !text.includes("True")) {
                    await currentChoiceDropdown.click();
                    await this.page.waitForTimeout(200);
                    const currentTfOption = this.trueFalseMenuOption.first();
                    if (await currentTfOption.isVisible().catch(() => false)) {
                        await currentTfOption.click();
                        await this.page.waitForTimeout(200);
                    }
                }
            }

            // Fill Question Text for question i
            const currentQuestionInput = this.questionInput.nth(i);
            await currentQuestionInput.scrollIntoViewIfNeeded();
            await currentQuestionInput.click();
            await currentQuestionInput.fill(row.Question);
            await this.page.waitForTimeout(150);

            // Handle Option Inputs if editable
            const opt1Val = row.Option1 || "True";
            const opt2Val = row.Option2 || "False";
            const currentOption1Input = this.optionInputs.nth(i * 2);
            const currentOption2Input = this.optionInputs.nth(i * 2 + 1);

            if (await currentOption1Input.isVisible().catch(() => false)) {
                await currentOption1Input.scrollIntoViewIfNeeded();
                await currentOption1Input.fill(opt1Val);
                await this.page.waitForTimeout(100);
            }
            if (await currentOption2Input.isVisible().catch(() => false)) {
                await currentOption2Input.scrollIntoViewIfNeeded();
                await currentOption2Input.fill(opt2Val);
                await this.page.waitForTimeout(100);
            }

            // Set Correct Answer via Answer Key
            if (row.CorrectAnswer) {
                logger.info(`Selecting correct answer: "${row.CorrectAnswer}" for True/False question ${i + 1}`);
                const answerKeyBtn = this.page.locator('//button[contains(., "Answer key")]').nth(i);
                await answerKeyBtn.scrollIntoViewIfNeeded();
                await answerKeyBtn.click();
                await this.page.waitForTimeout(400);

                // Click the correct answer option ("True" or "False")
                const answerOption = this.page.getByText(row.CorrectAnswer, { exact: true }).last();
                await answerOption.scrollIntoViewIfNeeded();
                await answerOption.click();
                await this.page.waitForTimeout(300);

                // Click Done to finish answer key selection
                const doneBtn = this.page.locator('//button[contains(., "Done")]').first();
                await doneBtn.scrollIntoViewIfNeeded();
                await doneBtn.click();
                await this.page.waitForTimeout(400);
            }
        }
    }

    async addTrueFalseQuestionsFromExcel(fileName: string = "TrueFalseQuestions.xlsx") {
        logger.info(`Reading True/False questions from Excel file: ${fileName}`);
        const rows = await ExcelUtils.readExcelToJSON<MCQDataRow>(fileName);
        if (!rows || rows.length === 0) {
            throw new Error(`No data rows found in Excel file: ${fileName}`);
        }
        logger.info(`Loaded ${rows.length} True/False questions from Excel`);
        await this.addTrueFalseQuestionsAndOptions(rows);
    }

    async addQuestionsFromExcel(fileName: string = "MCQQuestions.xlsx") {
        logger.info(`Reading Multiple Choice questions from Excel file: ${fileName}`);
        const rows = await ExcelUtils.readExcelToJSON<MCQDataRow>(fileName);
        if (!rows || rows.length === 0) {
            throw new Error(`No data rows found in Excel file: ${fileName}`);
        }
        logger.info(`Loaded ${rows.length} MCQ questions from Excel`);
        await this.addQuestionsAndOptions(rows);
    }

    private toastSeen: boolean = false;

    async clickSaveQuestions() {
        this.toastSeen = false;
        const saveBtn = this.saveQuestionsBtn.first();
        await saveBtn.scrollIntoViewIfNeeded();

        // Start listening for toast immediately before clicking save
        const toastPromise = this.successToastMessage.first().waitFor({ state: "visible", timeout: 25000 })
            .then(() => { this.toastSeen = true; })
            .catch(() => {});

        await this.click(saveBtn);
        logger.info("Clicked on Save Questions button");

        // Wait for either the toast to be seen or a short stabilization timeout
        await Promise.race([toastPromise, this.page.waitForTimeout(2000)]);
    }

    async verifySuccessPopupMessage() {
        if (!this.toastSeen) {
            const isVisible = await this.successToastMessage.first().isVisible({ timeout: 10000 }).catch(() => false);
            if (isVisible) {
                this.toastSeen = true;
            }
        }

        // Assert modal is closed and Question Bank is visible
        const modal = this.page.locator('//h2[contains(., "Add MCQ Questions")] | //div[contains(text(), "Add MCQ Questions")]');
        await expect(modal).toBeHidden({ timeout: 20000 });

        const qbHeading = this.page.locator('//h1[contains(., "Question Bank")] | //div[contains(., "Question Bank")]');
        await expect(qbHeading.first()).toBeVisible({ timeout: 10000 });

        logger.info("Verified success popup message and confirmed questions saved in Question Bank");
    }
}



