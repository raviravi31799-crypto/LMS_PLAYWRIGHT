@Jothika
Feature:Login functionality of application

Description:This feature describes the login fuctionality of the application to all extends

Background:
Given the user is on the login page 

Scenario:Valid login 
And the user enters valid login details
|email            |password|
|testing3@gmail.com|123     |
When the user clicks Signin button 
Then the user is redirected to dashboardpage

Scenario:Invalid login with invalidemail
And the user enters invalid email and valid password
When the user clicks Signin button
Then the user receives warning text


Scenario:Invalid login with invalid password
And the user enters valid email and invalid password
When the user clicks Signin button 
Then the user receives warning intimating invalid password


@blank
Scenario Outline: Login with blank mandatory fields
  When the user enters "<email>" and "<password>"
  When the user clicks Signin button
  Then the browser displays "<message>" validation

Examples:
| email                 | password | message                     |
|                       | 123      | Please fill out this field. |
| testing3@gmail.com    |          | Please fill out this field. |



