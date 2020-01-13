# FANCY TODO App
#### API Documentation  
----------

## List of Routes

List of basic routes:

| Route       | HTTP | Header(s) | Body                                                       | Description              | Return Data |
| ----------- | ---- | --------- | ---------------------------------------------------------- | ------------------------ | ----- | 
| /user/register | POST | null      | name : STRING, email : STRING, password : STRING | Register a new user | status:201, message, data: {name,email,password} |
| /user/login  | POST | null      | email : STRING, password : STRING                     | User Login | status: 200, message, token |
| /user/google  | POST | null      | Google Account                    | User Login using google account | tatus: 200, message, token |



List of todos routes:

| Route          | HTTP   | Header(s) | Body                                      | Description                  | Return data |
| -------------- | ------ | --------- | ----------------------------------------- | ---------------------------- | ------------|
| /todos     | GET    | token     | null                                      | Get all User's Todo List     | status: 200, message, data: [array of todos] |
| /todos/:id | GET    | token     | null                                      | Get a single User's todo            | status: 200, message, data: {single todo} |
| /todos     | POST   | token     | title : STRING, description : STRING, due_date: STRING | Add a Todo data for User    | status: 201, message |
| /todos/:id | DELETE | token     | null                                      | Delete a Todo data for User | status: 200, message |
| /todos/:id | PATCH  | token     | status: boolean | Update Todo data for User | status: 200, message |



## Usage
#### Tech Used
1. MongoDB
2. Mongoose
3. Express
4. Axios
5. Jsonwebtoken
6. GoogleAuth

Make sure you install all the tech above.

Make sure you have Node.js and npm installed in your computer:

```
$ npm install
```
### You can run this app using this command
```
$ npm run dev
```
#### Client running on PORT 8080
#### Access API via http://localhost:3000