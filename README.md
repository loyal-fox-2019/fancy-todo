# fancy-todo
<hr>
# Fitur extra
Project-token untuk join project dengan authentikasi.
<hr>
# Deploy link
http://fancy-todo-1-zoe.s3-website-ap-southeast-1.amazonaws.com/
<hr>
# User

## register
### url
/user/register

### method
POST

### body
username: string
email: string,
password: string

### success response

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFiZTQyZGJjNWMyZTdkNjgxNmI5Y2YiLCJlbWFpbCI6InRlc3QyQG1haWwuY29tIiwiaWF0IjoxNTc4ODg2MTg5fQ.9_DXm3MKmp1_CxsOwvOGvZrMjErjdMe2Oi_zux5ErhE",
    "userId": "5e1be42dbc5c2e7d6816b9cf"
}
```

### error response

```json
"E11000 duplicate key error collection: local-todo-dev00.users index: email_1 dup key: { email: \"test2@mail.com\" }"
```

<hr>

## login
### url
/user/login

### method
POST

### body
email: string
password: string

### success response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFiZTQyZGJjNWMyZTdkNjgxNmI5Y2YiLCJlbWFpbCI6InRlc3QyQG1haWwuY29tIiwiaWF0IjoxNTc4ODg2MjgwfQ.w-qLIg_OaHQxHi-bbFMI7Ttn2kDhBwCjEhHfkErCUZ4",
    "userId": "5e1be42dbc5c2e7d6816b9cf"
}
```

### error response

```json
"Email and password combination is invalid"
```

<hr>

# todo

## create todo
### url
/todo

### method
POST

### header
token: access token string from login/register

### body
name: string
description: string [optional]
due_date: string("yyyy-mm-dd") or html input-date value

### success response

```json
{
    "todo": {
        "status": "unfinished",
        "_id": "5e1be5d0bc5c2e7d6816b9d2",
        "name": "todo test",
        "description": "desc test",
        "due_date": "2020-01-30T00:00:00.000Z",
        "user": "5e1be42dbc5c2e7d6816b9cf",
        "createdAt": "2020-01-13T03:36:48.856Z",
        "updatedAt": "2020-01-13T03:36:48.856Z",
        "__v": 0
    }
}
```

### error response
Without name

```json
"Todo validation failed: name: Must insert todo name"
```

Without due_date

```json
"Todo validation failed: due_date: Must specify due date"
```

<hr>

## get all todos
### url
/todo

### method
GET

### headers
token: access token from login/register

### success response

```json
{
    "todos": [
        {
            "status": "unfinished",
            "_id": "5e1be5d0bc5c2e7d6816b9d2",
            "name": "todo test",
            "description": "desc test",
            "due_date": "2020-01-30T00:00:00.000Z",
            "user": "5e1be42dbc5c2e7d6816b9cf",
            "createdAt": "2020-01-13T03:36:48.856Z",
            "updatedAt": "2020-01-13T03:36:48.856Z",
            "__v": 0
        }
    ]
}
```

### error response
Without token

```json
"Need authentication"
```

<hr>

## get one todo
### url
/todo/:id

### method
GET

### headers
token

### params
id: todo id string

### success response
```json
{
    "todo": {
        "status": "unfinished",
        "_id": "5e1be5d0bc5c2e7d6816b9d2",
        "name": "todo test",
        "description": "desc test",
        "due_date": "2020-01-30T00:00:00.000Z",
        "user": "5e1be42dbc5c2e7d6816b9cf",
        "createdAt": "2020-01-13T03:36:48.856Z",
        "updatedAt": "2020-01-13T03:36:48.856Z",
        "__v": 0
    }
}
```

### error response
Without token and invalid token

```json
"You are not authorized to perform this action"
```

Invalid todo id

```json
"Invalid todo id"
```

<hr>

## update one todo
### url
/todo/:id

### method
PATCH

### headers
token

### params
id: todo id string

### success response

```json
{
    "results": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```

### error response
Invalid todo id

```json
"Invalid todo id"
```

Without token and wrong invalid token

```json
"You are not authorized to perform this action"
```

<hr>

## delete one todo
### url
/todo/:id

### method
DELETE

### params
token

### success response

```json
{
    "results": {
        "status": "finished",
        "_id": "5e1be5d0bc5c2e7d6816b9d2",
        "name": "todo test",
        "description": "desc updated",
        "due_date": "2020-01-30T00:00:00.000Z",
        "user": "5e1be42dbc5c2e7d6816b9cf",
        "createdAt": "2020-01-13T03:36:48.856Z",
        "updatedAt": "2020-01-13T03:36:48.856Z",
        "__v": 0
    }
}
```

### error response
Without token and wrong invalid token

```json
"You are not authorized to perform this action"
```

Invalid todo id

```json
"Invalid todo id"
```

<hr>

# project

## create one project
### url
/project

### method
POST

### headers
token

### body
name: string

### success response

```json
{
    "project": {
        "users": [
            "5e1be42dbc5c2e7d6816b9cf"
        ],
        "todos": [],
        "_id": "5e1bea28bc5c2e7d6816b9d6",
        "name": "project test user test",
        "createdAt": "2020-01-13T03:55:20.563Z",
        "updatedAt": "2020-01-13T03:55:20.563Z",
        "__v": 0
    }
}
```

### error response
Without token

```json
"You are not authorized to perform this action"
```

<hr>

## get all projects belong to a user logging in
### url
/project

### method
GET

### headers
token

### success response

```json
{
    "projects": [
        {
            "users": [
                "5e1be42dbc5c2e7d6816b9cf"
            ],
            "todos": [],
            "_id": "5e1bea28bc5c2e7d6816b9d6",
            "name": "project test user test",
            "createdAt": "2020-01-13T03:55:20.563Z",
            "updatedAt": "2020-01-13T03:55:20.563Z",
            "__v": 0
        }
    ]
}
```

### error response
Without token

```json
"Need authentication"
```

<hr>

### get one project
### url
/project/:id

### headers
token

### params
id: project id string

### success response

```json
{
    "project": {
        "users": [
            "5e156f5ca6bfff63fdda7198",
            "5e15942c110ab61166bff202"
        ],
        "todos": [
            {
                "status": "unfinished",
                "_id": "5e1ba98f5198742a55ced5c0",
                "name": "todo4",
                "description": "desc4",
                "due_date": "2020-01-30T00:00:00.000Z",
                "user": "5e15942c110ab61166bff202",
                "createdAt": "2020-01-12T23:19:43.836Z",
                "updatedAt": "2020-01-12T23:19:43.836Z",
                "__v": 0,
                "project": "5e1ba84d5198742a55ced5bf"
            },
            {
                "status": "unfinished",
                "_id": "5e1baa815198742a55ced5c3",
                "name": "todo4",
                "description": "desc4",
                "due_date": "2020-01-30T00:00:00.000Z",
                "user": "5e15942c110ab61166bff202",
                "createdAt": "2020-01-12T23:23:45.704Z",
                "updatedAt": "2020-01-12T23:23:45.704Z",
                "__v": 0,
                "project": "5e1ba84d5198742a55ced5bf"
            }
        ],
        "_id": "5e1ba84d5198742a55ced5bf",
        "name": "project2 user user1",
        "createdAt": "2020-01-12T23:14:21.945Z",
        "updatedAt": "2020-01-12T23:14:21.945Z",
        "__v": 0
    }
}
```

### error response
Without token

```json
"Need authentication"
```

Invalid token

```json
"You are not authorized to perform this action"
```

<hr>

## update one project
### url
/project/:id

### headers
token (must be as the owner of the project)

### params
id: project id string

### success response



### error response
Without token

```json
"Need authentication"
```

Using token not as an owner

```json
"You are not the owner of this project"
```

<hr>

## generate project token for inviting another user to the project
### url
/project/:id

### headers
token (must be as the owner of the project)

### params
id: project id string

### body
email: string

### success response

```json
{
    "project_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiI1ZTFiYTg0ZDUxOTg3NDJhNTVjZWQ1YmYiLCJlbWFpbCI6Im1haWwzQG1haWwuY29tIiwiaWF0IjoxNTc4ODcwOTk1fQ.wYor2FGgqkqL7o9mQJoCCrmTUJ4EPQwsNlNuyCHz990"
}
```

### error response
Without token

```json
"Need authentication"
```

Using token not as an owner of the project

```json
"You are not the owner of this project"
```

<hr>

## user joining a project
### url
/project/user_join

### headers
token: normal sign in token
project_token: project token is obtained from the owner of a project

### success response

```json
{
    "results": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```

### error response
Without token

```json
"Need authentication"
```

The user joining the same group they have already joined

```json
{
    "message": "User already joined the project group"
}
```

The user using project token that is made not for them

```json
"Your project token is invalid"
```

<hr>

## remove user from a project
### url
/project/remove_user/:id

### headers
token (as owner)

### params
id: project id string

### body
email: email string, the email of the user that the owner wants to remove from the project

### success response

```json
{
    "results": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```

## add a todo to the project
### url
/project/add_todo/:id

### headers
token (as an owner or member of the project)

### params
id: project id string

### body
todoId: todo id that the user wish to add into project

### success response

```json
{
    "results": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    },
    "updateTodoResults": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```

### error response
Not as a member or owner of the target project

```json
"You are not authorized to perform this action"
```

Adding same todo to the project

```json
"Cannot add the same todo into this project"
```

<hr>

## remove todo from a project
### url
/project/remove_todo/:id

### headers
token

### params
id: project id string

### body
todoId: the todo id that user wish to remove from the project

### success response

```json
{
    "results": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    },
    "updateTodoResults": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```

### error response
Removing a todo that is not in the project to begin with

```json
"The todo is not in this project"
```
