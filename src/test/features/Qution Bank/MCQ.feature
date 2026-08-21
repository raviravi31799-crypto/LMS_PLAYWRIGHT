@MCQ
Feature: Verify the MCQ and True or False questions develop functionality

    Background:
        Given admin login with the valid credentials
        When admin click the question bank menu

    @InlineData
    Scenario: Verify the MCQ question develop functionality with multiple choice questions
        And admin click the create question button
        And admin click the MCQ Question button
        And admin enter the category
        And admin click the question type dropdown
        And admin choose the multiple choice option
        And admin add the question and options using the following data
            | Category   | Question                                      | Option1    | Option2     | CorrectAnswer |
            | Java       | Which keyword is used to inherit a class?     | extends    | implements  | extends       |
            | Java       | Which method is the entry point of Java?     | start()    | main()      | main()        |
            | SQL        | Which command is used to retrieve data?      | INSERT     | SELECT      | SELECT        |
            | Python     | Which keyword defines a function in Python?  | define     | def         | def           |
        And admin click the save questions
        Then admin should see the pop message for the question added successfully

    @Excel
    Scenario: Verify the True or False question develop functionality using Excel test data
        And admin click the create question button
        And admin click the MCQ Question button
        And admin enter the category
        And admin click the question type dropdown
        And admin choose the true or false option
        And admin add the true false questions and options from excel file "TrueFalseQuestions.xlsx"
        And admin click the save questions
        Then admin should see the pop message for the question added successfully