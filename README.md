# Assignment 2 - ReactJS App & API.

Name: Farazulla Baig Mohammed

## Overview.
It is a portfolio app wherein the user can login, add their details such as Education, experiences and can view other users too.

 . . . . . List of user features (excluding user registration and authentication) . . . . 
 
 + Used Gravatar for getting every user profile picture if uploaded to Gravatar email.
 + Feature 2
 + Feature 3
 + etc
 + etc

## Installation requirements.

. . . . Briefly state (to a third party) the installation steps necessary to run your app.

## Data Model Design.

Diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent).

![][model]

## App Component Design.

A screenshot showing the component stories from Storybook  

![][stories]

. . . . Explain any non-standard stories, if necessary . . . . . 

## UI Design.

. . . . . Screenshots of app's views (see example below) with appropriate captions (user regeneration and login views, if implemented, can be omitted) . . . . . . . 

![][image3]

## Routing.
. . . . List each route supported and state the associated view . . . . . 

+ /foos - displays all published foos
+ /foos/:id - detail view of a particular foo (:id)
+ etc
+ etc

Specify which, if any, of the above routes are protected (require login)

# Web API Endpoint Reference
. . . Give a brief overview of the Web API functionality.

## Web API Install and Operation
. . . . Describe how to install/start/stop the API. It would be a good idea to go though the scripts section of the package.json file.

## API Design
Describe your web API.

| HTTP Verb & Path |  Description |
| -- | -- |
| **GET** /api/contacts |return a list of contacts |
| **POST** /api/contacts |add a new contact |
| **PUT** /posts/api/contacts/{id} | update a contact |
| **DELETE** /posts/api/contacts/{id} | delete a contact |

## API Configuration
Describe the configuration approach for your endpoint. For example, contents of config file and where it should be located:
~~~bash
NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
~~~

## Security and Authentication
. . . . Give details of any autentication/security implemented in on the API. Indicate which routes are protected.

## Testing
. . . . Briefly explain any testing strategy that accompanies the project, including and example report if you have one...
![][image4]

## Extra features

. . . . . Briefly explain any non-standard features, functional or non-functional, developed for the app. This would include user registeration and authentication, improved re-rendering policies, etc . . . . . .  

## Independent learning.

. . . . . State the non-standard aspects of React (or other related technologies) that you researched and applied in this assignment . . . . .  



[model]: ./data.jpg
[image3]: ./screen.png
[stories]: ./storybook.png
[image4]: ./testing.png