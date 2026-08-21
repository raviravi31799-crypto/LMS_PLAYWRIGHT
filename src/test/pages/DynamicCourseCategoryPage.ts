import { expect, Page } from "@playwright/test";
import { Basepage } from "./Basepage";

export class DynamicCourseCategoryPage extends Basepage {

    constructor(page: Page) {
        super(page);
    }

    // -----------------------------
    // Navigation
    // -----------------------------

    dynamicFieldSettingsIcon = this.page.locator(
        "//div[contains(@class,'p-1.5')]"
    ).nth(3);

    courseCategoryTab = this.page.locator(
        "//*[normalize-space()='Course Category']"
    );


    // -----------------------------
    // Add Category
    // -----------------------------

    addCategoryButton = this.page.locator(
        "//button[contains(.,'Add Category')]"
    );

    categoryNameInput = this.page.locator(
        "//input[@placeholder='Enter category name']"
    );

    courseNamesInput = this.page.locator(
        "//input[@placeholder='Type course name and press Enter...']"
    );

    categoryDescriptionTextarea = this.page.locator(
        "//textarea[@placeholder='Enter category description']"
    );

    createCategoryButton = this.page.locator(
        "//button[normalize-space()='Create Category']"
    );

    closeButton = this.page.locator(
        "//button[normalize-space()='Close' and not(@data-slot='dialog-close')]"
    );


    // -----------------------------
    // Category List
    // -----------------------------

    categoryNameColumn = this.page.locator(
        "//table//tbody//tr/td[1]"
    );

    categorySearchInput = this.page.locator(
        "//input[@placeholder='Search by name, description, code or courses...']"
    );

    courseBadges = this.page.locator(
        "//table//tbody//tr/td[3]//span"
    );


    // -----------------------------
    // Edit / Delete Category
    // -----------------------------

    editMenuItem = this.page.locator(
        "//div[@role='menuitem'][normalize-space()='Edit']"
    );

    deleteMenuItem = this.page.locator(
        "//div[@role='menuitem'][normalize-space()='Delete']"
    );

    updateCategoryButton = this.page.locator(
        "//button[normalize-space()='Update Category']"
    );

    deleteConfirmationButton = this.page.locator(
        "//button[normalize-space()='Delete']"
    );


    // ============================================================
    // Navigation Methods
    // ============================================================

    async navigateToDynamicFieldsManagement() {
        await this.click(
            this.dynamicFieldSettingsIcon
        );
    }


    async navigateToCourseCategoryMenu() {
        await this.click(
            this.courseCategoryTab
        );
    }


    // ============================================================
    // Add Category Methods
    // ============================================================

    async clickAddCategory() {
        await this.click(
            this.addCategoryButton
        );
    }


    async fillCategoryDetails(
        categoryName: string,
        courseNames: string[],
        description: string
    ) {

        await this.filldata(
            this.categoryNameInput,
            categoryName
        );

        for (const course of courseNames) {

            await this.filldata(
                this.courseNamesInput,
                course
            );

            await this.pressEnter(
                this.courseNamesInput
            );
        }

        await this.filldata(
            this.categoryDescriptionTextarea,
            description
        );
    }


    async clickCreateCategory() {

        await this.click(
            this.createCategoryButton
        );
    }


    async clickClose() {

        await this.closeButton.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            this.closeButton
        );
    }


    // ============================================================
    // Verify Category
    // ============================================================

    async verifyCategoryDisplayed(
        categoryName: string
    ) {

        await this.filldata(
            this.categorySearchInput,
            categoryName
        );

        /*
         * Do not use:
         *
         * expect(this.categoryNameColumn).toContainText(...)
         *
         * because categoryNameColumn contains multiple <td>
         * elements and Playwright strict mode will fail.
         *
         * Instead, locate only the cell containing the
         * expected category name.
         */

        const categoryCell =
            this.categoryNameColumn.filter({
                hasText: categoryName
            }).first();

        await expect(
            categoryCell
        ).toBeVisible({
            timeout: 15000
        });

        await expect(
            categoryCell
        ).toHaveText(
            categoryName,
            {
                timeout: 15000
            }
        );

        return true;
    }


    // ============================================================
    // Search Course
    // ============================================================

    async searchCourse(
        courseName: string
    ) {

        await this.filldata(
            this.categorySearchInput,
            courseName
        );

        /*
         * Wait for the filtered result to refresh.
         */
        await this.page.waitForLoadState(
            "networkidle"
        );
    }


    async verifyCourseDisplayed(
        courseName: string
    ) {

        const names =
            await this.getAllTextContents(
                this.courseBadges
            );

        return names.some(
            name =>
                name.trim() === courseName ||
                name.includes(courseName)
        );
    }


    // ============================================================
    // Search Category
    // ============================================================

    async searchCategoryByName(
        searchValue: string
    ) {

        await this.filldata(
            this.categorySearchInput,
            searchValue
        );

        await this.page.waitForLoadState(
            "networkidle"
        );
    }


    // ============================================================
    // Three Dot - Category Name
    // ============================================================

    getThreeDotButton(
        categoryName: string
    ) {

        return this.page.locator(
            `(//tr[.//td[1][normalize-space()='${categoryName}']]//button)[last()]`
        );
    }


    async clickThreeDot(
        categoryName: string
    ) {

        const threeDotButton =
            this.getThreeDotButton(
                categoryName
            );

        await threeDotButton.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            threeDotButton
        );
    }


    // ============================================================
    // Three Dot - Using Course Name
    // ============================================================

    async clickThreeDotForCourse(
        courseName: string
    ) {

        /*
         * Find the table row which contains the
         * required course name.
         *
         * Example:
         *
         * BFS
         * DL
         *
         * belongs to Aiml category.
         *
         * We don't depend on the category being
         * called "Aiml".
         */

        const row = this.page.locator(
            `//tr[.//td[contains(normalize-space(), '${courseName}')]]`
        ).first();

        await row.waitFor({
            state: "visible",
            timeout: 15000
        });

        /*
         * Get the action button from the same row.
         */
        const threeDotButton =
            row.locator("button").last();

        await threeDotButton.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            threeDotButton
        );
    }


    // ============================================================
    // Edit Category
    // ============================================================

    async clickEdit() {

        await this.editMenuItem.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            this.editMenuItem
        );
    }


    async updateCategoryName(
        newCategoryName: string
    ) {

        await this.categoryNameInput.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.filldata(
            this.categoryNameInput,
            newCategoryName
        );
    }


    async clickUpdateCategory() {

        await this.updateCategoryButton.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            this.updateCategoryButton
        );

        /*
         * The application takes some time to save
         * and refresh the category data.
         *
         * Keep this small wait before the verification.
         */
        await this.page.waitForTimeout(3000);
    }


    // ============================================================
    // Delete Category
    // ============================================================

    async clickDelete() {

        await this.deleteMenuItem.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            this.deleteMenuItem
        );
    }


    async confirmDeleteCategory() {

        await this.deleteConfirmationButton.waitFor({
            state: "visible",
            timeout: 15000
        });

        await this.click(
            this.deleteConfirmationButton
        );

        await this.page.waitForTimeout(3000);
    }


    async verifyCourseNotDisplayed(
        courseName: string
    ) {

        await this.filldata(
            this.categorySearchInput,
            courseName
        );

        await this.page.waitForLoadState(
            "networkidle"
        );

        const courseBadge =
            this.courseBadges.filter({
                hasText: courseName
            });

        await expect(
            courseBadge
        ).toHaveCount(0, {
            timeout: 15000
        });

        return true;
    }
}