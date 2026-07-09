 @Subha
 @DynamicAddCourseCategory
Feature: Dynamic Course Category
    
Background:
     Given the Admin is logged into the application successfully
     When Admin navigates to the Dynamicfields management
     And Admin navigates to the CourseCategory menu 

  Scenario: Add a new course category and verify it is displayed in the list
    When Admin clicks the Add Category button
    And Admin fills the category details from the csv file
    And Admin clicks the Create Category button
    And Admin clicks the Close button
    Then the new category should be displayed in the category list