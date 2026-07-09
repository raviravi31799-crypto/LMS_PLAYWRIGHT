
Feature: Search_Jagadeep

  Background:
    Given the admin is logged into the lms website
    And the admin navigates to the Course Management page

  Scenario: Search for an existing course successfully
    When the admin enters a valid "<valid_coursename>" in the search box
    Then the matching course should be displayed in the search results

  Examples:
      | valid_coursename |
      | ML |

  Scenario: Search for an invalid course
    When the admin enter a invalid "<invalid_coursename>" in the search box
    Then the matching course should not be displayed in the search results

  Examples:
      | invalid_coursename |
      | invalid |

  @Bug-1
  Scenario: Search for an existing course in another page
    When the admin navigates to different page
    And the admin enters the coursename
      | coursename |
      | ML         |
    Then the matching course should be displayed in the search results

  