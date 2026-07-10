@sriram
Feature: 7/7/2026_SRIRAM_K_ADD_COURSE_STRUCTURE

    Description:
        Verify that an admin can add a new course structure by creating a module.

    Background:
        Given admin login with the valid credentials
        When admin clicks the Course Management menu
    @module
    Scenario Outline: Verify that the user can add a new course structure module
        And admin search the course "<search>"
        And admin click the Add Course Structure
        And admin click the module menu
        And admin enter the title as "<title>"
        And admin enter the description as "<description>"
        And admin select the skillset as "<skils>"
        And admin click the Add module
        Then admin should seen the "<title>" in the module

    Examples:
        | search | title            | description                 | skils  |
        | ML DEMO | Machine Learnings | Machine Learning Algorithms | Python |

    @submodule
    Scenario Outline: Verify that the user can add a new submodule for that course
        And admin search the course "<search>"
        And admin click the Add Course Structure
        And admin Add the module 
        And admin click the submodule menu
        And admin enter the title as "<title>"
        And admin enter the description as "<description>"
        And admin select the skillset as "<skils>"
        And admin click the Add submodulemodule
        Then admin should seen the "<title>" in the submodule

    Examples:
        | search | title            | description                 | skils  |
        | DL DEMO | Machine Learning | Machine Learning Algorithms | Python |

    @print
    Scenario:Verify the print functionality
        And admin search the course
        And admin click the Add Course Structure
        And admin click the print button
        And admin click the excel button
        And admin save the excel seet 
        Then admin shoud view the module details in the excel sheet



        
       
       