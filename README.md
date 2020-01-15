# Fancy Todo

A web app to keep track of your to-dos.

## Features
* Search, add, update and delete todos
* Sign in with your Google account - no password required!

## Models

### Todos
Attribute | Type
--- | ---
`name` | String
`description` | String
`due_date` | Date
`entered_date` | Date
`user` | MongoDB ObjectId


### Users
Attribute | Type
--- | ---
`username` | String
`password` | String
`login_type` | `"standard" | "google"`


## Server routes

### Todos

- View all todos (Authentication required)<br>
    `GET /api/todos`

- View one todo info (Authentication required)<br>
    `GET /api/todos/:id`

- Create new todo (Authentication required)<br>
    `POST /api/todos`

- Modify a todo (Authentication required)<br>
    `PUT /api/todos/:id`<br>
    `PATCH /api/todos/:id`<br>

- Delete a todo (Authentication required)<br>
    `DELETE /api/todos/:id`

### Users

- View one user info<br>
    `GET /api/users/:id`

- Create new user<br>
    `POST /api/users`

- Modify a user<br>
    `PUT /api/users/:id`<br>
    `PATCH /api/users/:id`<br>

- Delete a user<br>
    `DELETE /api/users/:id`