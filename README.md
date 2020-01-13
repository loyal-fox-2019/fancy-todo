# Fancy Todo

### Getting Started

If you want to used this API & Client you need to run this in your terminal

```
//install dependencies
$ npm install

//install dev dependencies for dotenv
$ npm install -D dotenv

// running the server
$ npm run dev
```

Access the API via `http://localhost:3000/`

##### POST  `/users/register`

```json
url : '//localhost:3000/users/register',
body : {
    username : usertest,
    password : password,
    email : usertest@mail.com
},
response : {
    "_id": "5e1bcd51d47b450a5d56c68a",
    "username": "username101",
    "email": "username@mail.com",
    "password": "$2b$10$fk3F6s5qbN1pyf6KzjfqtuHdhidnkwFalI84adq5V1udqkCmGsh1K",
    "__v": 0
}
```

##### POST  `/users/login`

```json
url : '//localhost:3000/users/register',
body : {
    username : usertest,
    password : password,
}
response: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFiY2Q1MWQ0N2I0NTBhNWQ1NmM2OGEiLCJ1c2VybmFtZSI6InVzZXJuYW1lMTAxIiwiaWF0IjoxNTc4ODgwNDg4fQ.I0E3TnxdECuYr2Ao-4pZ-R7LL_liFvvVVjtbQYge9SY"
```

##### GET  `/todos/`

```json
url : '//localhost:3000/todos/',
headers: {token}
response : [
    {
        "status": "OnProgress",
        "_id": "5e1bcec5d47b450a5d56c68c",
        "title": "Your New Task",
        "description": "Your task description",
        "due_date": "2020-01-22T00:00:00.000Z",
        "user": {
            "_id": "5e1bcd51d47b450a5d56c68a",
            "username": "username101"
        },
        "created_date": "2020-01-13T01:58:29.586Z",
        "__v": 0
    }
]
```

##### POST  `/todos/`

```json
url : '//localhost:3000/todos/',
headers: {token}
body : {
    title : 'Task Title',
    description : 'Task Description',
    due_date : '2020-1-22'
}
response:{
    "status": "OnProgress",
    "_id": "5e1bcec5d47b450a5d56c68c",
    "title": "Your New Task",
    "description": "Your task description",
    "due_date": "2020-01-22T00:00:00.000Z",
    "user": "5e1bcd51d47b450a5d56c68a",
    "created_date": "2020-01-13T01:58:29.586Z",
    "__v": 0
}
```

##### GET `/todos/{id}`

```json
url : '//localhost:3000/todos/5e1bcec5d47b450a5d56c68c',
headers: {token}
response : {
    "status": "OnProgress",
    "_id": "5e1bcec5d47b450a5d56c68c",
    "title": "Your New Task",
    "description": "Your task description",
    "due_date": "2020-01-22T00:00:00.000Z",
    "user": {
        "_id": "5e1bcd51d47b450a5d56c68a",
        "username": "username101"
    },
    "created_date": "2020-01-13T01:58:29.586Z",
    "__v": 0
}
```

##### PUT  `/todos/{id}`

```json
response : {
    "message": "Successfully update Todos with title : Your New Task"
}
```

##### PATCH `/todos/{id}`

```json
{
    "message": "Successfully update Todos with title : Your New Task"
}
```



### Error Handling

------

- ##### 400

  ```
  {
  	message:'Invalid Token'
  }
  ```

- ##### 403

  ```
  {
  	code: 403,
      status: 'Forbidden',
      message: 'You Don\'t have access to this Todo'
  }
  ```

- ##### 404

  ```
  {
  	code: 404,
  	status: 'Not Found',
  	message: 'Cannot find Todos with Id : {todo id}'
  
  }
  ```

  

- ##### 500

  ```
  {
  	message : 'Internal Sever Error'
  }
  ```

  