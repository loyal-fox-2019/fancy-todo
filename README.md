# fancy-todo

**User Login**
----
  User login to app.

* **URL**

  /user/login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "message": "Login success",
    "data": {
        "username": "kirwan",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NTgwMzB9.vaDeHgjrJlpmyQL5Ud_fAVy7bGg1wBMR3Yv5j-nKE2s"
    }
}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
    "message": "Username/Password wrong"
}`

**User Register**
----
  User register to app.

* **URL**

  /user/register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "data": "admin@email.com",
    "message": "Successfully registered user"
}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
    "message": "User validation failed: username: Path `username` is required., password: Path `password` is required."
}`

 * **Code:** 404 <br />
    **Content:** `{
    "message": "Username already exist"
}`

 * **Code:** 404 <br />
    **Content:** `{
    "message": "User validation failed: username: Please fill a valid email address"
}`

**User GOOGLE Sign In**
----
  User sign in with google account to app.

* **URL**

  /user/googlesignin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
}`

**Create Todo**
----
  Create todo.

* **URL**

  /todo

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  {
      "name":
      "description":
      "due_date":
  }

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
}`

**Read Todo**
----
  Read all todo.

* **URL**

  /todo

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
}`

**Update Todo**
----
  Update todo.

* **URL**

  /todo/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   id:[String]

* **Data Params**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
}`

**Delete Todo**
----
  Delete todo.

* **URL**

  /todo/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   id:[String]

* **Data Params**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
}`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
}`
