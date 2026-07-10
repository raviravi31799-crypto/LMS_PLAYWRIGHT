 @Subha

Feature: Dynamic Course Category
    
Background:
     Given the Admin is logged into the application successfully
     When admin clicks the Dynamic field setting menu
     And Admin navigates to the CourseCategory menu 
     
  @DynamicAddCourseCategory
  Scenario: Add a new course category and verify it is displayed in the list
    When Admin clicks the Add Category button
    And Admin fills the category details from the csv file
    And Admin clicks the Create Category button
    And Admin clicks the Close button
    Then the new category should be displayed in the category list

  @SearchCourse
  Scenario: Search a course and verify it is displayed
    When Admin searches for a course
      | CourseNames |
    Then the course should be displayed in the category list

   
  @EditCourseCategory
  Scenario: Edit a course category name and verify the updated name is displayed
    When Admin clicks the three dot menu for a category
      | CourseNames  |
    And Admin selects Edit option
    And Admin updates the category name
    And Admin clicks the Update Category button
    And Admin clicks the Close button
    Then the updated category should be displayed in the category list 