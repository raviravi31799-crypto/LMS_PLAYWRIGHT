@jagadeep
Feature: Dynamic Field Management

    Background:
        Given the admin is logged into the lms website
        When the admin navigates to the Dynamic Field Settings page
        And the admin clicks the Pedagogy tab
        And the admin opens the "I Do (Teacher Demonstration)" pedagogy elements

    Scenario: Add a new pedagogy element
   
        And the admin adds a new element "Think-Pair-Share"
        Then the pedagogy element "Think-Pair-Share" should be created successfully

    Scenario: Delete a pedagogy element

        And the admin clicks the delete option and click the delete button
        Then the element should be deleted from the pedagogy elements
