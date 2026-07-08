@jagadeep
Feature: Search_Jagadeep

  Background:
    Given the admin is logged into the lms website
    And the admin navigates to the Course Management page

  Scenario: Search for an existing course successfully
    When the admin enters a valid course name in the search box
    Then the matching course should be displayed in the search results

