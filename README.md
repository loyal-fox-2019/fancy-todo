# Fancy Todo

## **Unique Feature**

Group Chat, Drag and Drop, Invitation

## **Register User**

Returns json data about newly register user.

- **URL**

  /user/register

- **Method:**

  `POST`

- **Data Params**

  &nbsp; name: STRING
  &nbsp; email: STRING
  &nbsp; password: STRING

- **Success Response:**

  - **Code:** 201 <br />
    ```javascript
        {
        "isGoogle": false,
        "_id": "5de401e04ff47e7e7d539435",
        "name": "Username",
        "email": "user@email.com",
        "password": "$2a$10$8S4ZHyFYKZmiO4enOcYpKOBnl5EY.utDcrdlSLTTs3zG5QdFMDcVS",
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    ```javascript
    {
        "error": "ValidationError",
        "message": "User validation failed: name: Path `name` is required., email: Path `email` is      required."
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/user/register`,
        method: `post`,
        data: {
            name: Username,
            email: user@email.com,
            password: `password`
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
  ```

## **Login User**

Returns json data about a single user.

- **URL**

  /users/signin

- **Method:**

  `POST`

- **Data Params**

  email: STRING
  password: STRING

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript 
    {   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzUyMjM5Nzl9.YbHSsgEs84-KLr9sVH-ZAWhkwvlZ5BUEm8-EpMpZmso", 
        "userId": "5de401e04ff47e7e7d539435", 
        "userEmail": "user@email.com" }
    ```

- **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    {
        "error": "TypeError",
        "message": "Cannot read property '_id' of null"
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/user/login`,
        method: `post`,
        data: {
            email: akupadamu@mail.com
            password: tiadadustadiantarakita
        }
    })
  ```

## **Sign In Google User**

Returns json data about a single user.

- **URL**

  /user/google

- **Method:**

  `POST`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`

* **Sample Call:**

  ```javascript
  $.ajax({
    url: `${baseURL}/user/google`,
    method: "post",
    data: {
      token: id_token
    }
  }).done(({ token, name }) => {
    console.log(token, name);
  });
  ```
## **Get Todo**

Returns json data about all todo.

- **URL**

  /todo

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript 
    [
        {
            "_id": "5de2703854a51a1e810a6f1d",
            "name": "makan bubur",
            "description": "kamseng",
            "status": 0,
            "dueDate": "1997-12-28T00:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "5de2704e54a51a1e810a6f1e",
            "name": "Masak",
            "description": "Masak nasi goreng",
            "status": 0,
            "dueDate": "2019-01-01T00:00:00.000Z",
            "__v": 0
        }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/todo`,
        method: `get`
    })
  ```

  ## **Get Todo Detail**

Returns json data about a single todo.

- **URL**

  /todo/detail?id=

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript 
    [
        {
            "_id": "5de2703854a51a1e810a6f1d",
            "name": "makan bubur",
            "description": "kamseng",
            "status": 0,
            "dueDate": "1997-12-28T00:00:00.000Z",
            "__v": 0
        }
    ]
    ```
 **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    {
        "error": "CastError",
        "message": "Cast to ObjectId failed for value \"5de29ccf6c5dfb4b6c492af\" at path \"_id\" for model     \"Todo\""
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/todo/detail?id=`,
        method: `get`,
    })
  ```

    ## **Delete Todo**

Delete a todo and return JSON data.

- **URL**

  /todo

- **Method:**

  `DELETE`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**
    ```javascript 
    
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    
    ```
 **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        method:"delete",
        url:`http://localhost:3000/todo`,
        data:{id}
    })
  ```

## **Create Todo**

Create a todo and return JSON data.

- **URL**

  /todo

- **Method:**

  `POST`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**
    ```javascript 
    
    {
        "_id": "5de40ad5225c1b0bda23b4f5",
        "name": "task name",
        "description": "description",
        "status": false,
        "dueDate": "2019-02-11T17:00:00.000Z",
        "userId": "1",
        "__v": 0
    }
    
    ```
 **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    {
        "error": "ValidationError",
        "message": "Todo validation failed: name: Path `name` is required."
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        method: "post",
        url: "http://localhost:3000/todo",
        data: {
          name: $("#formTaskName").val(),
          description: $("#formTaskDescription").val(),
          dueDate: $("#formTaskDueDate").val(),
          userId,
          userEmail
        }
      })
  ```
  ## **Update Todo**

Update a todo and return JSON data.

- **URL**

  /todo

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**
    ```javascript 
    
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```
     **Error Response:**
    
  - **Code:** 403 Forbidden <br />
    **Content:**
  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```
  
- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/todo",
          data:{
              id,name,description,status,dueDate
          }
      })
  ```