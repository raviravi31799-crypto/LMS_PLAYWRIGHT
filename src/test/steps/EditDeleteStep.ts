import {
    Given,
    Then,
    When
} from "@cucumber/cucumber";

import { CustomWorld } from "../world/world";
import { expect } from "@playwright/test";
import { logger } from "../utils/winstonlogger";

// ============================================================
// HELPER: EXTRACT COURSEID FROM A DATATABLE
//
// Supports both table styles used across this feature:
//
//   | CourseID      |          <- with header, via hashes()
//   | PT-BTI-PT-003 |
//
//   | PT-BTI-PT-003 |          <- header-less, single row
//
// hashes() requires a header row to treat any row as data, so a
// header-less table returns an empty array from hashes(). In that
// case we fall back to raw() and read the first cell directly.
// ============================================================

function extractCourseId(dataTable: any): string | undefined {

    if (!dataTable) {
        return undefined;
    }

    if (typeof dataTable.hashes === "function") {
        const hashes = dataTable.hashes();

        if (hashes && hashes.length && hashes[0].CourseID) {
            return hashes[0].CourseID;
        }
    }

    if (typeof dataTable.raw === "function") {
        const rows = dataTable.raw();

        for (const row of rows) {
            const cell = row?.[0]?.trim();

            if (cell && cell.toLowerCase() !== "courseid") {
                return cell;
            }
        }
    }

    return undefined;
}

// ============================================================
// LOGIN
// ============================================================

Given(
    "the Admin is logged into the application successfully",
    { timeout: 90000 },
    async function (this: CustomWorld) {

        logger.info("Logging in as Admin");

        await this.page.waitForTimeout(2000);

        await this.loginpage.login();

        logger.info("Admin login successful");
    }
);

// ============================================================
// COURSE MANAGEMENT
// ============================================================

Given(
    "the user navigates to the Course Management",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Navigating to Course Management"
        );

        await this.editdeletepage.navigatecoursemodule();

        logger.info(
            "Course Management opened successfully"
        );
    }
);

// ============================================================
// THREE DOT
// ============================================================

When(
    "Admin clicks the three dot menu for a course",
    { timeout: 60000 },
    async function (
        this: CustomWorld,
        dataTable
    ) {

        const courseId = extractCourseId(dataTable);

        if (!courseId) {
            throw new Error(
                "CourseID is required for three dot menu."
            );
        }

        this.courseId = courseId;

        logger.info(
            `Clicking three dot menu for course: ${this.courseId}`
        );

        await this.editdeletepage.clickThreeDot(
            this.courseId
        );
    }
);

// ============================================================
// EDIT COURSE
// ============================================================

When(
    "Admin selects Edit Course option",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Selecting Edit Course option"
        );

        await this.editdeletepage.clickEditCourse();
    }
);

// ============================================================
// BASIC CONFIGURATION
// ============================================================

When(
    "Admin edits the course basic configuration",
    { timeout: 60000 },
    async function (
        this: CustomWorld,
        dataTable
    ) {

        const data = dataTable?.hashes();

        if (!data || !data.length) {
            throw new Error(
                "Course configuration data is required."
            );
        }

        const client =
            data[0].Client;

        const serviceType =
            data[0].ServiceType;

        const serviceModel =
            data[0].ServiceModel;

        const category =
            data[0].Category;

        const courseName =
            data[0].CourseName;

        logger.info(`
Editing course basic configuration:
Client=${client},
ServiceType=${serviceType},
ServiceModel=${serviceModel},
Category=${category},
CourseName=${courseName}
        `);

        await this.editdeletepage.editBasicConfiguration(
            client,
            serviceType,
            serviceModel,
            category,
            courseName
        );

        logger.info(
            "Course basic configuration edited successfully"
        );
    }
);

// ============================================================
// NEXT BUTTON
// ============================================================

When(
    /^Admin clicks (?:the )?Next button$/,
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Clicking Next button"
        );

        await this.editdeletepage.clickNextButton();

        logger.info(
            "Next button clicked successfully"
        );
    }
);

// ============================================================
// COURSE HIERARCHY
// ============================================================

When(
    "Admin edits the course hierarchy by selecting a Sub Module, Topic, and Sub Topic",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Editing course hierarchy: Sub Module, Topic, Sub Topic"
        );

        await this.editdeletepage.editCourseHierarchy();

        logger.info(
            "Course hierarchy edited successfully"
        );
    }
);

// ============================================================
// PREVIEW & UPDATE
// ============================================================

When(
    "Admin clicks the Preview & Update button",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Clicking Preview & Update button"
        );

        await this.editdeletepage.clickPreviewUpdate();
    }
);

// ============================================================
// SAVE COURSE LAYOUT
// ============================================================

When(
    "Admin clicks the Save Course Layout button",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Clicking Save Course Layout button"
        );

        await this.editdeletepage.clickSaveCourseLayout();
    }
);

// ============================================================
// SUCCESS MESSAGE
// ============================================================

Then(
    "A success message should be displayed",
    { timeout: 30000 },
    async function (this: CustomWorld) {

        await this.editdeletepage.verifySuccessMessage();

        logger.info(
            "Success message verified"
        );
    }
);

// ============================================================
// LATER
// ============================================================

Then(
    "Admin clicks the Later button",
    { timeout: 30000 },
    async function (this: CustomWorld) {

        logger.info(
            "Clicking Later button"
        );

        await this.editdeletepage.clickLater();
    }
);

// ============================================================
// VIEW BUTTON - WITHOUT DATA TABLE
// "Admin clicks the View button"
// "Admin clicks View button"
// ============================================================

When(
    /^Admin clicks (?:the )?View button$/,
    { timeout: 60000 },
    async function (this: CustomWorld) {

        if (!this.courseId) {
            throw new Error(
                "CourseID must be set before clicking View button. " +
                "Ensure a course has been selected in a previous step."
            );
        }

        logger.info(
            `Clicking View button for course: ${this.courseId}`
        );

        await this.editdeletepage.clickView(
            this.courseId
        );
    }
);

// ============================================================
// VIEW BUTTON - WITH DATA TABLE
// "Admin clicks View button for the course"
// "Admin clicks View button for course"
// ============================================================

When(
    /^Admin clicks (?:the )?View button (?:for (?:the )?course)?$/,
    { timeout: 60000 },
    async function (
        this: CustomWorld,
        dataTable
    ) {

        const courseId = extractCourseId(dataTable);

        if (courseId) {
            this.courseId = courseId;
        }

        if (!this.courseId) {
            throw new Error(
                "CourseID is required when clicking the View button."
            );
        }

        logger.info(
            `Clicking View button for course: ${this.courseId}`
        );

        await this.editdeletepage.clickView(
            this.courseId
        );
    }
);

// ============================================================
// OLD COURSE LEVEL VERIFICATION
// ============================================================

Then(
    "The selected Sub Module, Topic, and Sub Topic should be displayed",
    { timeout: 30000 },
    async function (this: CustomWorld) {

        const expected = ["Module",
            "Sub Module",
            "Topic",
            "Sub Topic"
        ];

        const actual =
            await this.editdeletepage.getDisplayedCourseLevels();

        logger.info(
            `Displayed course levels: ${actual.join(", ")}`
        );

        await expect(actual).toEqual(expected);
    }
);

// ============================================================
// VIEW FULL DETAILS
// ============================================================

When(
    "Admin selects View Full Details option",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Selecting View Full Details option"
        );

        await this.editdeletepage.selectViewFullDetails();

        logger.info(
            "View Full Details option selected"
        );
    }
);

// ============================================================
// SCROLL AND EDIT COURSE
// ============================================================

When(
    "Admin scrolls down and clicks Edit Course button",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Scrolling down and clicking Edit Course button"
        );

        await this.editdeletepage.scrollDownAndClickEditCourse();

        logger.info(
            "Edit Course button clicked successfully"
        );
    }
);

// ============================================================
// INTERMEDIATE LEVEL
// ============================================================

When(
    "Admin selects the Intermediate course level",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Selecting Intermediate course level"
        );

        await this.editdeletepage.selectIntermediateCourseLevel();

        logger.info(
            "Intermediate course level selected"
        );
    }
);

// ============================================================
// WAIT FOR COURSE LEVEL UPDATE
// ============================================================

Then(
    "Admin waits for the course level update",
    { timeout: 150000 },
    async function (this: CustomWorld) {

        logger.info(
            "Waiting for course level update"
        );

        await this.editdeletepage.waitForCourseLevelUpdate();

        logger.info(
            "Course level update wait completed"
        );
    }
);

// ============================================================
// VERIFY COURSE LEVEL
// ============================================================

Then(
    "Admin verifies the course level is displayed as {string}",
    { timeout: 60000 },
    async function (
        this: CustomWorld,
        expectedLevel: string,
        dataTable
    ) {

        const courseId = extractCourseId(dataTable);

        if (!courseId) {
            throw new Error(
                "CourseID is required for course level verification."
            );
        }

        logger.info(
            `Verifying course level "${expectedLevel}" for ${courseId}`
        );

        await this.editdeletepage.verifyCourseLevel(
            courseId,
            expectedLevel
        );

        logger.info(
            `Course level "${expectedLevel}" verified successfully`
        );
    }
);

// ============================================================
// DELETE COURSE
// ============================================================

When(
    "Admin selects Delete Course option",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Selecting Delete Course option"
        );

        await this.editdeletepage.clickDeleteCourse();
    }
);

// ============================================================
// CONFIRM DELETE
// ============================================================

When(
    "Admin confirms the course deletion",
    { timeout: 90000 },
    async function (this: CustomWorld) {

        logger.info(
            "Confirming course deletion"
        );

        await this.editdeletepage.confirmDeleteCourse();

        logger.info(
            "Course deletion confirmed successfully"
        );
    }
);

// ============================================================
// VERIFY DELETED COURSE
// ============================================================

Then(
    "The deleted course should not be displayed in the course list",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            `Searching for deleted course: ${this.courseId}`
        );

        await this.editdeletepage.verifyCourseNotListed(
            this.courseId
        );

        logger.info(
            "Verified deleted course is not listed"
        );
    }
);

// ============================================================
// CANCEL DELETE
// ============================================================

When(
    "Admin cancels the course deletion",
    { timeout: 30000 },
    async function (this: CustomWorld) {

        logger.info(
            "Cancelling course deletion"
        );

        await this.editdeletepage.cancelDeleteCourse();

        logger.info(
            "Course deletion cancelled successfully"
        );
    }
);

// ============================================================
// VERIFY COURSE STILL EXISTS
// ============================================================

Then(
    "The course should still be displayed in the course list",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            `Searching for course: ${this.courseId}`
        );

        await this.editdeletepage.verifyCourseStillListed(
            this.courseId
        );

        logger.info(
            `Verified course is still listed: ${this.courseId}`
        );
    }
);

// ============================================================
// VIEW BUTTON - PEDAGOGY COLUMN
// ============================================================

When(
    "Admin clicks the View button under the Pedagogy column for course",
    { timeout: 60000 },
    async function (
        this: CustomWorld,
        dataTable
    ) {

        const courseId = extractCourseId(dataTable);

        if (!courseId) {
            throw new Error(
                "CourseID is required when clicking the Pedagogy View button."
            );
        }

        this.courseId = courseId;

        logger.info(
            `Opening Pedagogy Details for course: ${this.courseId}`
        );

        await this.editdeletepage.openPedagogyDetails(
            this.courseId
        );
    }
);

// ============================================================
// CLOSE PEDAGOGY DETAILS POPUP
// ============================================================

When(
    "Admin closes the Pedagogy Details popup",
    { timeout: 30000 },
    async function (this: CustomWorld) {

        logger.info(
            "Closing Pedagogy Details popup"
        );

        await this.editdeletepage.closePedagogyDetails();
    }
);

// ============================================================
// CAPTURE ORIGINAL PEDAGOGY DATA
// ============================================================

Then(
    "Admin captures the original pedagogy data",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Capturing original pedagogy data"
        );

        await this.editdeletepage.captureOriginalPedagogyData();

        logger.info(
            "Original pedagogy data captured"
        );
    }
);

// ============================================================
// CHANGE WE DO
// ============================================================

When(
    "Admin changes the We Do pedagogy data",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Changing the We Do pedagogy data"
        );

        await this.editdeletepage.changeWeDoPedagogyData();

        logger.info(
            "We Do pedagogy data changed"
        );
    }
);

// ============================================================
// DO NOT SAVE
// ============================================================

When(
    "Admin does not save the course layout",
    { timeout: 100000 },
    async function (this: CustomWorld) {

        logger.info(
            "Course layout will not be saved"
        );

        await this.editdeletepage.doNotSaveCourseLayout();
    }
);

// ============================================================
// CANCEL COURSE EDIT
// ============================================================

When(
    "Admin cancels the course edit",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Cancelling course edit"
        );

        await this.editdeletepage.cancelCourseEdit();

        logger.info(
            "Course edit cancelled successfully"
        );
    }
);

// ============================================================
// VERIFY ORIGINAL PEDAGOGY DATA
// ============================================================

Then(
    "the original pedagogy data should be displayed",
    { timeout: 60000 },
    async function (this: CustomWorld) {

        logger.info(
            "Verifying original pedagogy data"
        );

        await this.editdeletepage.verifyOriginalPedagogyData();

        logger.info(
            "Original pedagogy data verified successfully"
        );
    }
);