# fancy-todo

**Base URL:**

**User Routes:**

| Routes              | Method | Description                    |
|---------------------|--------|--------------------------------|
| /users/login        | POST   | Sign in / login User           |
| /users/register     | POST   | Sign Up / Register new user    |
| /users/login-google | POST   | Sign in using OAuth 2.0 Google |

**Todo Routes:**

| Routes            | Method | Description                  |
|-------------------|--------|------------------------------|
| /todos            | GET    | Find all Todo user           |
| /todos/one/:email | GET    | Find one Todo use email      |
| /todos            | POST   | Add new Todo                 |
| /todos/:id        | DELETE | Delete one todo with id todo |
| /todos/:id        | PUT    | Update todo with id todo     |
| /todos/:id        | PATCH  | Update checkTodo column      |

**Project Routes:**

| Routes              | Method | Description                  |
|---------------------|--------|------------------------------|
| /project            | GET    | Find all Project user        |
| /project/:id        | GET    | Find one Todo on project     |
| /project            | POST   | Add new Project              |
| /project            | DELETE | Delete project               |
| /project/:id        | DELETE | Delete todo on project       |
| /project            | PUT    | Update title project         |
| /project/:id        | PUT    | Update todo on project       |
| /project            | PATCH  | Plus project member          |
| /project/todo       | PATCH  | Create new Todo on project   |

**Errors:**

| Code | Name                          | Description                    |
|------|-------------------------------|--------------------------------|
| 401  | ValidationError               | error by validation database   |
| 401  | UnAuthorise                   | user not autorised             |
| 400  | CastError / JsonWebTokenError | error about token              |
| 404  | Not found                     | data not found                 |
| 500  | internal server error         | error by server                |

## **Register User**
- **URL:** `/users/register`
- **Method:** `POST`
- **URL Params:** `None` 
- **Data Body:** 
    -`email: user@mail.com`
    -`password: 123456`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
    {
    "message": "register success",
    "token": "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZmY3MjI4Y2M4ZjVmMTZhODE4ODMyMyIsImlhdCI6MTU3ODg1NzEwOX0.J0fUBa7Om--sn88jbfF-KaBOob-mWnR90z7PyKRPDmw",
    "user": {
        "email": "user@mail.com",
        "_id": "5dff7228cc8f5f16a8188323"
        }
    }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`401`**Content:**
    ```
        [
            'message' : 'Validation Error'
        ]
    ```

## **Login User**
- **URL:** `/users/login`
- **Method:** `POST`
- **URL Params:** `None` 
- **Data Body:** 
    -`email: user@mail.com`
    -`password: 123456`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
    {
    "message": "login success",
    "token": "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZmY3MjI4Y2M4ZjVmMTZhODE4ODMyMyIsImlhdCI6MTU3ODg1NzEwOX0.J0fUBa7Om--sn88jbfF-KaBOob-mWnR90z7PyKRPDmw",
    "user": {
        "email": "user@mail.com",
        "_id": "5dff7228cc8f5f16a8188323"
        }
    }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`404`**Content:**
    ```
        [
            'message' : 'not found'
        ]
    ```

## **Google Login User**
- **URL:** `/users/login-google`
- **Method:** `POST`
- **URL Params:** `None` 
- **Headers:** 
    -`id_token: ( token from google )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
    {
    "message": "login succes",
    "token": "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZmY3MjI4Y2M4ZjVmMTZhODE4ODMyMyIsImlhdCI6MTU3ODg1NzEwOX0.J0fUBa7Om--sn88jbfF-KaBOob-mWnR90z7PyKRPDmw",
    "user": {
        "email": "user@mail.com",
        "_id": "5dff7228cc8f5f16a8188323"
        }
    }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

## **Find All Todo**
- **URL:** `/todos`
- **Method:** `GET`
- **URL Params:** `None` 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
    [
    {
        "status": false,
        "_id": "5e1b727e2d7fd341940bb9a2",
        "title": "myTodo new ",
        "description": "private",
        "dueDate": "2020-02-01T00:00:00.000Z",
        "user": "5e188df3d4e92c04578b995f",
        "createdAt": "2020-01-12T19:24:46.405Z",
        "updatedAt": "2020-01-12T19:24:46.405Z",
        "__v": 0
    }
]
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```
