# Fancy Todo Loyal Fox

------

## API DOCUMENTATION POSTMAN : 

https://documenter.getpostman.com/view/9979303/SWLiZmDV?version=latest

## BaseURL : http://localhost:3000

## User Routes:

| **ROUTE**         | METHOD | Description                      | Require          |
| ----------------- | ------ | -------------------------------- | ---------------- |
| /users            | GET    | Get all uses                     | None             |
| /users/login      | POST   | Sign in user                     | User information |
| /users/register   | POST   | Sign up user                     | User information |
| /users/google     | POST   | User login via google account    | Google Account   |
| /users/invitation | GET    | Get project invitation to user's | Token            |

## Todo Routes:

| ********ROUTE******** | METHOD | Description                      | Require                    |
| --------------------- | ------ | -------------------------------- | -------------------------- |
| /todos/               | GET    | Get all user's todos             | Token                      |
| /todos/single/:id     | GET    | Get a single user's todo         | Token, Todo ud             |
| /todos/:projectId     | GET    | Show Project's todos             | Token, project id          |
| /todos/               | POST   | Create todo for Authenticed user | Token                      |
| /todos/:projectId     | POST   | Create todo for project          | Token, Project Id          |
| /todos/:id            | PUT    | Editing todo                     | Token, Authorized, Todo id |
| /todos/:id            | PATCH  | Change todo status to 'DONE'     | Token, Authorized, todo id |
| /todos/:id            | DELETE | Delete single Todo               | Token, Authorized, todo id |

## **Project Routes:**

| *****\*******ROUTE\******** | METHOD | Description                                          | Require         |
| --------------------------- | ------ | ---------------------------------------------------- | --------------- |
| /projects/all               | GET    | Gett all project                                     | none            |
| /projects/                  | GET    | Get Authenticated User Project                       | Token           |
| /projects/:id               | GET    | Checking autheticated user's membership to a project | Token           |
| /projects/:projectId        | PATCH  | Remove one member from project                       | Token, memberId |

## **Invitation Routes:**

| *************\***ROUTE****\**** | METHOD | Description               | Require                      |
| ------------------------------- | ------ | ------------------------- | ---------------------------- |
| /invite/:username               | GET    | Get userlist              | Token                        |
| /invite/:projectId?email=    | POST   | Invite user to project    | Project Id , Email user, Token |
| /invite/:projectId              | PUT    | Accept project invitation | Token, Project Id            |
| /invite/:projectId              | PATCH  | Reject project invitation | Token, project id            |



## Errors:

| Status Code | Name                  | Description                        |
| ----------- | --------------------- | ---------------------------------- |
| 400         | Bad request           | Invalid submitted data             |
| 401         | Unauthenticated       | Token not verify                   |
| 403         | Forbidden             | Unauthorized                       |
| 404         | Not Found             | Resource could not found           |
| 500         | Internal Server Error | Something went wrong in our server |



## User : 

------

### ****User****

##### **Login**

- ##### url

  users/login

- ##### Method

  `POST`

- ##### Required

  | Form     | input required |
  | -------- | -------------- |
  | name     | [String]       |
  | email    | [String]       |
  | password | [String ]      |

- ##### Success Response

  will redirect/show to home page

  gain token 

  ###### Code: 200


- ##### Error Response:

  - **Code:** 403 Forbidden

    **Content:** `{error: Password Incorrect}`

  - **Code:** 404 Not Found

    **Content:** ```{error: Your username not match to any user's account }```

##### ********Register********

- ##### url

  users/register

- ##### Method

  `POST`

- ##### Required

  | Form         | input required |
  | ------------ | -------------- |
  | name         | [String]       |
  | email        | [String]       |
  | phone_number | [String]       |
  | password     | [String ]      |

- ##### Success Response

  user data created

  will redirect/show to home page

  gain token 

  ###### Code: 201


- ##### Error Response:

  - **Code:** 400 Bad request

    **Content:** `{error: name/email/password should not be empty}`

##### ****\*******Google Signin\********

- ##### url

  users/google

- ##### Method

  `POST`

- ##### Required

  - google account

- ##### Success Response

  user data created (if email not used before, with passward equal as email and username from google username)

  will redirect/show to home page

  gain token 

  ###### Code: 201(for create new account)/200(for login)


- ##### Error Response:

  - **Code:** 500 Internal Server Error

    **Content:** ``{Internal Server Error}``

##### ****\*******Invitation\********

- ##### url

  users/invitation

- ##### Method

  `GET`

- ##### Required

  - Token (Authenticed user)

- ##### Success Response

  ```
  [
      {
          "members": [],
          "_id": "5e1ad1a177d5192c2459e406",
          "name": "Project Postman",
          "__v": 0
      }
  ]
  ```

  will get array of project list who invited authenticed user

  ###### Code: 200


- ##### Error Response:

  - **Code:** 500 Internal Server Error

##### ****\*******Get All User\********

- ##### url

  users/

- ##### Method

  `GET`

- ##### Required

  - ​

- ##### Success Response

  ```
  [
      {
          "invitation": [
              "5e1ad1a177d5192c2459e406"
          ],
          "_id": "5e1abbb979b24d19d2c76fb1",
          "email": "patra@mail.com",
          "name": "patra",
          "password": "$2a$06$cC883tUSdbaj6p44GeWW..ZMOwCT/EJ.zS5fQrhfwu.rBv.KzZqwy",
          "__v": 0
      },
      {
          "invitation": [],
          "_id": "5e1abdacb8cfd11b48112db8",
          "email": "putra@mail.com",
          "name": "Putra",
          "password": "$2a$06$HW.99857wx24ZgPrxmwfkeSEyFCtAv/7q2EbR0voKevbITklg5Sdq",
          "__v": 0
      },
      {
          "invitation": [],
          "_id": "5e1b8a1065bad064342251bb",
          "email": "artap404@gmail.com",
          "name": "artap nanayad",
          "password": "$2a$06$IzcoTqfXe8RrepIiN/AaQ.iSGYrvgU4jxr.tVaCmP5I5phKySdZWS",
          "__v": 0
      },
      {
          "invitation": [],
          "_id": "5e1b996d4493b071f4f23c53",
          "email": "putri@mail.com",
          "name": "putri",
          "password": "$2a$06$D1bR61AXkAVURsaOmtt2Muz5CJfcq0VGgB0ZPRiJb0/UrXkmI2CX2",
          "__v": 0
      }
  ]
  ```

  will get array of user list

  ###### Code: 200


- ##### Error Response:

  - **Code:** 500 Internal Server Error



