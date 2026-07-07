@Jothika
Feature:Login functionality of application

Description:This feature describes the login fuctionality of the application to all extends

Background:
Given the user is on the login page 

Scenario:Valid login 
And the user enters valid login details
|email            |password|
|testing@gmail.com|123     |
When the user clicks Signin button 
Then the user is redirected to dashboardpage

