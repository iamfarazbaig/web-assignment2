# Assignment 2 - ReactJS App & API.

Name: Farazulla Baig Mohammed
App link: https://assignment2ewd.herokuapp.com/

## Overview.
It is a portfolio app wherein the user can login, add their details such as Education, experiences and can view other users too.

 . . . . . List of user features . . . . 
 
 + Used redux for state management
 + Testing with the Redux Chrome extension
 + Prop-Type validation used.
 + Authenticated and signed up users email and password and other data stored in MongoDB Atlas
 + Protected routes against unauthenticated users
 + Front end and backend form validation
 + Used concurrently to run both front end and backend in parallel.
 + All routes tested in Postman
 + Unit testing for the models
 + Deployed to Heroku with a postbuild script
 + Used font awesome for styling
 + React Hooks, Async/Await & modern practices
 + Created extensive API but could not complete it in the front end
 + Custom backend middleware (auth) to check for token
 + nodemon used during app development
 + Leveraged WebStorm IntelliSense and prettier File Watcher for auto imports and formatting code automatically.

## Installation requirements.

Run `npm install` and then `npm run dev` to run both frontend and backend concurrently

## Test Suites in Postman.

Diagram of sample of the test data used in Postman.

![][postman]

Diagram of the redux dev tools extension highlighting some of the action types used.

![][reduxActionTypes]

## App Component Design (Backend).

![][folderStructure]

This displays the organization of files for the Backend API with the placement of business logic in controllers, routes, models having the schema and middleware which checks if a user possesses a valid token or not.

## UI Design.

Add education route

![][addEducation]

Add experience route

![][addExperience]

Create profile route

![][createProfile]

Dashboard route

![][dashboard]

## Routing and API Design.
Users and Auth:
+ /auth - **POST** - login user
+ /auth - **GET** -  get authenticated user
+ /users - **POST** - register user

Profiles:
+ /profile - **POST** - Create and update profile
+ /profile/me - **GET** - get logged in profile
+ /profile - **GET** - get all profiles
+ /profile/user/:user_id - **GET** - get profile by user id
+ /profile - **DELETE** - delete a profile
+ /profile/experience - **PUT** - add a experience(which is a part of profile- hence PUT is used)
+ /profile/education - **PUT** - add education
+ /profile/experience/:exp_id - **DELETE** - delete a experience by its id
+ /profile/education/:edu_id - **DELETE** - delete education by its id
+ profile/github/:github_username - **GET** - get 5 github repositories.

Posts:
+ /posts - **POST** - add a post
+ /posts - **GET** - get all posts
+ /posts/:user_id - **GET** - get post by user id
+ /posts/:user_id - **DELETE** - delete post by user id
+ /posts/comment/:id - **POST** - add a comment by user id
+ /posts/comment/:id - **DELETE** - delete a comment by user id

All routes except get all users and login and register are protected.

# Web API Deployment and CI
The app is deployed on Heroku.

Travis CI
![][ci]
## Web API Install and Operation
![][test]
+ `npm run test` runs the test cases specified and also produces coverage report for which nyc test coverage tool is used

+ `npm run dev` runs server and client using concurrently package

+ `heroku-postbuild` is a post build script so that client and server run in heroku without any issues.

## API Configuration
The configuration approach for the API:
~~~bash
NODE_ENV=development
PORT=5000 in server.js in root folder for running server side.
PORT=3000 for running client side.
HOST=localhost
mongoDB=https://cloud.mongodb.com/v2/5bdb868fc56c9822a3a1837b#clusters/detail/AssignmentCluster
~~~

## Extra features

 + Used bcryptjs for hashing the passwords 
 + Used Gravatar for getting every user profile picture if uploaded to Gravatar email.
+ Used Morgan for logging in development
+ Used express-validator
+ Used New Relic for analytics
![][analytics]
+ Used prettier as a File Watcher on WebStorm to prettify code on save.
+ Protection from CORS errors in app.js (server side) 

## Independent learning.

+ React Redux for efficient state management.
+ Redux middleware (Thunk) for asynchronous tasks
+ Used react hooks
+ Prop type validation


[postman]: ./postman.png
[reduxActionTypes]: ./reduxActionTypes.png
[folderStructure]: ./folderStructure.png
[addEducation]: ./addEducation.png
[addExperience]: ./addExperience.png
[createProfile]: ./createProfile.png
[dashboard]: ./dashboard.png
[ci]: ./ci.png
[test]: ./testing.png
[analytics]: ./analytics.png