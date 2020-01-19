# fancy-todo

**Base URL**
----

  http://localhost:3000

| Method | URL                          | Headers      | Data                                                                             | Description                                                                                   |
|--------|------------------------------|--------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| POST   | /users/register              | None         | username: string<br> email: string<br> password: string                          | Register a new user                                                                           |
| POST   | /users/login                 | None         | user: string<br> password: string                                                | Login an existing user using email or username                                                |
| POST   | /users/loginOAuth            | None         | token: string                                                                    | Login or register using Google OAuth2 service                                                 |
| POST   | /users/relog                 | token:string | None                                                                             | Get user data after page refresh                                                              |
| GET    | /todos/                      | token:string | None                                                                             | Get user's personal todo                                                                      |
| GET    | /todos/:projectId            | token:string | None                                                                             | Get project's todo that the user is a member of                                               |
| POST   | /todos                       | token:string | name:string<br> description:string<br>  due_date:date<br> project:ObjectId(opt.) | Create a new personal todo. If project is included, it will create a new project todo instead |
| PATCH  | /todos/:id                   | token:string | status:string                                                                    | Change a todo status from active to completed and vice versa                                  |
| DELETE | /todos/:id                   | token:string | None                                                                             | Delete a todo with the specified id                                                           |
| GET    | /projects                    | token:string | None                                                                             | Get projects detail that the user is a member of                                              |
| POST   | /projects                    | token:string | name:string                                                                      | Create a new project                                                                          |
| GET    | /projects/:projectId         | token:string | None                                                                             | Get a project detail that the user is a member of                                             |
| POST   | /projects/:projectId/:userId | token:string | userId:string                                                                    | Invite a user to a project                                                                    |
| DELETE | /projects/:projectId/:userId | token:string | userId:string                                                                    | Remove a user from a project                                                                  |
| DELETE | /projects/:projectId         | token:string | projectId:string                                                                 | Delete a project                                                                              |

**Register User**
----
  Register a new user and return JWT, user ID, and username.

* **URL**

  POST /users/register

* **Data Params**

  username=[string]<br />
  email=[string]<br />
  password=[string]  

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMWJhZDMyYWMxMjk3MDI1ZjcwYWQyNiIsInVzZXJuYW1lIjoiY2FybCIsImlhdCI6MTU3ODg3MjExNX0.maiKcTQvFo1ipLII-UKhpcQiX7JxceyrgIgdF_hnKQU",
    "id": "5e1bad32ac1297025f70ad26",
    "username": "carl"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    {"message": "Username is required\nEmail is required\nPassword is required\n"}
    ```


* **Sample Call:**

  ```javascript
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/users/register`,
    data: {
      username,
      email,
      password
    }
  })
  ```

**User Login**
----
  Login an existing user and return JWT, user ID, and username.

* **URL**

  POST /users/login
  
* **Data Params**

  user=[string]<br />
  password=[string]  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMWJhZDMyYWMxMjk3MDI1ZjcwYWQyNiIsInVzZXJuYW1lIjoiY2FybCIsImlhdCI6MTU3ODg3MjgxMH0.mUcdST6iVjSnhWqhuAKzMf8i4Uj54H9SJ-sC0lY1kL4",
    "id": "5e1bad32ac1297025f70ad26",
    "username": "carl"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    {"message": "Wrong credentials"}
    ```


* **Sample Call:**

  ```javascript
  $.ajax({
    method: 'POST',
    url: `${BASE_URL}/users/login`,
    data: {
      user: username || email,
      password
    }
  })
  ```
