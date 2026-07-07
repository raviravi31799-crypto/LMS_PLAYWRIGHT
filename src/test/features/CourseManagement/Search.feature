@Search
Feature: Search_Jagadeep

  Background:
    Given the user is logged into the Learning Hub
    And the user navigates to the Course Management page

  Scenario: Search for an existing course successfully
    When the user enters a valid course name in the search box
    Then the matching course should be displayed in the search results