@Jothika
Feature:Pagination functionality of the application

Description: This feature is to verify the pagination functionality of the application and ensure users can navigate between pages while viewing the correct set of records.

Background:
Given the user is logged to the application
And navigated to coursemanagement page

Scenario:Verify the fuctionality of next button in CourseManagement 
And the application should display the contents of first page
When the user clicks the next button 
Then the second page should be displayed


