Feature:Question banks(MCQ) functionality of the application 

Description:This feature describes the verification of Question bank creation especially MCQ creations and other functions

Background:
Given the user logged the application successfully
And the user clicks on the Question bank option

Scenario:Verify the creation of MCQ question with all mandatory fields and required option
When the user clicks on createquestion and selects MCQ question
And enters the required details such as category,question,answerkey,enabling required
When the user clicks on savequestions
Then the user receives a success text regarding the question creation