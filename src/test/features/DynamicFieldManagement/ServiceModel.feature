@ServiceManagement
Feature: Service Model Management
Background:
    Given admin login with the valid credentials
    When admin clicks the Dynamic field setting menu
@AddService
Scenario Outline: Verify admin can create a new service successfully
    When the admin clicks the Add Service button
    And the admin enters the service name "<ServiceName>"
    And the admin enters the description "<Description>"
    And the admin clicks the Create Service button
    Then the service should be created successfully
Examples:
    | ServiceName         | Description            |
    | AI-Oriented course         | AI fundamentals basic |

@DuplicateService
Scenario: Verify admin cannot create a duplicate service
    When the admin clicks the Add Service button
    And the admin enters the service details
    And the admin clicks the Create Service button
    Then an error toast message should be displayed

@SearchService
Scenario Outline: Verify the exact service is displayed after searching
  When the admin clicks the Add Service button
  And the admin searches for the service "<serviceName>"
  Then the exact service "<serviceName>" should be displayed

Examples:
  | serviceName          |
  | Automation testing   |
  | Automation Testing   |
  | Automation Testing2  |


