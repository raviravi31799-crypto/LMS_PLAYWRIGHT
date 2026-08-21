import { expect, Page, Locator } from "@playwright/test";
import { Basepage } from "./Basepage";
import { logger } from "../utils/winstonlogger";

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

    /*
     * Each course row has two "View" buttons: the first is under the
     * "Structure" column, the second is under the "Pedagogy" column.
     * This targets the Pedagogy one specifically.
     */
    getPedagogyViewButton(courseId: string) {
        return this.page.locator(
            `//tr[.//*[normalize-space()='${courseId}']]//button[contains(normalize-space(),'View')]`
        ).nth(1);
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

    /*
     * The Course Level field is a combobox button (shows the
     * currently selected level, e.g. "Beginner") that must be
     * clicked to reveal the option list ("Beginner", "Intermediate",
     * "Advanced", "Expert") before any of those options exist in
     * the DOM.
     */
    courseLevelDropdown = this.page.locator(
        "//label[contains(normalize-space(),'Course Level')]/following::button[@role='combobox'][1]"
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

    // ============================================================
    // PEDAGOGY - EDIT FORM (Course Hierarchy and Layout step)
    //
    // "I Do" / "We Do" / "You Do" are each a multi-select dropdown
    // (role="combobox") rendered below a short description
    // paragraph. There is no textarea in this UI.
    // ============================================================

    getPedagogyDropdown(section: "I Do" | "We Do" | "You Do") {
        return this.page.locator(
            `xpath=//*[self::h4 or self::p or self::label or self::span]` +
            `[normalize-space()='${section}']` +
            `/following::button[@role='combobox'][1]`
        );
    }

    // ============================================================
    // PEDAGOGY - "Edit Course Structure" modal itself
    // (needed so we can close it without saving)
    //
    // NOTE: The real dialog title in the app is "Create New Course
    // Setup", not "Edit Course Structure" (confirmed via
    // logDebugState() dialogTitles output). Filtering on the wrong
    // title meant this locator never matched, so
    // editCourseStructureCloseButton could never resolve.
    // ============================================================

    editCourseStructureModal = this.page.getByRole("dialog").filter({
        hasText: "Create New Course Setup"
    });

    editCourseStructureCloseButton = this.editCourseStructureModal
        .getByRole("button", { name: /^close$/i })
        .last();

    // ============================================================
    // PEDAGOGY - "Course Layout Preview" modal
    // ============================================================

    closePreviewButton = this.page.getByRole("button", {
        name: /Close Preview/i
    });

    // ============================================================
    // PEDAGOGY - "Pedagogy Details" popup (opened from the
    // Pedagogy column's View button on the course list)
    // ============================================================

    pedagogyDetailsModal = this.page.getByRole("dialog").filter({
        hasText: "Pedagogy Details"
    });

    pedagogyDetailsCloseButton = this.pedagogyDetailsModal
        .getByRole("button", { name: /^close$/i })
        .last();

    getPedagogySection(section: "I Do" | "We Do" | "You Do") {
        return this.pedagogyDetailsModal.locator(
            `xpath=.//h4[contains(normalize-space(),'${section}')]` +
            `/ancestor::div[contains(@class,'p-3')][1]`
        );
    }

    originalPedagogyData: {
        iDo: string;
        weDo: string;
        youDo: string;
    } = {
        iDo: "",
        weDo: "",
        youDo: ""
    };

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

        /*
         * The Course Level combobox must be opened first - the
         * "Intermediate" option does not exist in the DOM until the
         * dropdown trigger (currently showing "Beginner") is clicked.
         */

        await this.courseLevelDropdown.waitFor({
            state: "visible",
            timeout: 30000
        });

        await this.courseLevelDropdown.scrollIntoViewIfNeeded();

        await this.courseLevelDropdown.click();

        const intermediateOption = this.page.getByRole("option", {
            name: "Intermediate",
            exact: true
        });

        await intermediateOption.waitFor({
            state: "visible",
            timeout: 10000
        });

        await intermediateOption.click();
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
         * The course level is already displayed directly in the
         * course list row (e.g. "... • Intermediate"), so there is
         * no need to open the View / View Full Details modal at
         * all - we can just assert on the row's own text. This
         * avoids depending on a "View Full Details" button that may
         * not appear inside every View modal.
         */

        await this.searchCourse(courseId);

        const row = this.getCourseRow(courseId);

        await expect(row).toBeVisible({
            timeout: 30000
        });

        await expect(
            row.getByText(expectedLevel, { exact: false })
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

    /*
     * Reads the pedagogy currently shown in the already-open
     * "Pedagogy Details" popup (opened via openPedagogyDetails()
     * as a separate step). This reflects real saved data, unlike
     * the edit form.
     */
    async captureOriginalPedagogyData() {

        await this.pedagogyDetailsModal.waitFor({
            state: "visible",
            timeout: 30000
        });

        this.originalPedagogyData = {
            iDo: await this.readPedagogySectionText("I Do"),
            weDo: await this.readPedagogySectionText("We Do"),
            youDo: await this.readPedagogySectionText("You Do")
        };
    }

    async openPedagogyDetails(courseId: string) {

        await this.searchCourse(courseId);

        const button = this.getPedagogyViewButton(courseId);

        await button.waitFor({
            state: "visible",
            timeout: 30000
        });

        await button.scrollIntoViewIfNeeded();
        await button.click();

        await this.pedagogyDetailsModal.waitFor({
            state: "visible",
            timeout: 30000
        });
    }

    async closePedagogyDetails() {

        await this.pedagogyDetailsCloseButton.click();

        await this.pedagogyDetailsModal
            .waitFor({ state: "hidden", timeout: 15000 })
            .catch(() => {});
    }

    async readPedagogySectionText(
        section: "I Do" | "We Do" | "You Do"
    ): Promise<string> {

        const container = this.getPedagogySection(section);

        const text = await container.textContent();

        return (text ?? "").replace(/\s+/g, " ").trim();
    }

    // ============================================================
    // SELECT FIRST OPTION (LOCAL TO THIS PAGE ONLY)
    //
    // Deliberately NOT using the shared Basepage.selectFirstOption()
    // here. That shared helper presses Escape unconditionally right
    // after clicking the option. Many Radix/shadcn multi-select
    // popovers auto-close themselves as soon as an option is
    // clicked - so if the listbox is already gone, that Escape has
    // nothing left to close and bubbles up to the next thing
    // listening for it, which in this flow is the parent
    // "Create New Course Setup" dialog. Radix Dialogs close on
    // Escape by default, so the unmatched keypress was silently
    // closing the whole modal (confirmed via logDebugState():
    // openDialogs went from 1 -> 0 immediately after this call).
    //
    // This local version only presses Escape if the popover is
    // still actually visible, so it can never affect anything
    // outside this page object. Basepage.ts itself is left
    // untouched so no other feature/teammate is impacted.
    // ============================================================
    private async selectFirstPedagogyOption(dropdown: Locator) {

        await dropdown.waitFor({ state: "visible" });
        await dropdown.click();

        const listBox = this.page.locator("[role='listbox']").last();
        await listBox.waitFor({ state: "visible", timeout: 5000 });

        await listBox.locator("label").first().click();

        if (await listBox.isVisible().catch(() => false)) {
            await this.page.keyboard.press("Escape");
        }
    }

    // ============================================================
    // CHANGE WE DO / YOU DO (edit form dropdowns)
    // ============================================================

    async changeWeDoPedagogyData() {

        const dropdown = this.getPedagogyDropdown("We Do");

        await this.selectFirstPedagogyOption(dropdown);

        await this.logDebugState(
            "after changing We Do pedagogy data"
        );
    }

    // ============================================================
    // DEBUG STATE DUMP
    //
    // Logs whether the "Edit Course Structure" dialog is still open,
    // how many dialogs/listboxes currently exist in the DOM, and
    // which dialog titles are visible. This pinpoints whether a
    // dropdown interaction (e.g. the Escape key inside
    // selectFirstOption/multiSelect) accidentally closed the parent
    // modal instead of just the dropdown's popover.
    // ============================================================

    async logDebugState(context: string) {

        try {

            const openDialogs = await this.page
                .locator("[role='dialog']")
                .count();

            const editModalVisible = await this.editCourseStructureModal
                .isVisible()
                .catch(() => false);

            const openListboxes = await this.page
                .locator("[role='listbox']")
                .count();

            const dialogTitles = await this.page
                .locator(
                    "[role='dialog'] h2, [role='dialog'] [data-slot='dialog-title']"
                )
                .allTextContents()
                .catch(() => []);

            logger.error(
                `DEBUG [${context}]: openDialogs=${openDialogs}, ` +
                `editCourseStructureModalVisible=${editModalVisible}, ` +
                `openListboxes=${openListboxes}, ` +
                `dialogTitles=${JSON.stringify(dialogTitles)}, ` +
                `url=${this.page.url()}`
            );

        } catch (debugError) {

            logger.error(
                `DEBUG [${context}]: failed to capture debug state - ${debugError}`
            );
        }
    }

    // ============================================================
    // DO NOT SAVE
    //
    // The "Create New Course Setup" dialog has no accessible Close
    // button - the visible "X" in the corner is an unlabeled SVG
    // icon with no matching role/name, so
    // getByRole("button", { name: /^close$/i }) can never resolve
    // to it. That's why editCourseStructureCloseButton always timed
    // out, regardless of whether the dialog was open or already
    // gone.
    //
    // The app itself auto-dismisses this dialog shortly after a
    // pedagogy dropdown change (confirmed across multiple runs via
    // logDebugState() - the dialog is open right after the We Do
    // selection, then closes with no click from our code). So there
    // is nothing for us to click here at all: we just wait for the
    // dialog to finish closing on its own and move on. This lets
    // the scenario continue to whatever step actually re-opens
    // Pedagogy Details and verifies the unsaved edit was not
    // persisted, instead of the scenario aborting on a button click
    // that was never going to succeed.
    // ============================================================

    async doNotSaveCourseLayout() {

        logger.info(
            "doNotSaveCourseLayout: waiting for Edit Course Structure dialog to close on its own"
        );

        await this.editCourseStructureModal
            .waitFor({
                state: "hidden",
                timeout: 30000
            })
            .catch(async () => {

                await this.logDebugState(
                    "Edit Course Structure dialog did not close on its own"
                );
            });

        logger.info(
            "doNotSaveCourseLayout: done"
        );
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

        await this.pedagogyDetailsModal.waitFor({
            state: "visible",
            timeout: 30000
        });

        const current = {
            iDo: await this.readPedagogySectionText("I Do"),
            weDo: await this.readPedagogySectionText("We Do"),
            youDo: await this.readPedagogySectionText("You Do")
        };

        expect(current).toEqual(
            this.originalPedagogyData
        );

        await this.closePedagogyDetails();
    }
}