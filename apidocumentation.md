### <u>Shema</u>

All API access is over HTTP, and accessed from `http://localhost:3000`. All data is received as JSON.

### <u>Authentication</u>

```
headers: {
  token: TOKEN
}
```

# REST API

### <u>Register User</u>

*return user name and token*

* **URL**

  /user

* **Method**

  `POST`

* **Data params**

  ```
  data: {
   name: string,
   email: email@format.com,
   password: string,
  }
  ```

  

* **Success Response**

  * Code: 201
    Content:  

    ```
    {
        "name": "string",
        "token": 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJpYXQiOjE1Nzg0NTY3NjR9.9o07hDjQFPvYuni2r44NX9KzMZNOc2TdbtimrF4CaNg"
    }
    ```

* **Error Response**

  * Code: 404
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

    List of validation errors:

    | Error                                                | Description                        |
    | ---------------------------------------------------- | ---------------------------------- |
    | Name cannot be blank                                 | name is required                   |
    | Email cannot be blank                                | email is required                  |
    | Password cannot be blank                             | password is required               |
    | Please enter correct email address                   |                                    |
    | Your password should be at least 6 characters        | Password must be 6 - 12 Characters |
    | The maximum of your password length is 12 characters | Password must be 6 - 12 Characters |

    

* **Sample Call**

  ```
  $.ajax({
    url: "/user",
    method: 'post'
    data: {
    	name: 'string',
    	email: 'string@mail.com',
    	password: 'password123',
    }
  });
  ```

### <u>Login User</u>

*return user name and token*

* **URL**

  /user/login

* **Method**

  `POST`

* **Data params**

  ```
  data: {
   email: email@format.com,
   password: string,
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    {
        "name": "string",
        "token": 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJpYXQiOjE1Nzg0NTY3NjR9.9o07hDjQFPvYuni2r44NX9KzMZNOc2TdbtimrF4CaNg"
    }
    ```

* **Error Response**

  * Code: 403
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

    List of validation errors:

    | Error                       | Description                                                  |
    | --------------------------- | ------------------------------------------------------------ |
    | Email or password is wrong! | When user input wrong email / password, or email is not registered yet |

    

* **Sample Call**

  ```
  $.ajax({
    url: '/user/login',
    method: 'post',
    data: {
    	email: 'string@mail.com',
    	password: 'password123',
    }
  });
  ```

### <u>Create Todo</u>

*return created todo's info*

* **URL**

  /todos

* **Method**

  `POST`

* **Data params**

  *due_date format: MM/DD/YYYY*

  ```
  data: {
   name: 'How to create API Doc',
   description: 'I have to learn how to make proper api documentation',
   due_date: "11/01/2020"
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 201
    Content:  

    ```
    {
        "_id": "5e155d5026d3435f306da693",
        "name": "How to create API doc",
        "description": "I have to learn how to make proper api documentation",
        "due_date": "2020-10-31T17:00:00.000Z",
        "userId": "5e1556bc26d3435f306da68a",
        "projectId": null,
        "createdAt": "2020-01-08T04:40:48.272Z",
        "updatedAt": "2020-01-08T04:40:48.272Z",
        "status": 0,
        "__v": 0
    }
    ```

* **Error Response**

  * Code: 400
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

    List of validation errors:

    | Error                                                        | Description                                            |
    | ------------------------------------------------------------ | ------------------------------------------------------ |
    | Cast to Date failed for value \"Invalid Date\" at path \"due_date\" | This error message appear because due_date is empty    |
    | name cannot be blank                                         | this error message appear because name is empty        |
    | description cannot be blank                                  | this error message appear because description is empty |

    

* **Sample Call**

  ```
  $.ajax({
    url: '/todos',
    method: 'post',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
    data: {
   	name: 'How to create API Doc',
   	description: 'I have to learn how to make proper api documentation',
   	due_date: "11/01/2020",
    },
  });
  ```



### <u>Get Todo</u>

*return  todos list*

* **URL**

  /todos

* **Method**

  `GET`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    [
        {
            "_id": "5e155d5026d3435f306da693",
            "name": "How to create API doc",
            "description": "I have to learn how to make proper api documentation",
            "due_date": "2020-10-31T17:00:00.000Z",
            "userId": "5e1556bc26d3435f306da68a",
            "projectId": null,
            "createdAt": "2020-01-08T04:40:48.272Z",
            "updatedAt": "2020-01-08T04:40:48.272Z",
            "status": 0,
            "__v": 0
        }
    ]
    ```

* **Error Response**

  * Code: 401
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

    List of validation errors:

    | Error             | Description                                             |
    | ----------------- | ------------------------------------------------------- |
    | You have to login | This error message appear because user is not logged in |

    

* **Sample Call**

  ```
  $.ajax({
    url: '/todos',
    method: 'get',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
  });
  ```



### <u>Delete Todo</u>

*return delete information*

* **URL**

  /todos/:todoId

* **Method**

  `DELETE`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
    ```

* **Error Response**

  * Code: 401
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

    List of validation errors:

    | Error             | Description                                             |
    | ----------------- | ------------------------------------------------------- |
    | You have to login | This error message appear because authentication failed |
    | Action denied     | This error message appear because authorization failed  |

    

* **Sample Call**

  ```
  $.ajax({
    url: '/todos/5e1593058784ee7fa2741099',
    method: 'delete',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
  });
  ```



### <u>Mark Todo as done</u>

*return todo information*

* **URL**

  /todos/:todoId/done

* **Method**

  `PATCH`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
        "_id": "5e1593058784ee7fa2741099",
        "name": "How to create API doc untuk delete",
        "description": "I have to learn how to make proper api documentation",
        "due_date": "2020-10-31T17:00:00.000Z",
        "userId": "5e1556bc26d3435f306da68a",
        "projectId": null,
        "createdAt": "2020-01-08T08:29:57.587Z",
        "updatedAt": "2020-01-08T08:29:57.587Z",
        "status": 0,
        "__v": 0
    }
    ```

* **Error Response**

  * Code: 401
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

    List of validation errors:

    | Error             | Description                                             |
    | ----------------- | ------------------------------------------------------- |
    | You have to login | This error message appear because authentication failed |
    | Action denied     | This error message appear because authorization failed  |

    

* **Sample Call**

  ```
  $.ajax({
    url: '/todos/5e1593058784ee7fa2741099/done',
    method: 'PATCH',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
  });
  ```

### <u>Mark Todo as undone</u>

*return todo information*

* **URL**

  /todos/:todoId/undone

* **Method**

  `PATCH`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
        "_id": "5e1593058784ee7fa2741099",
        "name": "How to create API doc untuk delete",
        "description": "I have to learn how to make proper api documentation",
        "due_date": "2020-10-31T17:00:00.000Z",
        "userId": "5e1556bc26d3435f306da68a",
        "projectId": null,
        "createdAt": "2020-01-08T08:29:57.587Z",
        "updatedAt": "2020-01-08T08:29:57.587Z",
        "status": 1,
        "__v": 0
    }
    ```

* **Error Response**

  * Code: 401
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

    List of validation errors:

    | Error             | Description                                             |
    | ----------------- | ------------------------------------------------------- |
    | You have to login | This error message appear because authentication failed |
    | Action denied     | This error message appear because authorization failed  |

    

* **Sample Call**

  ```
  $.ajax({
    url: '/todos/5e1593058784ee7fa2741099/undone',
    method: 'PATCH',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
  });
  ```

### <u>Update Todo</u>

*return todo information*

* **URL**

  /todos/:todoId/undone

* **Method**

  `PUT`

* **Data params**

  *due_date format: MM/DD/YYYY*

  ```
  data: {
    name: 'new name',
    description: 'new description',
    due_date: '15/01/2020',
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
        "_id": "5e1593058784ee7fa2741099",
        "name": "new name",
        "description": "new description",
        "due_date": "2020-01-31T17:00:00.000Z",
        "userId": "5e1556bc26d3435f306da68a",
        "projectId": null,
        "createdAt": "2020-01-08T08:29:57.587Z",
        "updatedAt": "2020-01-08T08:45:57.198Z",
        "status": 0,
        "__v": 0
    }
    ```

* **Error Response**

  * Code: 401
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

    List of validation errors:

    | Error             | Description                                             |
    | ----------------- | ------------------------------------------------------- |
    | You have to login | This error message appear because authentication failed |
    | Action denied     | This error message appear because authorization failed  |

    

* **Sample Call**

  ```
  $.ajax({
    url: '/todos/5e1593058784ee7fa2741099/',
    method: 'PUT',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
    data: {
      name: 'new name',
      description: 'new description',
        due_date: '15/01/2020',
    }
  });
  ```



### <u>Create project</u>

*return project information*

* **URL**

  /projects

* **Method**

  `POST`

* **Data params**

  ```
  data: {
    name: 'My first project',
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 201
    Content:  

    ```
    {
        "members": [
            "5e1556bc26d3435f306da68a"
        ],
        "_id": "5e159ff648999d151aadb814",
        "name": "My first project",
        "__v": 0
    }
    ```

* **Error Response**

  * Code: 401
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

    List of validation errors:

    | Error                        | Description                                             |
    | ---------------------------- | ------------------------------------------------------- |
    | You have to login            | This error message appear because authentication failed |
    | Project name cannot be blank | This error message appear because project name is empty |

    

* **Sample Call**

  ```
  $.ajax({
    url: '/projects',
    method: 'POST',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
    data: {
      name: 'My first project',
    }
  });
  ```

### <u>GET project</u>

*return project information*

* **URL**

  /projects

* **Method**

  `GET`

* **Data params**

  none

* **Success Response**

  * Code: 200
    Content:  

    ```
    [
        {
            "members": [
                {
                    "_id": "5e1556bc26d3435f306da68a",
                    "name": "string",
                    "email": "email@format.com",
                    "__v": 0
                }
            ],
            "_id": "5e159ff648999d151aadb814",
            "name": "My first project",
            "__v": 0
        }
    ]
    ```

* **Error Response**

  * Code: 500

* **Sample Call**

  ```
  $.ajax({
    url: '/projects',
    method: 'GET',
  });
  ```

### <u>Add member to a project</u>

*return project information*

* **URL**

  /projects/:projectId/addmember

* **Method**

  `PATCH`

* **Data params**

  ```
  data: {
    usersId: ['5e15a2d245ad4c3e711f10a5'],
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    {
        "message": "User added to project"
    }
    ```

* **Error Response**

  * Code: 404
    Content:

    ```
    {
        "errors": [
            "Cannot find project"
        ]
    }
    ```

  * Code: 401
    Content:

    ```
    {
        "errors": [
            "You have to login"
        ]
    }
    ```

  * Code: 401
    Content:

    ```
    {
        "errors": [
            "Unauthorized"
        ]
    }
    ```

    

* **Sample Call**

  ```
  $.ajax({
    url: '/projects/5e159ff648999d151aadb814/addmember',
    method: 'PATCH',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
    data: {
      usersId: ['5e15a2d245ad4c3e711f10a5'],
    }
  });
  ```

### <u>Create Todo in a project</u>

*return todo information*

* **URL**

  /projects/:projectId/addtodo

* **Method**

  `POST`

* **Data params**

  *due_date format: MM/DD/YYYY*

  ```
  data: {
   name: 'How to create todo in a project',
   description: 'I have to learn',
   due_date: "11/01/2020"
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 201
    Content:  

    ```
    {
        "_id": "5e15a620ea2fd549aaef8f54",
        "name": "How to create todo in a prject",
        "description": "I have to learn",
        "due_date": "2020-10-31T17:00:00.000Z",
        "userId": "5e1556bc26d3435f306da68a",
        "projectId": "5e159ff648999d151aadb814",
        "createdAt": "2020-01-08T09:51:28.635Z",
        "updatedAt": "2020-01-08T09:51:28.635Z",
        "status": 0,
        "__v": 0
    }
    ```

* **Error Response**

  * Code: 404
    Content:

    ```
    {
        "errors": [
            "Cannot find project"
        ]
    }
    ```

  * Code: 401
    Content:

    ```
    {
        "errors": [
            "You have to login"
        ]
    }
    ```

  * Code: 401
    Content:

    ```
    {
        "errors": [
            "Unauthorized"
        ]
    }
    ```

    

* **Sample Call**

  ```
  $.ajax({
    url: '/projects/5e159ff648999d151aadb814/addtodo',
    method: 'POST',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
    data: {
      name: 'How to create todo in a project',
      description: 'I have to learn',
      due_date: "11/01/2020"
    },
  });
  ```

### <u>GET project details</u>

*return project information*

* **URL**

  /projects/:projectId

* **Method**

  `GET`

* **Data params**

  node

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
        "project": {
            "members": [
                {
                    "name": "string",
                    "__v": 0
                },
                {
                    "name": "string masuk project",
                    "__v": 0
                }
            ],
            "_id": "5e159ff648999d151aadb814",
            "name": "My first project",
            "__v": 0
        },
        "todos": [
            {
                "_id": "5e15a620ea2fd549aaef8f54",
                "name": "How to create todo in a prject",
                "description": "I have to learn",
                "due_date": "2020-10-31T17:00:00.000Z",
                "userId": "5e1556bc26d3435f306da68a",
                "projectId": "5e159ff648999d151aadb814",
                "createdAt": "2020-01-08T09:51:28.635Z",
                "updatedAt": "2020-01-08T09:51:28.635Z",
                "status": 0,
                "__v": 0
            }
        ]
    }
    ```

* **Error Response**

  * Code: 404
    Content:

    ```
    {
        "errors": [
            "Cannot find project"
        ]
    }
    ```

  * Code: 401
    Content:

    ```
    {
        "errors": [
            "You have to login"
        ]
    }
    ```

  * Code: 401
    Content:

    ```
    {
        "errors": [
            "Unauthorized"
        ]
    }
    ```

    

* **Sample Call**

  ```
  $.ajax({
    url: '/projects/5e159ff648999d151aadb814/',
    method: 'GET',
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw",
    },
  });
  ```

### 



