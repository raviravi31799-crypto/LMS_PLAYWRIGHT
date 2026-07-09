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
    | Data Management     | To oraganize the data  |
