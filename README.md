# Simple-Todo
A simple todo web app for simplify your life.  
Use [NodeJs](https://nodejs.org/en/) as back-end, and [MongoDB](https://www.mongodb.com') as database.

## Base URL
By default, base url is at `http://localhost:3000`  
But you can change it by setting the [environment](## Setting up environment)

## Setting up environment
Make a file called `.env` and fill it with necessary environment such as:
* PORT
* MONGODB_URI
* JWT_SECRET

and put it on server folder.  
For references, check out [`.env-template` file](https://github.com/didadadida93/fancy-todo-1/blob/master/server/.env-template)

# Routes
#### `POST /login`
Route for user login.

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `email type: String` **required**
* `password type: String` **required**

response :
```js
// success
{
    "token": <token>,
    "username": <username>,
    "email": <email>
}

// error
{
    "errors": [
        "Email or password is wrong"
    ]
}
```

#### `POST /register`
Route for user register.

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `username type: String` **required**
* `email type: String` **required**
* `password type: String mininum 6 character` **required**

response :
```js
// success
{
    "token": <token>,
    "username": <username>,
    "email": <email>
}

// error
{
    "errors": [
        "Email already registered"
    ]
}
```

#### `GET /users/todos`
Route for user get their todos.

Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `token type: String` **required**

response :
```js
// success
{
  todos: [
      {
          "_id": <id>,
          "name": <name>,
          "description": <description>,
          "dueDate": <due date>,
          "status": <status>,
          "__v": 0
      },
      {
          "_id": <id>,
          "name": <name>,
          "description": <description>,
          "dueDate": <due date>,
          "status": <status>,
          "__v": 0
      }
  ]
}

// error
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `POST /users/todos`
Route for user create new todo for their own.

Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `token type: String` **required**

body request :
* `name type: String` **required**
* `description type: String`
* `dueDate type: Date` **required**

response :
```js
// success
{
    "message": "Todo created"
}

// error
{
    "errors": [
        "Cast to Date failed for value \"Invalid Date\" at path \"dueDate\"",
        "name is required"
    ]
}
```

#### `PATCH /users/todos/<:todoId>`
Route for user edit their todo.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `todoId type: String` **required**

body request :
* `name type: String`
* `description type: String`
* `dueDate type: Date`
* `status type: String` *enum: 'done', 'pending', or 'overdue'*

response :
```js
// success
{
    "message": "Todo edited"
}

// error
{
    "errors": [
        "Todo not found"
    ]
}
```

#### `DELETE /users/todos/<:todoId>`
Route for user delete their todo.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `todoId type: String` **required**

response :
```js
// success
{
    "message": "Todo deleted"
}

// error
{
    "errors": [
        "Todo not found"
    ]
}
```

#### `GET /users/projects`
Route for user get their projects.

Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `token type: String` **required**

response :
```js
// success
    [
      {
            "members": [
              <object member>
            ],
            "_id": <project_id>,
            "name": <project_name>,
            "owner": <object owner>,
            "todos": [
                <object todo>
            ],
            "__v": 0
        }
    ]

// error
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `POST /users/projects`
Route for use create new projects.

Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `token type: String` **required**

body request:
* `name: String` **required**

response :
```js
// success
{
  "message": "Project created"
}

// error
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `PATCH /projects/<:projectId>`
Route for user edit their projects.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `projectId type: String` **required**

body request :
* `name type: String` **required**

response :
```js
// success
{
  "message": "Project edited"
}

// error
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `DELETE /projects/<:projectId>`
Route for user delete their projects.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

response :
```js
// success
{
  "message": "Project deleted"
}

// error
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `POST /projects/<:projectId>/todos`
Route for user add new todo to their projects.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `projectId type: String` **required**

body request :
* `name type: String` **required**
* `description type: String`
* `dueDate type: Date` **required**

response :
```js
// success
{
  "message": "Todo project created"
}

// error
{
    "errors": [
        "token is missing"
    ]
}
```

#### `PATCH /projects/<:projectId>/todos/<:todoId>`
Route for user to change the todo that is in a projects.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `projectId type: String` **required**
* `todoId type: String` **required**

body request :
* `name type: String`
* `description type: String`
* `dueDate type: Date`
* `status type: String` *enum: 'done', 'pending', or 'overdue'*

response :
```js
// success
{
    "message": "Todo project edited"
}

// error
{
    "errors": [
        "token is missing"
    ]
}
```

#### `DELETE /projects/<:projectId>/todos/<:todoId>`
Route for user to delete todo that is in a projects.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `projectId type: String` **required**
* `todoId type: String` **required**

response :
```js
// success
{
  "message": "Todo project deleted"
}

// error
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `POST /projects/<:projectId>/members`
Route for user add member to their projects.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `projectId type: String` **required**

body request :
* `email type: String` **required**

response :
```js
// success
{
  "message": "Members added"
}

// error
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `DELETE /projects/<:projectId>/members/<:memberId>`
Route for user kick member from their projects.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `projectId type: String` **required**
* `memberId type: String` **required**

response :
```js
// success
{
  "message": "Member kicked"
}

// error
{
    "errors": [
        "Token is missing"
    ]
}
```
