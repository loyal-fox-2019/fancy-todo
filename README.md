# fancy-todo

### REST API built with Express and Mogoose.

List of todo routes:

| Routes         | HTTP   | Header | Body                                                                     | Description               |
|----------------|--------|--------|--------------------------------------------------------------------------|---------------------------|
| /api/todos     | POST   | none   | name: String<br>description: String<br>due_date: Date<br>user_id: String | Create todo               |
| /api/todos     | GET    | none   | none                                                                     | Get all todos             |
| /api/todos/:id | DELETE | none   | none                                                                     | delete todo               |
| /api/todos/:id | PUT    | none   | name: String<br>description: String<br>due_date: Date<br>user_id: String | Update todo with new info |

List of user routes:

| Routes              | HTTP | Header | Body                                                    | Description         |
|---------------------|------|--------|---------------------------------------------------------|---------------------|
| /api/users/login    | POST | none   | email: String,<br>password: String                      | login               |
| /api/users/register | POST | none   | username: String,<br>email: String,<br>password: String | register a new user |

 **usage**

 Make sure you have Node.js and npm installed in your computer, and then run these commands:

 ```javascript
$ npm install
$ npm start
$ npm run dev
```

Access the API via http://localhost:3000/api.