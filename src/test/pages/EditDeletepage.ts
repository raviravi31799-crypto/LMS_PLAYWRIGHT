import { expect, Page } from "@playwright/test";
import { Basepage } from "./Basepage";

export class EditDeletepage extends Basepage {

    constructor(page: Page) {
        super(page);
    }

    // ============================================================
    // COURSE MANAGEMENT
    // ============================================================

    cousemodule = this.page.locator(
        "//div[@title='Course Management']//div[@class='p-1.5']//*[name()='svg']"
    );

    searchInput = this.page.locator(
        "//input[@placeholder='Search courses, codes, clients, or categories...']"
    );

    // ============================================================
    // EDIT COURSE
    // ============================================================

    editCourse = this.page.getByRole("button", {
        name: "Edit Course",
        exact: true
    });

    nextButton = this.page.getByRole("button", {
        name: "Next",
        exact: true
    });

    previewUpdateButton = this.page.getByRole("button", {
        name: /Preview.*Update/i
    });

    saveCourseLayoutButton = this.page.getByRole("button", {
        name: /Save Course Layout/i
    });

    successMessage = this.page.locator(
        ".Toastify__progress-bar--wrp"
    );

    laterButton = this.page.getByRole("button", {
        name: "Later",
        exact: true
    });

    // ============================================================
    // BASIC COURSE CONFIGURATION
    // Same locator strategy as CoursePage
    // ============================================================

    private courseClient = this.page.locator(
        "//label[contains(normalize-space(),'Course Client')]/following::button[1]"
    );

    private serviceType = this.page.locator(
        "//label[contains(normalize-space(),'Service Type')]/following::button[1]"
    );

    private serviceModel = this.page.locator(
        "//label[contains(normalize-space(),'Service Model')]/following::button[1]"
    );

    private category = this.page.locator(
        "//label[contains(normalize-space(),'Course Category')]/following::button[1]"
    );

    private courseName = this.page.locator(
        "//label[contains(normalize-space(),'Course Name')]/following::button[1]"
    );

    // ============================================================
    // COURSE HIERARCHY
    // ============================================================

    courseList = this.page.locator(
        "//h4[normalize-space()='Course Levels']/parent::div/following-sibling::div//span"
    );

    subModuleCheckbox = this.page.locator(
        "label[for='submodule-checkbox']:visible"
    );

    topicCheckbox = this.page.locator(
        "//input[@id='topic-checkbox']"
    );

    subTopicCheckbox = this.page.locator(
        "//input[@id='subtopic-checkbox']"
    );

    loadingSpinner = this.page.locator(
        "//div[contains(text(),'Loading course data')]"
    );

    modalLoadingOverlay = this.page.locator(
        "//div[@role='dialog']//div[contains(@class,'flex-1') and contains(@class,'items-center') and contains(@class,'justify-center')]"
    );

    // ============================================================
    // VIEW COURSE
    // ============================================================

    getViewButton(courseId: string) {
        return this.page.locator(
            `//tr[.//*[normalize-space()='${courseId}']]//button[contains(normalize-space(),'View')]`
        ).first();
    }

    // ============================================================
    // VIEW FULL DETAILS
    // ============================================================

    viewFullDetailsButton = this.page.getByRole("button", {
        name: /View Full Details/i
    }).last();

    // ============================================================
    // VIEW DETAILS -> EDIT COURSE
    // ============================================================

    editCourseFromDetailsButton = this.page.getByRole("button", {
        name: "Edit Course",
        exact: true
    }).last();

    // ============================================================
    // COURSE LEVEL
    // ============================================================

    intermediateLevel = this.page.getByText(
        "Intermediate",
        { exact: true }
    );

    // ============================================================
    // DELETE COURSE
    // ============================================================

    deleteCourseOption = this.page.locator(
        "//button[normalize-space()='Delete Course' and not(ancestor::div[@role='dialog'])]"
    );

    confirmDeleteButton = this.page.locator(
        "//div[@role='dialog']//button[normalize-space()='Delete Course']"
    );

    cancelDeleteButton = this.page.locator(
        "//div[@role='dialog']//button[normalize-space()='Cancel']"
    );

    // ============================================================
    // PEDAGOGY
    // ============================================================

    /*
     * These locators intentionally use labels/text instead of
     * generated CSS classes.
     *
     * If your application uses a textarea/input immediately
     * following We Do / You Do labels, these will work.
     */

    weDoField = this.page.locator(
        "//label[contains(normalize-space(),'We Do')]/following::textarea[1]"
    );

    youDoField = this.page.locator(
        "//label[contains(normalize-space(),'You Do')]/following::textarea[1]"
    );

    // Fallback fields if the application does not render labels
    pedagogyTextareas = this.page.locator(
        "textarea"
    );

    originalWeDoData = "";
    originalYouDoData = "";

    // ============================================================
    // NAVIGATE TO COURSE MANAGEMENT
    // ============================================================

    async navigatecoursemodule() {

        await this.cousemodule.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.click(this.cousemodule);

        await this.page.waitForTimeout(2000);
    }

    // ============================================================
    // SEARCH COURSE
    // ============================================================

    async searchCourse(courseId: string) {

        await this.searchInput.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.searchInput.fill("");

        await this.page.waitForTimeout(500);

        await this.searchInput.fill(courseId);

        await this.page.waitForTimeout(2000);
    }

    // ============================================================
    // GET COURSE ROW
    // ============================================================

    getCourseRow(courseId: string) {

        return this.page.locator(
            `//tr[.//*[normalize-space()='${courseId}']]`
        ).first();
    }

    // ============================================================
    // THREE DOT MENU
    // ============================================================

    async clickThreeDot(courseId: string) {

        /*
         * IMPORTANT:
         * Search first so pagination does not cause
         * "locator resolved to 0 elements".
         */

        await this.searchCourse(courseId);

        const row = this.getCourseRow(courseId);

        await expect(row).toBeVisible({
            timeout: 30000
        });

        const buttons = row.locator("button");

        const buttonCount = await buttons.count();

        if (buttonCount === 0) {
            throw new Error(
                `No action button found for course: ${courseId}`
            );
        }

        const menuButton = buttons.last();

        await menuButton.scrollIntoViewIfNeeded();

        await menuButton.click();
    }

    // ============================================================
    // EDIT COURSE
    // ============================================================

    async clickEditCourse() {

        await this.editCourse.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.editCourse.click();
    }

    // ============================================================
    // BASIC CONFIGURATION
    // ============================================================

    async editBasicConfiguration(
        client: string,
        serviceType: string,
        serviceModel: string,
        category: string,
        courseName: string
    ) {

        if (client?.trim()) {
            await this.select(
                this.courseClient,
                client.trim()
            );
        }

        if (serviceType?.trim()) {
            await this.select(
                this.serviceType,
                serviceType.trim()
            );
        }

        if (serviceModel?.trim()) {
            await this.select(
                this.serviceModel,
                serviceModel.trim()
            );
        }

        if (category?.trim()) {
            await this.select(
                this.category,
                category.trim()
            );
        }

        if (courseName?.trim()) {
            await this.select(
                this.courseName,
                courseName.trim()
            );
        }
    }

    // ============================================================
    // NEXT BUTTON
    // ============================================================

    async clickNextButton() {

        await this.nextButton.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.modalLoadingOverlay
            .waitFor({
                state: "hidden",
                timeout: 30000
            })
            .catch(() => {});

        await this.nextButton.click();
    }

    // ============================================================
    // EDIT COURSE HIERARCHY
    // ============================================================

    async editCourseHierarchy() {

        await this.loadingSpinner
            .waitFor({
                state: "hidden",
                timeout: 30000
            })
            .catch(() => {});

        await this.checkbox(
            this.subModuleCheckbox
        );

        await this.checkbox(
            this.topicCheckbox
        );

        await this.checkbox(
            this.subTopicCheckbox
        );
    }

    // ============================================================
    // PREVIEW & UPDATE
    // ============================================================

    async clickPreviewUpdate() {

        await this.previewUpdateButton.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.previewUpdateButton.click();
    }

    // ============================================================
    // SAVE COURSE LAYOUT
    // ============================================================

    async clickSaveCourseLayout() {

        await this.saveCourseLayoutButton.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.saveCourseLayoutButton.click();
    }

    // ============================================================
    // SUCCESS MESSAGE
    // ============================================================

    async verifySuccessMessage() {

        await expect(
            this.successMessage
        ).toBeVisible({
            timeout: 30000
        });
    }

    // ============================================================
    // LATER
    // ============================================================

    async clickLater() {

        await this.laterButton.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.laterButton.click();
    }

    // ============================================================
    // VIEW COURSE
    // ============================================================

    async clickView(courseId: string) {

        await this.searchCourse(courseId);

        const button = this.getViewButton(courseId);

        await button.waitFor({
            state: "visible",
            timeout: 30000
        });

        await button.scrollIntoViewIfNeeded();

        await button.click();
    }

    // ============================================================
    // GET DISPLAYED COURSE LEVELS
    // ============================================================

    async getDisplayedCourseLevels(): Promise<string[]> {

        await this.courseList.first().waitFor({
            state: "visible",
            timeout: 30000
        });

        return await this.getAllTextContents(
            this.courseList
        );
    }

    // ============================================================
    // VIEW FULL DETAILS
    // ============================================================

    async selectViewFullDetails() {

        /*
         * Do not restrict this to div[@role='dialog'].
         *
         * Your previous implementation failed here because
         * View Full Details is not necessarily inside the last
         * role=dialog element.
         */

        const button = this.viewFullDetailsButton;

        await button.waitFor({
            state: "visible",
            timeout: 30000
        });

        await button.scrollIntoViewIfNeeded();

        await button.click();

        await this.page.waitForTimeout(1500);
    }

    // ============================================================
    // SCROLL DOWN AND CLICK EDIT COURSE
    // ============================================================

    async scrollDownAndClickEditCourse() {

        /*
         * First scroll the complete page.
         */
        await this.page.mouse.wheel(0, 1500);

        await this.page.waitForTimeout(1000);

        /*
         * Locate the visible Edit Course button.
         */
        const buttons = this.page.getByRole("button", {
            name: "Edit Course",
            exact: true
        });

        const count = await buttons.count();

        if (count === 0) {
            throw new Error(
                "Edit Course button was not found in View Full Details page."
            );
        }

        const button = buttons.last();

        await button.scrollIntoViewIfNeeded();

        await expect(button).toBeVisible({
            timeout: 30000
        });

        await button.click();

        await this.page.waitForTimeout(1000);
    }

    // ============================================================
    // SELECT INTERMEDIATE LEVEL
    // ============================================================

    async selectIntermediateCourseLevel() {

        /*
         * Wait for course setup/edit page.
         */

        await this.page.waitForTimeout(1000);

        const intermediate = this.page.getByText(
            "Intermediate",
            { exact: true }
        ).last();

        await intermediate.waitFor({
            state: "visible",
            timeout: 30000
        });

        await intermediate.scrollIntoViewIfNeeded();

        await intermediate.click();
    }

    // ============================================================
    // WAIT FOR COURSE LEVEL UPDATE
    // ============================================================

    async waitForCourseLevelUpdate() {

        /*
         * The application needs some time after
         * Save Course Layout before the updated data
         * is available in Course Management.
         */

        await this.page.waitForTimeout(5000);

        await this.page.reload({
            waitUntil: "domcontentloaded",
            timeout: 60000
        }).catch(() => {});

        await this.page.waitForTimeout(5000);
    }

    // ============================================================
    // VERIFY COURSE LEVEL
    // ============================================================

    async verifyCourseLevel(
        courseId: string,
        expectedLevel: string
    ) {

        /*
         * Go back to Course Management if necessary.
         */
        await this.searchCourse(courseId);

        const row = this.getCourseRow(courseId);

        await expect(row).toBeVisible({
            timeout: 30000
        });

        const viewButton = this.getViewButton(courseId);

        await viewButton.waitFor({
            state: "visible",
            timeout: 30000
        });

        await viewButton.click();

        await this.page.waitForTimeout(1000);

        /*
         * Open View Full Details.
         */
        const fullDetails = this.viewFullDetailsButton;

        await fullDetails.waitFor({
            state: "visible",
            timeout: 30000
        });

        await fullDetails.click();

        await this.page.waitForTimeout(1500);

        /*
         * Verify Intermediate.
         */
        await expect(
            this.page.getByText(
                expectedLevel,
                { exact: true }
            ).last()
        ).toBeVisible({
            timeout: 30000
        });
    }

    // ============================================================
    // DELETE COURSE
    // ============================================================

    async clickDeleteCourse() {

        await this.deleteCourseOption.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.deleteCourseOption.click();

        await this.confirmDeleteButton.waitFor({
            state: "visible",
            timeout: 30000
        });
    }

    // ============================================================
    // CONFIRM DELETE
    // ============================================================

    async confirmDeleteCourse() {

        await this.confirmDeleteButton.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.confirmDeleteButton.click();

        await this.confirmDeleteButton.waitFor({
            state: "hidden",
            timeout: 30000
        });

        /*
         * Backend deletion takes some time.
         */
        await this.page.waitForTimeout(5000);

        await this.page.reload({
            waitUntil: "domcontentloaded",
            timeout: 60000
        }).catch(() => {});

        await this.page.waitForTimeout(4000);
    }

    // ============================================================
    // CANCEL DELETE
    // ============================================================

    async cancelDeleteCourse() {

        await this.cancelDeleteButton.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.cancelDeleteButton.click();

        await this.cancelDeleteButton.waitFor({
            state: "hidden",
            timeout: 10000
        });
    }

    // ============================================================
    // VERIFY COURSE DELETED
    // ============================================================

    async verifyCourseNotListed(
        courseId: string
    ) {

        await this.searchCourse(courseId);

        await expect(
            this.getCourseRow(courseId)
        ).toHaveCount(
            0,
            {
                timeout: 30000
            }
        );
    }

    // ============================================================
    // VERIFY COURSE STILL EXISTS
    // ============================================================

    async verifyCourseStillListed(
        courseId: string
    ) {

        await this.searchCourse(courseId);

        await expect(
            this.getCourseRow(courseId)
        ).toHaveCount(
            1,
            {
                timeout: 30000
            }
        );
    }

    // ============================================================
    // PEDAGOGY
    // ============================================================

    async captureOriginalPedagogyData() {

        await this.page.waitForTimeout(1000);

        const textareas = this.pedagogyTextareas;

        const count = await textareas.count();

        if (count >= 2) {

            this.originalWeDoData =
                await textareas.nth(0).inputValue();

            this.originalYouDoData =
                await textareas.nth(1).inputValue();

        } else {

            this.originalWeDoData =
                await this.weDoField.inputValue().catch(() => "");

            this.originalYouDoData =
                await this.youDoField.inputValue().catch(() => "");
        }
    }

    // ============================================================
    // CHANGE WE DO
    // ============================================================

    async changeWeDoPedagogyData() {

        const field = this.weDoField;

        if (await field.count() > 0) {

            await field.fill(
                `${this.originalWeDoData} - Temporary Change`
            );

            return;
        }

        const textareas =
            this.pedagogyTextareas;

        if (await textareas.count() >= 1) {

            await textareas.nth(0).fill(
                `${this.originalWeDoData} - Temporary Change`
            );
        }
    }

    // ============================================================
    // CHANGE YOU DO
    // ============================================================

    async changeYouDoPedagogyData() {

        const field = this.youDoField;

        if (await field.count() > 0) {

            await field.fill(
                `${this.originalYouDoData} - Temporary Change`
            );

            return;
        }

        const textareas =
            this.pedagogyTextareas;

        if (await textareas.count() >= 2) {

            await textareas.nth(1).fill(
                `${this.originalYouDoData} - Temporary Change`
            );
        }
    }

    // ============================================================
    // DO NOT SAVE
    // ============================================================

    async doNotSaveCourseLayout() {

        /*
         * Intentionally do nothing.
         *
         * This step exists to make the negative scenario explicit.
         */
        await this.page.waitForTimeout(500);
    }

    // ============================================================
    // CANCEL COURSE EDIT
    // ============================================================

    async cancelCourseEdit() {

        /*
         * Try Cancel first.
         */
        const cancelButton = this.page.getByRole(
            "button",
            {
                name: "Cancel",
                exact: true
            }
        ).last();

        if (await cancelButton.count() > 0) {

            if (await cancelButton.isVisible().catch(() => false)) {

                await cancelButton.click();

                await this.page.waitForTimeout(1000);

                return;
            }
        }

        /*
         * If application uses Later instead of Cancel.
         */
        if (
            await this.laterButton
                .isVisible()
                .catch(() => false)
        ) {

            await this.laterButton.click();

            await this.page.waitForTimeout(1000);
        }
    }

    // ============================================================
    // VERIFY ORIGINAL PEDAGOGY DATA
    // ============================================================

    async verifyOriginalPedagogyData() {

        const textareas =
            this.pedagogyTextareas;

        const count = await textareas.count();

        if (count >= 2) {

            const actualWeDo =
                await textareas.nth(0).inputValue();

            const actualYouDo =
                await textareas.nth(1).inputValue();

            expect(actualWeDo).toBe(
                this.originalWeDoData
            );

            expect(actualYouDo).toBe(
                this.originalYouDoData
            );

            return;
        }

        const actualWeDo =
            await this.weDoField.inputValue();

        const actualYouDo =
            await this.youDoField.inputValue();

        expect(actualWeDo).toBe(
            this.originalWeDoData
        );

        expect(actualYouDo).toBe(
            this.originalYouDoData
        );
    }
}