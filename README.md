# FANCY TODO LIST
#### A Fancy Way To Write Down Your List
---
**BASE URL**
> http://localhost:3000

**END POINTS**
No  | Route               | HTTP | Authentication | Authorization
----|---------------------|------|----------------|---------------
 1  | /api/users/register | POST | No             | No
 2  | /api/users/login    | POST | No             | No
---
###1. POST /api/users/register
  > Add new user to users collections and return token

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
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
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