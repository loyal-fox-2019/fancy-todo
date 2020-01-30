# fancy-todo

#### This app was build by Express and Mongoose

#### All routes must initially be given _https://fancy-todo-server.dafitogroup.com_

### List of user routes:

### User Register

*POST* _https://fancy-todo-server.dafitogroup.com/user/register_ 

```javascript
method: 'post',
url: 'https://fancy-todo-server.dafitogroup.com/user/register',
data: {
    email: 'rafael.hrhp123@yahoo.com',
    password: 'b1625nfb'
}

response: {
    "message": "OK",
    "data": {
        "_id": "5e334991beac4c884c488209",
        "email": "rafael.hrhp123@yahoo.com",
        "password": "$2b$08$WIKbQDyGXMdxEnJ05nqW7eZNrClCxMRkbz3UtONFF4EJe0l5p6yxm",
        "__v": 0
    }
}
```
### User Login

*POST* _https://fancy-todo-server.dafitogroup.com/user/privateAuth_

```javascript
method: 'post',
url: 'https://fancy-todo-server.dafitogroup.com/user/privateAuth',
data: {
    email: 'rafael.hrhp123@yahoo.com',
    paswsword: 'b1625nfb'
}

response: {
    "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzMwODk0NmJkMjg2N2E2Njc1YmRhZCIsImlhdCI6MTU4MDQwNDEzOX0.ok9MbKov-X5tEE5sdz8SrzEJoUvdEO4Z-6IN2ffuQBs",
}
```

### User Login With Google

*POST* _https://fancy-todo-server.dafitogroup.com/user/openAuth_

```javascript
method: 'post',
url: 'https://fancy-todo-server.dafitogroup.com/user/openAuth',

response: {
    "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzMwODk0NmJkMjg2N2E2Njc1YmRhZCIsImlhdCI6MTU4MDQwNDEzOX0.ok9MbKov-X5tEE5sdz8SrzEJoUvdEO4Z-6IN2ffuQBs",
    "data": "Google User payload"
}
```

### List of todo routes:

### Create Todo

*POST* _https://fancy-todo-server.dafitogroup.com/todo_

```javascript
method: 'post',
url: 'https://fancy-todo-server.dafitogroup.com/todo',
data: {
    name: 'Kedokter THT',
    description: 'Jangan bangun telat',
    due_date: '2019-02-19',
}
headers: {
    token: 'User Token'
}

response: {
    "message": "New todo has been created",
    "data": {
        "status": "OnProgess",
        "_id": "5e334c1abeac4c884c48820a",
        "name": "Kedokter THT",
        "description": "jangan telat yaa",
        "due_date": "2019-02-19T00:00:00.000Z",
        "user_id": "5e334991beac4c884c488209",
        "__v": 0
    }
}
```

### Get Todo

*GET* _https://fancy-todo-server.dafitogroup.com/todo_

```javascript
method: 'get',
url: 'https://fancy-todo-server.dafitogroup.com/todo',
headers: {
    token: 'User Token'
}

response: {
    "message": "OK",
    "data": [
        {
            "status": "OnProgess",
            "_id": "5e334c1abeac4c884c48820a",
            "name": "Kedokter THT",
            "description": "jangan telat yaa",
            "due_date": "2019-02-19T00:00:00.000Z",
            "user_id": "5e334991beac4c884c488209",
            "__v": 0
        }
    ]
}
```

### Update Status Todo To Complete

*PUT* _https://fancy-todo-server.dafitogroup.com/todo_

```javascript
method: 'get',
url: 'https://fancy-todo-server.dafitogroup.com/todo',
data: {
    todo_id: '5e334c1abeac4c884c48820a'
}
headers: {
    token: 'User Token'
}

response: {
    "message": "Todo has been updated",
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```

### Delete Todo

```javascript
method: 'get',
url: 'https://fancy-todo-server.dafitogroup.com/todo',
data: {
    todo_id: '5e334c1abeac4c884c48820a'
}
headers: {
    token: 'User Token'
}

response: {
    "message": "Todo has been deleted",
    "data": {
        "n": 1,
        "DeletedCount": 1,
        "ok": 1
    }
}
```

## Error Hander

*Status 400* _ValidationError_

#### This Error will happen if:

- User email already been used

- One of the required field is empty

```javascript 
{
    errors: array of errors
}
```

*Status 400* _BadRequest_

#### This Error will happen if:

- User input the wrong email or password

```javascript 
{
    errors: object of errors
}
```

*Status 400* _JsonWebTokenErro_

#### This Error will happen if:

- User doesn't have or provide token when accessing feature

```javascript 
{
    errors: object of errors
}
```

*Status 404* _NotFound_

#### This Error will happen if:

- User edit or delete question that doen't exist

- User edit or delete answer that doen't exist

```javascript 
{
    errors: object of errors
}
```

*Status 403* _NotAuthorized_

#### This Error will happen if:

- User want to delete or update that wasn't theirs

```javascript 
{
    errors: object of errors
}
```

Make sure you have Node.js and npm installed in your computer, and then run these commands:

* $ npm install
* $ npm start
* $ npm run dev