

# fancy-todo

# Todododo API Documentation

Dokumentasi RESTFUL API Todododo.

### environment variabeles

```PORT = 
PORT
MONGO_URI 
JWT_SECRET
CLIENT_ID_GOOGLE
```

## USAGE

```text
javascript
npm install
npm run dev
```

## BASE URL

```
http://localhost:3000/
```

##  ACCESS

```````text
Access server port: 3000
Access client port: 8080
```````



## USER ROUTES

| Routing             | HTTP | Header(s) | Body                                                         | Response                                                  | Description       |
| ------------------- | ---- | --------- | ------------------------------------------------------------ | --------------------------------------------------------- | ----------------- |
| /users              | POST | none      | fullname : String (***required***), email : String (***required***), password : String (***required***) | Error: Internal server error Success: add new user        | Create new user   |
| /users/login        | POST | none      | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login user          | normal user login |
| /users/login/google | POST | none      | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login google member | google user login |



## TODO ROUTE

| Routing    | HTTP   | Headers(s) | Body                                                         | Response                                                     | Description            |
| ---------- | ------ | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------- |
| /todos     | GET    | token      | none                                                         | Error: Internal server error, Success: Show all todos        | Show all todos to user |
| /todos     | POST   | token      | name: STRING (***required***), description: STRING (***required***), due_date: DATE,(***required***) | Error: Internal server error, Validation error, Success: create new todo | create new todo        |
| /todos/:id | PATCH  | token      | none                                                         | Error: Internal server error, Success: change status from uncompleted to complete | update todo            |
| /todos/:id | DELETE | token      | none                                                         | Error: Internal server error, Success: delete finish selected todo | delete todo            |



