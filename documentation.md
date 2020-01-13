### <u>Access</u>

API accessed from `http://localhost:3000`

### <u>Run App</u>

make sure you have live server, express, nodemon installed
```
npm run dev
```


### <u>Environment</u>

```
MONGO_URI = 
JWT_TOKEN = 
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
DEFAULT_PASSWORD = 
OPENWEATHER_API = 
```

### <u>Authentication</u>

```
headers: {
  token: token
}
```

# REST API

### <u>Register User</u>


* **URL**

  /user

* **Method**

  `POST`

* **Data params**

  ```
  data: {
   name: string,
   email: String,
   password: string,
  }
  ```

    List of user validation errors:

    | Error                                                | Description                        |
    | ---------------------------------------------------- | ---------------------------------- |
    | Name                                                 | name is required                   |
    | Email                                                | email is required                  |
    | Password                                             | password is required               |
    | Please enter valid email address                     |                                    |

### <u>Login User</u>

*returns token*

* **URL**

  /user/login

* **Method**

  `POST`

* **Data body**

  ```
  data: {
   email: email@format.com,
   password: string,
  }
  ```

* **Data returns**

  ```
  {
    token: "BASDFBKAHDBFHABD"
  }
  ```

### <u>Create Todo</u>

*return created todo's info*

* **URL**

  /todo

* **Method**

  `POST`

* **Data body**

  *due_date format: YYYY-MM-DD*

  ```
  data: {
   title: 'API',
   subtitle: 'learn API'
   description: 'I have to study more',
   due_date: "2020-01-16",
   status: false,
   weather: light rain (generated)
  }
  ```

* **Data headers**

  ```
  {
    token: "abfnbdnb"
  }
  ```


### <u>Get Todo</u>

*return  todos list*

* **URL**

  /todo

* **Method**

  `GET`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "ASHDGKHJsgdkjhgKH"
  }
  ```    


### <u>Delete Todo</u>

*return delete information*

* **URL**

  /todo/:todoId

* **Method**

  `DELETE`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eabcde"
  }
  ```

### <u>Update Todo</u>

*return todo information*

* **URL**

  /todos/:todoId

* **Method**

  `PATCH`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "abcdjfsl"
  }
  ```
 