@Subha
Feature: Edit & Delete Course_Updated_21/08/2026

  Background:
    Given the Admin is logged into the application successfully
    And the user navigates to the Course Management

  @SubhaEditBasicCourse
  Scenario: Edit the course basic configuration and verify the update

    When Admin clicks the three dot menu for a course
      | CourseID      |
      | PT-BTI-PT-003 |
    And Admin selects Edit Course option
    And Admin edits the course basic configuration
      | Client  | ServiceType           | ServiceModel | Category | CourseName       |
      | jamocha | business to business  | TD           | Testing  | selenium testing |
    And Admin clicks the Next button
    And Admin edits the course hierarchy by selecting a Sub Module, Topic, and Sub Topic
    And Admin clicks the Preview & Update button
    And Admin clicks the Save Course Layout button
    Then A success message should be displayed
    And Admin clicks the Later button

  @SubhaEditCourseHierarchy
  Scenario: Edit the course hierarchy and verify they are displayed

    When Admin clicks the three dot menu for a course
      | CourseID      |
      | PT-BTI-PT-003 |
    And Admin selects Edit Course option
    And Admin clicks the Next button
    And Admin edits the course hierarchy by selecting a Sub Module, Topic, and Sub Topic
    And Admin clicks the Preview & Update button
    And Admin clicks the Save Course Layout button
    Then A success message should be displayed
    And Admin clicks the Later button
    When Admin clicks the View button
    Then The selected Sub Module, Topic, and Sub Topic should be displayed

  @SubhaEditCourseLevels
  Scenario: Edit the course levels through View Full Details and verify the updated level

    When Admin clicks the three dot menu for a course
      | CourseID      |
      | PT-BTI-PT-003 |
    And Admin selects View Full Details option
    And Admin scrolls down and clicks Edit Course button
    And Admin clicks the Next button
    And Admin selects the Intermediate course level
    And Admin clicks the Preview & Update button
    And Admin clicks the Save Course Layout button
    Then A success message should be displayed
    And Admin waits for the course level update
    And Admin verifies the course level is displayed as "Intermediate"
      | CourseID      |
      | PT-BTI-PT-003 |

  @SubhaCancelPedagogy
  Scenario: Cancel pedagogy changes and verify unsaved changes are not retained

   When Admin clicks the View button under the Pedagogy column for course 
     | PT-BTI-PT-003 |
   Then Admin captures the original pedagogy data
   And Admin closes the Pedagogy Details popup
   When Admin clicks the three dot menu for a course
    | PT-BTI-PT-003 |
   And Admin selects View Full Details option
   And Admin scrolls down and clicks Edit Course button
   And Admin clicks the Next button
   And Admin changes the We Do pedagogy data
   And Admin does not save the course layout
   When Admin clicks the View button under the Pedagogy column for course
    | PT-BTI-PT-003 |
   Then the original pedagogy data should be displayed

  @SubhaDeleteCourse
  Scenario: Delete a course and verify it is removed from the course list

    When Admin clicks the three dot menu for a course
      | CourseID     |
      | PT-BTI-S-001 |
    And Admin selects Delete Course option
    And Admin confirms the course deletion
    Then The deleted course should not be displayed in the course list

  @SubhaCancelDeleteCourse
  Scenario: Cancel course deletion and verify the course is still displayed

    When Admin clicks the three dot menu for a course
      | CourseID      |
      | PT-BTI-PT-003 |
    And Admin selects Delete Course option
    And Admin cancels the course deletion
    Then The course should still be displayed in the course list
