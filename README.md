# Fancy To-do

link deploy

---

**Create a User**

- **URL**
  <_/users/register_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `name=[string]` <br />
  `email=[string]` <br />
  `password=[string]`

  **Optional:**
  `avatar=[string]`
  
- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://{HOST}.com/users/register",
        "data": {
            "name": "Mona Lisa",
            "email": "mona@mail.com",
            "password": "PASSWORD",
            "avatar": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        }
    })
```

- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "_id": "5e186c14af790e1a58535cdd",
            "name": "Mona Lisa",
            "email": "mona@mail.com",
            "avatar": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            "createdAt": "2020-01-10T12:20:36.142Z",
            "updatedAt": "2020-01-10T12:20:36.142Z"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "This email mona@mail.com has already been used!" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "" }`

---

**Log In**

- **URL**
  <_/users/login_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `email=[string]` <br />
  `password=[string]`

- **Sample Request:**

  ```javascript
      axios({
          "method": "POST",
          "url": "http://{HOST}.com/users/login",
          "data": {
              "email": "nina@mail.com",
              "password": "PASSWORD"
          }
      })
  ```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTg2YzE0YWY3OTBlMWE1ODUzNWNkZCIsImVtYWlsIjoibW9uYUBtYWlsLmNvbSIsImlhdCI6MTU3ODY2MTYyNywiZXhwIjoxNTc4NjY1MjI3fQ.NvyFqTB0WE5ZXlhU-rC2IidPDucoJNISLK7pNhumRmk"
    }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Email and/or password incorrect" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Find user by email**

- **URL**
  <_/users/{email}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `email=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
  ```javascript
      axios({
          "method": "GET",
          "url": "http://{HOST}.com/users/john@mail.com",
          "headers": {
              "access_token": "YOUR_ACCESS_TOKEN"
          }
      })
  ```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "_id": "5e15fe2ed406f210996d4f6a",
        "name": "John Doe",
        "email": "john@mail.com",
        "avatar": "http://s3-eu-west-1.amazonaws.com/diy-magazine//diy/Artists/G/Girl-In-red/Girl-in-Red_-by-Chris-Almeida-1.png",
        "createdAt": "2020-01-08T16:07:10.388Z",
        "updatedAt": "2020-01-08T16:07:10.388Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "User not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all projects**

- **URL**
  <_/projects_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://{HOST}.com/projects",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "members": [
                {
                    "_id": "5e15fe2ed406f210996d4f6a",
                    "name": "Nana Nina",
                    "email": "nana@mail.com",
                    "avatar": "http://s3-eu-west-1.amazonaws.com/diy-magazine//diy/Artists/G/Girl-In-red/Girl-in-Red_-by-Chris-Almeida-1.png",
                    "createdAt": "2020-01-08T16:07:10.388Z",
                    "updatedAt": "2020-01-08T16:07:10.388Z"
                }
            ],
            "_id": "5e15ff16d406f210996d4f70",
            "name": "Nana's First Project",
            "user": "5e15fe2ed406f210996d4f6a",
            "tasks": [],
            "createdAt": "2020-01-08T16:11:02.596Z",
            "updatedAt": "2020-01-08T16:11:02.596Z"
        },
        {
            "members": [
                {
                    "_id": "5e15fe2ed406f210996d4f6a",
                    "name": "Nana Nina",
                    "email": "nana@mail.com",
                    "avatar": "http://s3-eu-west-1.amazonaws.com/diy-magazine//diy/Artists/G/Girl-In-red/Girl-in-Red_-by-Chris-Almeida-1.png",
                    "createdAt": "2020-01-08T16:07:10.388Z",
                    "updatedAt": "2020-01-08T16:07:10.388Z"
                }
            ],
            "_id": "5e15ff1fd406f210996d4f71",
            "name": "Nana's Second Project",
            "user": "5e15fe2ed406f210996d4f6a",
            "tasks": [
                {
                    "isDone": false,
                    "timeAllocation": 5,
                    "_id": "5e19974bdcc6b7242c12ba38",
                    "title": "Second Task",
                    "description": "This is my second task",
                    "dueDate": "2020-01-11T17:00:00.000Z",
                    "user": "5e15fe88d406f210996d4f6d"
                }
            ],
            "createdAt": "2020-01-08T16:11:11.525Z",
            "updatedAt": "2020-01-08T16:11:11.525Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Create a project**

- **URL**
  <_/projects_>

- **Method:**
  `POST`

- **URL Params** <br />
  `access_token=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params**
  **Required:**
  `name=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://{HOST}.com/projects",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "name": "January Marketing Campaign"
        }
    })
```
  
- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "members": [
                "5e15fe88d406f210996d4f6d"
            ],
            "_id": "5e19468dc748361b9ef3d923",
            "name": "January Marketing Campaign",
            "user": "5e15fe88d406f210996d4f6d",
            "tasks": [],
            "createdAt": "2020-01-11T03:52:45.389Z",
            "updatedAt": "2020-01-11T03:52:45.389Z"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Project's name is required" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Add a member to project**

- **URL**
  <_/projects/{id}/members_>

- **Method:**
  `POST`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  `access_token=[string]`

- **Data Params** <br />
  `email=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://{HOST}.com/projects/5e19468dc748361b9ef3d923/members",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "email": "mona@mail.com"
        }
    })
```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "members": [
                "5e15fe88d406f210996d4f6d",
                "5e186c14af790e1a58535cdd"
            ],
            "_id": "5e19468dc748361b9ef3d923",
            "name": "January Marketing Campaign",
            "user": "5e15fe88d406f210996d4f6d",
            "tasks": [],
            "createdAt": "2020-01-11T03:52:45.389Z",
            "updatedAt": "2020-01-11T08:33:45.285Z"
        }
    ```

- **Error Response:**
  - **Code:** 403 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found Request <br />
    **Content:** `{ error : "Project not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete a member from project**

- **URL**
  <_/projects/{id}/members/{email}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `id=[string]` <br />
  `email=[string]`

- **Request Headers** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "DELETE",
        "url": "http://{HOST}.com/projects/5e19468dc748361b9ef3d923/members/mona@mail.com",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "members": [
                "5e15fe88d406f210996d4f6d"
            ],
            "_id": "5e19468dc748361b9ef3d923",
            "name": "January Marketing Campaign",
            "user": "5e15fe88d406f210996d4f6d",
            "tasks": [],
            "createdAt": "2020-01-11T03:52:45.389Z",
            "updatedAt": "2020-01-11T08:46:38.713Z"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Can not delete project's owner" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found Request <br />
    **Content:** `{ error : "User not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Find a project**

- **URL**
  <_/projects/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://{HOST}.com/projects/5e19468dc748361b9ef3d923",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "members": [
                "5e15fe88d406f210996d4f6d"
            ],
            "_id": "5e19468dc748361b9ef3d923",
            "name": "January Marketing Campaign",
            "user": "5e15fe88d406f210996d4f6d",
            "tasks": [],
            "createdAt": "2020-01-11T03:52:45.389Z",
            "updatedAt": "2020-01-11T08:46:38.713Z"
        }
    ```

- **Error Response:**
  - **Code:** 403 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Resource not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete a project**

- **URL**
  <_/projects/{id}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "DELETE",
        "url": "http://{HOST}.com/projects/5e19468dc748361b9ef3d923",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "message": "Project with ID 5e15fec7d406f210996d4f6f successfully deleted"
        }
    ```

- **Error Response:**
  - **Code:** 403 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Resource not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Add task to a project**

- **URL**
  <_/projects/{id}/tasks_>

- **Method:**
  `POST`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `title=[string]`

  **Optional:**
  `description=[string]` <br />
  `timeAllocation=[number]` <br />
  `dueDate=[date]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://{HOST}.com/projects/5e19468dc748361b9ef3d923/tasks",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "title": "First Task",
            "description": "This is my first task",
            "dueDate": "2020-01-12T17:00:00.000Z",
            "timeAllocation": 3
        }
    })
```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "isDone": false,
            "timeAllocation": 3,
            "_id": "5e19974bdcc6b7242c12ba38",
            "title": "First Task",
            "description": "This is my first task",
            "dueDate": "2020-01-12T17:00:00.000Z",
            "user": "5e15fe88d406f210996d4f6d"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Please insert title for the task" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found />
    **Content:** `{ error : "Resource not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Find a task**

- **URL**
  <_/projects/{id}/tasks/{taskId}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `id=[string]` <br />
  `taskId=[string]`

- **Request Headers** <br />
  `access_token=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://{HOST}.com/projects/5e15febfd406f210996d4f6e/tasks/ 5e19974bdcc6b7242c12ba38",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "isDone": false,
            "timeAllocation": 3,
            "_id": "5e19974bdcc6b7242c12ba38",
            "title": "First Task",
            "description": "This is my first task",
            "dueDate": "2020-01-12T17:00:00.000Z",
            "user": "5e15fe88d406f210996d4f6d"
        }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Resource not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Edit a task**

- **URL**
  <_/projects/{id}/tasks/{taskId}_>

- **Method:**
  `PUT`

- **URL Params** <br />
  `id=[string]` <br />
  `taskId=[string]`

- **Request Headers** <br />
  `access_token=[string]`

- **Data Params** <br />
  **Optional:**
  `title=[string]` <br />
  `description=[string]` <br />
  `dueDate=[date]` <br />
  `timeAllocation=[number]`

- **Sample Request:**
```javascript
    axios({
        "method": "PUT",
        "url": "http://{HOST}.com/projects/5e15febfd406f210996d4f6e/tasks/ 5e19974bdcc6b7242c12ba38",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "title": "Second Task",
            "description": "This is my second task",
            "timeAllocation": 5,
            "dueDate": 2020/01/11
        }
    })
```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "isDone": false,
            "timeAllocation": 5,
            "_id": "5e19974bdcc6b7242c12ba38",
            "title": "Second Task",
            "description": "This is my second task",
            "dueDate": "2020-01-11T17:00:00.000Z",
            "user": "5e15fe88d406f210996d4f6d"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Minimum time allocation is 1" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Resource not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Update a task's status**

- **URL**
  <_/projects/{id}/tasks/{taskId}/done_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `id=[string]` <br />
  `taskId=[string]`

- **Request Headers** <br />
  `access_token=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "PUT",
        "url": "http://{HOST}.com/projects/5e15febfd406f210996d4f6e/tasks/done",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "isDone": done,
            "timeAllocation": 5,
            "_id": "5e19974bdcc6b7242c12ba38",
            "title": "Second Task",
            "description": "This is my second task",
            "dueDate": "2020-01-11T17:00:00.000Z",
            "user": "5e15fe88d406f210996d4f6d"
        }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Resource not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete a task**

- **URL**
  <_/projects/{id}/tasks/{taskId}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `id=[string]` <br />
  `taskId=[string]`

- **Request Headers** <br />
  `access_token=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "DELETE",
        "url": "http://{HOST}.com/projects/5e15febfd406f210996d4f6e/tasks/ 5e19974bdcc6b7242c12ba38",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "Task with ID 5e19974bdcc6b7242c12ba38 successfully deleted"
        }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Resource not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`