# FANCY TODO LIST
#### A Fancy Way To Write Down Your List
---
**BASE URL**
> http://localhost:3000

**END POINTS**
No  | Route               | HTTP   | Authentication | Authorization
----|---------------------|--------|----------------|---------------
 1  | /api/users/register | POST   | No             | No
 2  | /api/users/login    | POST   | No             | No
 3  | /api/todos/         | POST   | Yes            | No
 4  | /api/todos/         | GET    | Yes            | Yes
 5  | /api/todos/:id      | GET    | Yes            | Yes
 6  | /api/todos/:id      | PUT    | Yes            | Yes 
 7  | /api/todos/:id      | PATCH  | Yes            | Yes
 8  | /api/todos/:id      | DELETE | Yes            | Yes
---
###1. POST /api/users/register
  > Add new user to users collections and returns JSON of token

* **URL**

  /api/users/register

* **Method:**

  `POST`

* **Data Params**
  name: [string] <_required_>
  email: [string] <_required_>
  password: [string] <_required, min-length:6, max-length:20_>

* **Success Response:**

  * **Code:** 201 CREATED
    **Content:** 
    ```javascript
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
    **Content:** 
    ```javascript
    {
      "code": 400,
      "message": [
          "Name cannot be empty",
          "Email cannot be empty",
          "Email already registered",
          "Password cannot be empty",
          "Password need to be at least 6 character!",
          "Password cannot exceed 20 character!"
      ]
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "api/users/register",
      type : "POST",
      data: {
        name: 'Jane Doe',
        email: 'janedoe@mail.com',
        password: '123456'
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

###2. POST /api/users/login
  > Check users collections and returns JSON of token when user found

* **URL**

  /api/users/login

* **Method:**

  `POST`

* **Data Params**
  email: [string] <_required_>
  password: [string] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```javascript
    {
      {
          "code": 404,
          "message": "Invalid Email or Password"
      }
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "api/users/login",
      type : "POST",
      data: {
        email: 'janedoe@mail.com',
        password: '123456'
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

###3. POST /api/todos/
  > Create todo with authenticated user as its owner and returns JSON of todo

* **URL**

  /api/todos/

* **Method:**

  `POST`

* **Data Params**

  title: [String] <_required_>
  description: [String]
  
* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 201 SUCCESS
    **Content:** 
    ```javascript
    {
      "status": "doing",
      "_id": "5e1a8d3c0f3b5b11115f2247",
      "title": "Ceate todo again",
      "description": "This is not the first todo created",
      "owner": "5e19dd336927961133d5e199",
      "createdAt": "2020-01-12T03:06:36.442Z",
      "updatedAt": "2020-01-12T03:06:36.442Z",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
    **Content:** 
    ```javascript
    {
      "code": 400,
      "message": [
        "Title cannot be empty"
      ]
    }
    ```
  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "api/todos/",
      type : "POST",
      data: {
        title: 'Take dog to walks',
        description: 'Take dog to walks to the park'
      },
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

###4. GET /api/todos/
  > Get all todos with authenticated user as its owner and returns JSON of todos

* **URL**

  /api/todos/

* **Method:**

  `GET`
  
* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    [
      {
        "status": "doing",
        "_id": "5e1a8933ddb1770f66621997",
        "title": "First todo",
        "description": "This is the first todo created",
        "owner": "5e19dd336927961133d5e199",
        "createdAt": "2020-01-12T02:49:23.923Z",
        "updatedAt": "2020-01-12T02:49:23.923Z",
        "__v": 0
      },
      {
        "status": "doing",
        "_id": "5e1a8d3c0f3b5b11115f2247",
        "title": "Ceate todo again",
        "description": "This is not the first todo created",
        "owner": "5e19dd336927961133d5e199",
        "createdAt": "2020-01-12T03:06:36.442Z",
        "updatedAt": "2020-01-12T03:06:36.442Z",
        "__v": 0
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "api/todos/",
      type : "GET",
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

###5. GET /api/todos/:id
  > Get specific todo based on its id with authenticated user as its owner and returns JSON of todo

* **URL**

  /api/todos/:id

* **Method:**

  `GET`
  
* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    {
      "status": "doing",
      "_id": "5e1a8933ddb1770f66621997",
      "title": "First todo",
      "description": "This is the first todo created",
      "owner": "5e19dd336927961133d5e199",
      "createdAt": "2020-01-12T02:49:23.923Z",
      "updatedAt": "2020-01-12T02:49:23.923Z",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```javascript
    {
      "code": 404,
      "message": "Todo is not found!"
    }
    ```

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "api/todos/5e1a8933ddb1770f66621997",
      type : "GET",
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

###6. PUT /api/todos/:id
  > Update specific todo based on its id with authenticated user as its owner and returns JSON of todo

* **URL**

  /api/todos/:id

* **Method:**

  `PUT`

* **Data Params:**

  title: [String] <_required_>
  description: [String]

* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    {
      "status": "doing",
      "_id": "5e1a8933ddb1770f66621997",
      "title": "First todo",
      "description": "This is the first todo created",
      "owner": "5e19dd336927961133d5e199",
      "createdAt": "2020-01-12T02:49:23.923Z",
      "updatedAt": "2020-01-12T02:49:23.923Z",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```javascript
    {
      "code": 404,
      "message": "Todo is not found!"
    }
    ```

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "api/todos/5e1a8933ddb1770f66621997",
      type : "GET",
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

###7. PATCH /api/todos/:id
  > Update status of specific todo based on its id with authenticated user as its owner and returns JSON of todo

* **URL**

  /api/todos/:id

* **Method:**

  `PATCH`

* **Data Params:**

  status: [String] <_required, enum['doing','done']_>  
* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    {
      "status": "doing",
      "_id": "5e1a8933ddb1770f66621997",
      "title": "First todo",
      "description": "This is the first todo created",
      "owner": "5e19dd336927961133d5e199",
      "createdAt": "2020-01-12T02:49:23.923Z",
      "updatedAt": "2020-01-12T02:49:23.923Z",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```javascript
    {
      "code": 404,
      "message": "Todo is not found!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "api/todos/5e1a8933ddb1770f66621997",
      type : "GET",
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```
  
###8. DELETE /api/todos/:id
  > Delete specific todo and returns JSON of recently deleted todo

* **URL**

  /api/todos/:id

* **Method:**

  `DELETE`
  
* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    {
      "status": "doing",
      "_id": "5e1a8933ddb1770f66621997",
      "title": "First todo",
      "description": "This is the first todo created",
      "owner": "5e19dd336927961133d5e199",
      "createdAt": "2020-01-12T02:49:23.923Z",
      "updatedAt": "2020-01-12T02:49:23.923Z",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "api/todos/5e1a8933ddb1770f66621997",
      type : "GET",
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```