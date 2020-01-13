# fancy-todo_Okka Linardi

Your Everyday Todo List App!



#### Before you do anything else..

```
$ npm install
```



## 3rd Party APIs

- Google Authenticator
- Weatherbit



## .ENV Tempelates

```
CLIENT_ID ==> Google Authentication Client ID
JWT_SECRET ==> Your Preferred Json Web Token Secret
DEFAULT_PASS ==> Your Preferred Default Password for Google Users
WEATHERBIT_KEY ==> Weatherbit API Key
```



## Database and ODM

- MongoDB
- Mongoose ODM



## Main Routes

|  Routes  |
| :------: |
|  /todo   |
|  /user   |
| /weather |



## Todo Route

| Route      | Method | Body                                                         | query | Result                                                       |
| ---------- | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| /          | get    |                                                              |       | returns all user's active todos                              |
| /          | post   | name:todo name,<br />description:todo description<br />importanceLevel:todo level of importance<br />due_date:todo due date |       | creates user's todo                                          |
| /:id       | get    |                                                              |       | returns one todo                                             |
| /:id       | delete |                                                              |       | deletes user's todo                                          |
| /:id       | put    | name:todo name,<br />description:todo description<br />importanceLevel:todo level of importance<br />due_date:todo due date |       | updates user's todo                                          |
| /:id       | patch  |                                                              |       | changes the status of user's todo                            |
| /all       | get    |                                                              |       | get all user's todo                                          |
| /today     | get    |                                                              |       | get all user's todo for today                                |
| /tomorrow  | get    |                                                              |       | get all user's todo for the days after today                 |
| /expired   | get    |                                                              |       | get all user's ecpired todo                                  |
| /finished  | get    |                                                              |       | get all user's finished todo                                 |
| /inactive  | get    |                                                              |       | get all user's inactive todo                                 |
| /important | get    |                                                              |       | get all user's todo which has the level of importance : 'Important' |
| /normal    | get    |                                                              |       | get all user's todo which has the level of importance : 'Normal' |
| /urgent    | get    |                                                              |       | get all user's todo which has the level of importance : 'Urgent' |
| /search    | post   | name:todo name                                               |       | finds user's todo based on todo name                         |



## User Route

| Routes  | Method | Body                                                         | Query | Result                                            |
| ------- | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------- |
| /       | post   | name:user's name<br />email:user's email<br />password: user's password |       | Creates an ID and database spot for user          |
| /google | post   |                                                              |       | Generates token and database,ID(for first timers) |
| /login  | post   | email:user's email<br />password:user's password             |       | Generates token                                   |



## Weather Route

| Routes | Method | Body | Query | Result                                      |
| ------ | ------ | ---- | ----- | ------------------------------------------- |
| /      | get    |      |       | Returns today's weather from Weatherbit API |



# Middlewares

This app uses 2 middlewares **Authentication** and **ErrorHandler**



### Authentication:

​		Decrypts JWT token

### ErrorHandler:

​		Handles all errors

