# Fancy Todo

This is a simple application for recording tasks

## Installation

Use the package.json 

```bash
npm i axios bcrypt cors dotenv express google-auth-library jsonwebtoken mongoose
```

## Routes

| Route       | HTTP | Header(s) | Body                                                       | Description              |
| ----------- | ---- | --------- | ---------------------------------------------------------- | ------------------------ | 
| /users/signup  | POST  | null      | {email, password}                                                       |Login & get token |
| /user/signin | POST | null      | {first_name, last_name,email,password,phone}              | Create Account
| /todos  | GET | {token}      | Null                     | Get all user todo 
| /todos/:id | GET | {token}      | Null                     | Get a todo   
| /todos  | POST | {token}      | {name, description,due_date,important}                     | Create a todo   
| /todos/:todoid  | DELETE | {token}      | Null                     | Delete a todo               |
| /todos/:todoid  | PATCH | {token}      | Null                     | Update a todo               |


## Deployment

```bash
run app.js (on folder server)
open index.html (on client folder) "http://localhost:5500/client/index.html"
```

## Required
you need make file env and fill with:

GOOGLE = [info](https://developers.google.com/identity/sign-in/web/sign-in)

SECRET = 

GENPASSWORD =


## License
Riko Orlando
