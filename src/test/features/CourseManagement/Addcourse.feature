@CourseManagement
Feature: Add Course
Background:
    Given the user is logged into the LMS application
    And the user navigates to Course Management

@AddCourse
Scenario: Verify user can create a new course successfully
When the user clicks the "Add Course" button
And the user enters the course basic configuration
  | Client | Service Type | Service Model | Category | Course Name |
  | Kiot   | Software     | Offline       | Testing  | Playwright  |
And the user clicks the "Next" button
And the user enters the course hierarchy details
And the user clicks the "Preview & Create" button
Then the course preview should be displayed
When the user clicks the "Save Course Layout" button
Then the course should be created successfully

@withoutMandatory
Scenario: Verify user cannot proceed without mandatory course details
When the user clicks the "Add Course" button
And the user leaves the mandatory course fields empty
And the user clicks the "Next" button
Then the mandatory field validation messages should be displayed

@CustomCourse
Scenario: Verify user can create a custom course name
When the user clicks the "Add Course" button
And the user enters the course basic configuration
Then the custom course name field should accept the entered value
