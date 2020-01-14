# fancy-todo
### base URL server:
https://fancyserver.amilhasbala.com

**Register User**
----
  Returns json data about newly register user.

* **URL**

  /user/register

* **Method:**

  `POST`

* **Data Params**

  &nbsp; email: STRING
  &nbsp; password: STRING

* **Success Response:**

  * **Code:** 201 <br />
    ```javascript
        {
            "isGoogle": false,
            "_id": "5de0ae689fab012045e0948e",
            "email": "bbb@mail.com",
            "password": "$2b$10$6wmSQU41NW7iC1AvWmNhtO4atYb1QX5oTUDy0QdvWNFBStTVWQIIq",
            "__v": 0
        }
    ```
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    ```javascript
    {
        "message": [
            "Please enter your name.",
            "Please enter your email address.",
            "Email already registered"
            "Please enter your password."
        ]
    }
    ```

* **Sample Call:**

  ```javascript
        axios({
          method: 'POST',
          url: `/user/register`,
          data: {
            email: user@mail.com,
            password: password
          }
        })
          .then(({ data }) => {
            this.$router.push('/products')
          })
          .catch(() => {
            this.$swal.fire(
              'Access Denied',
              'wrong email or password',
              'error'
            )
          })
  ```

**Login User**
----
  Returns json data about a single user.

* **URL**

  /users/login

* **Method:**

  `POST`

* **Data Params**

  email: STRING
  password: STRING

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmJiIiwiZW1haWwiOiJiYmJAbWFpbC5jb20iLCJpZCI6IjVkZTBhZTY4OWZhYjAxMjA0NWUwOTQ4ZSIsImlhdCI6MTU3NTAwNzE3NiwiZXhwIjoxNTc1MDkzNTc2fQ.1YSl0xcpDT_HxPUPjgp5I7HPH4Liezt-xFwFPROuQ24"
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:** 
    ```javascript
    {
        "message": "Invalid email or password."
    }
    ```

* **Sample Call:**

  ```javascript
        axios({
          method: 'POST',
          url: `/user/login`,
          data: {
            email: user@email.com,
            password: password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            context.commit('LOGIN')
            context.dispatch('fetchUser')
            resolve()
          })
          .catch(err => {
            this.$swal.fire(
              'sumting wong',
              err,
              'error'
            )
            reject(err)
          })
  ```
