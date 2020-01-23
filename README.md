# Todoose

# What packages used in this project?
```
axios (0.19.1)
bcrypt (3.0.7)
cors (2.8.5)
express (4.17.1)
google-auth-library (5.8.0)
jsonwebtoken (8.5.1)
mongoose (5.8.7)
dotenv (8.2.0) - Dev Dependencies
```

# Usage
## First thing to do
Clone this repository to your local computer by using this command
```
git clone https://github.com/harfialpharaby/fancy-todo.git
```
## Server side
Go to folder `server` and do all steps below :
1. Type command in terminal
```
npm i
```
2. Make a new file `.env` or rename `.env_template` and add this lines
```
CLIENT_ID=YOUR-CLIENT-ID-FROM-GOOGLE-OAUTH-FOR-localhost:5500
CLIENT_SECRET=YOUR-CLIENT-SECRET-FROM-GOOGLE-OAUTH-FOR-localhost:5500
OCR_KEY=YOUR-FREE-API-KEY-FROM-OCR-API
```
3. You are ready to go, type command in terminal
```
npm run dev
```

## Where I can get that FREE OCR KEY from OCR API?
* Here it comes, go to link below and follow the instruction to get free key, it's fast and simple.
```
https://ocr.space/OCRAPI
```

## Client side
1. Run the following command when you are on `client` folder
```
live-server --host=localhost --post=5500
```

# Server API Documentation
## Base Url to access API
```
http://localhost:3000/<route>
```

## Default Error Output
* Status: **500**
```
{
    "msg": "Internal Server Error"
}
```

## OAuth Login Google
* Route: `/oauth/login`
* Method: `POST`
* Body: `{idToken: google-id-token}`
* Output:
    * Status: **200**
    ```
    {
        "token": <YOUR TOKEN>
    }
    ```

## User
### Login
* Route: `/user/login`
* Method: `POST`
* Body: `{username: input_username_or_email, password: input_password}`
* Output:
    * Status: **200**
    ```
    {
        "token": <YOUR TOKEN>
    }
    ```
* Error Handler:
    * Status: **404**
    ```
        {
            "msg": "Incorrect username or password"
        }
    ```

### Register
* Route: `/user/register`
* Method: `POST`
* Body: `{username: input_username, email: input_email, password: input_password}`
* Output:
    * Status: **201**
    ```
    {
        "user": <registered user data with encrypted password>,
        "msg": "Registration Success"
    }
    ```
* Error Handler:
    * Status: **403**
    ```
        {
            "msg": "Email or username already exist"
        }
    ```

## Todo
### Get all todos info
* Route: `/todo/`
* Method: `GET`
* Headers: `{token: <user token>}`
* Output:
    * Status: **200**
    ```
    {
        "todos": [<all todos info>]
    }
    ```

### Get todo by id
* Route: `/todo/:id`
* Method: `GET`
* Headers: `{token: <user token>}`
* Params: `{id: <todo id>}`
* Output:
    * Status: **200**
    ```
    {
        "todos": [<all todos info>]
    }
    ```
### Get all todos by status
* Route: `/todo/:statusId`
* Method: `GET`
* Headers: `{token: <user token>}`
* Params: `{statusId: <status id>}`
* Output:
    * Status: **200**
    ```
    {
        "todos": [<all todos info>]
    }
    ```
### Add new todo
* Route: `/todo/`
* Method: `POST`
* Headers: `{token: <user token>}`
* Body: 
    ```
        {
            name: <todo name>,
            description: <todo description>,
            status: <status Id>,
            project: <project Id>,
            due_date: <due_date in date format>
        }
    ```
* Output:
    * Status: **201**
    ```
    {
        "createdTodo": <created todo info>
    }
    ```

### Update specific todo data by id
* Route: `/todo/:id`
* Method: `PUT`
* Headers: `{token: <user token>}`
* Params: `{id: <todo id>}`
* Body: (any of database keys below)
    ```
        {
            name: <todo name>,
            description: <todo description>,
            status: <status Id>,
            project: <project Id>,
            due_date: <due_date in date format>
        }
    ```
* Output:
    * Status: **200**
    ```
    {
        "updatedTodo": <updated todo info>
    }
    ```
* Error Handler:
    * Status: **404**
    ```
        {
            "msg": "Todo not found"
        }
    ```

### Update entire todo data by id
* Route: `/todo/:id`
* Method: `PATCH`
* Headers: `{token: <user token>}`
* Params: `{id: <todo id>}`
* Body: (please provide all data here)
    ```
        {
            name: <todo name>,
            description: <todo description>,
            status: <status Id>,
            project: <project Id>,
            due_date: <due_date in date format>
        }
    ```
* Output:
    * Status: **200**
    ```
    {
        "updatedTodo": <updated todo info>
    }
    ```
* Error Handler:
    * Status: **404**
    ```
        {
            "msg": "Todo not found"
        }
    ```

### Delete to by id
* Route: `/todo/:id`
* Method: `DELETE`
* Headers: `{token: <user token>}`
* Params: `{id: <todo id>}`
* Output:
    * Status: **200**
    ```
    {
        "deletedTodo": <deleted todo info>
    }
    ```

## Todo Status
### Get all statuses
* Route: `/status/`
* Method: `GET`
* Output:
    * Status: **200**
    ```
    {
        "statuses": [<all statuses data info>]
    }
    ```
### Add new status
* Route: `/status/`
* Method: `POST`
* Body: `{name: <status name>}`
* Output:
    * Status: **201**
    ```
    {
        "createdStatus": <created status info>
    }
    ```

## Projects
### Get all projects
* Route: `/projects/`
* Method: `GET`
* Output:
    * Status: **200**
    ```
    {
        "projects": [<all projects data info>]
    }
    ```
### Add new project
* Route: `/projects/`
* Method: `POST`
* Body: 
```
    {
        name: <project name>,
        description: <project description>,
        owner: <user id that own project>
    }
```
* Output:
    * Status: **201**
    ```
    {
        "createdProject": <created project info>
    }
    ```

## OCR image-to-text
### Detect text on image
* Route: `/ocr/`
* Method: `POST`
* Headers: `{apikey: <free ocr api key from web>}`
* Body: 
```
    {
        url: <image url>
    }
```
* Output:
    * Status: **2010**
    ```
    {
        "parsedText": <parsed text from image>
    }
    ```