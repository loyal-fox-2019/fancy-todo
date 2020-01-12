# fancy-todo

#### This app was build by Express and Mongoose

#### All routes must initially be given _http://localhost:3000_

List of user routes:

Route | HTTP | Header(s) | Body | Description
------|------|-----------|------|-------------
_user/register_ | **POST** | none | email, password | Create new user
_user/privateAuth_ | **POST** | none | email, password | Login with private Authentication to dashboard page
_user/openAuth_ | **POST"** | none | id_token | Login with open(google) Authentication to dashboard page
 
List of todo routes: 

Route | HTTP | Header(s) | Body | Description
------|------|-----------|------|-------------
_/todo_ | **GET**| usertoken | none | Get all list todo
_/todo_ | **POST** | usertoken | name,description,due_date | Create new todo
_/todo_  | **PUT**  | usertoken | todo_id | Update todo status to complete
_/todo_   | **DELETE** | usertoken | todo_id | Delete one todo

Make sure you have Node.js and npm installed in your computer, and then run these commands:

* $ npm install
* $ npm start
* $ npm run dev