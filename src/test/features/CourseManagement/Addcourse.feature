@Harini
Feature: Add Course
Background:
    Given admin login with the valid credentials
    When admin clicks the Course Management menu

@AddCourse
Scenario: Verify user can create a new course successfully
When the user clicks the Add Course button
And the user enters the course basic configuration
  | Client | ServiceType                | ServiceModel | Category                 | CourseName |
  | PSG Tech  | Business to institution | TD           | Software Development     | Frontend   |
And the user clicks the Next button