
import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";

When('the user clicks the Add Course button', async function () {
  await this.coursepage.clickAddCourseBtn();
});

When('the user enters the course basic configuration',  { timeout: 50000 }, async function (dataTable) {
   const data = dataTable.hashes();

    if (data.length === 0) {
      throw new Error("DataTable is empty");
    }
    const course = data[0];
    await this.coursepage.enterBasicConfiguration(
      course.Client,
      course.ServiceType,
      course.ServiceModel,
      course.Category,
      course.CourseName
    );
});

When('the user clicks the Next button', async function () {
      await this.coursepage.clickNext();
});

