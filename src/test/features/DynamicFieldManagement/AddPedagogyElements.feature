@jagadeep
Feature: Dynamic Field Management

    Background:
        Given the admin is logged into the lms website

    Scenario: Add a new pedagogy element

        When the admin navigates to the Dynamic Field Settings page
        And the admin clicks the Pedagogy tab
        And the admin opens the "I Do (Teacher Demonstration)" pedagogy elements
        And the admin adds a new element "Think-Pair-Share"
        Then the pedagogy element "Think-Pair-Share" should be created successfully