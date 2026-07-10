# @Subha
Feature: Edit & Delete Course

  Background:
   Given the Admin is logged into the application successfully
   And the user navigates to the Course Management
   
  Scenario: Edit the course levels and verify they are displayed
    When Admin clicks the three dot menu for a course
    | CourseID     |
    | J-BTI-H-006  |
 
    When Admin selects Edit Course option
    And Admin clicks the Next button
    And Admin edits the course hierarchy by selecting a Sub Module, Topic, and Sub Topic
    And Admin clicks the Preview & Update button
    And Admin clicks the Save Course Layout button
    Then A success message should be displayed
    And Admin clicks the Later button
    When Admin clicks the View button
    Then The selected Sub Module, Topic, and Sub Topic should be displayed

  Scenario: Delete a course and verify it is removed from the course list
    When Admin clicks the three dot menu for a course
      | CourseID       |
      | J-AT-A-005     |
  
    And Admin selects Delete Course option
    And Admin confirms the course deletion
    Then The deleted course should not be displayed in the course list