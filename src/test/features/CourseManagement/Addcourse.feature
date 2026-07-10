@Harini
Feature: Add Course
Background:
    Given the user is logged-in with the valid credentials
    When admin clicks the Course Management menu

@AddCourse
Scenario: Verify user can create a new course successfully
When the user clicks the Add Course button
And the user enters the course basic configuration
  | Client | ServiceType         | ServiceModel | Category              | CourseName |
| PSG Tech | Automation Testing | Automation   | Software Development  | Frontend   |
And the user clicks the Next button
And the user enters the course hierarchy details
And the user clicks the Preview & Create button
Then the course preview should be displayed
When the user clicks the Save Course Layout button
Then the course should be created successfully
@mandatoryempty
Scenario: Verify user cannot create a course when a mandatory field is left empty
When the user clicks the Add Course button
And the user enters the course basic configuration
  | Client   | ServiceType            | ServiceModel | Category             | CourseName |
  | PSG Tech | Business to institution | TD          | Software Development |            |
And the user clicks the Next button without navigating
Then the user should see a validation message for the mandatory Course Name field
And the user should remain on the Add Course page

@emptyfield 
Scenario:Verify user cannot create a course when all filed is empty
When the user clicks the Add Course button
And the user clicks the Next button without navigating
Then the user should see the error message to fill the field
And the user should remain on the Add Course page