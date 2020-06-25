# fancy-todo


## Usage app client
1. Visit https://fancy-todo.dzakki.com/
2. Login or Register 
3. welcome


## Usage app server

### run in your computer
```
$ npm install
$ npm start
$ npm run dev    
```
access the API via local `http://localhost:3000/api` or server `https://dz-fancy-todo.herokuapp.com/api`

## doc api

### User

* default output when server error
    * 500 
    ```
    {
        "message": "internal server error"
    }  
    ```

#### signupr/Create
* Method:  `POST`
* URL:  `/auth/signup`
* body: `username=[string]*`, `password=[string]*`
* Output
    * 201 
        ```
        {
            "user": {
                "_id": "5e1ae2289c4e3f62187486d5",
                "username": "dzakki1",
                "password": "$2b$08$Lnum77Dzf6/v8k2SRf9fmOZw6QtNS3aQSnWnn4vM.xEklwNdw/gDW",
                "__v": 0
            }
        }
        ```
    * 422 
        ```
        {
            "message": "User validation failed: username: Username is required, password: Password is required"
        }  
        ```
#### signin
* Method:  `POST`
* URL:  `/auth/signin`
* body: `username=[string]*`, `password=[string]*`
* Output
    * 201 
        ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFhZTIyODljNGUzZjYyMTg3NDg2ZDUiLCJpYXQiOjE1Nzg4MjAxNDd9.mQooe7VfcozstEdVRVvgFE_2qJJzzXV1w2Rb0bPZb5M"
        }
        ```
    * 422 
        ```
        {
            "message": "username / password incorrect"
        }
        ```

#### github

* Method:  `POST`
* URL:  `/auth/github`
* body: `code=[string]*`
* Output
    * 201 
        ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFhZTIyODljNGUzZjYyMTg3NDg2ZDUiLCJpYXQiOjE1Nzg4MjAxNDd9.mQooe7VfcozstEdVRVvgFE_2qJJzzXV1w2Rb0bPZb5M"
        }
        ```

### Project

* Headers
    ```
        {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFhZTIyODljNGUzZjYyMTg3NDg2ZDUiLCJpYXQiOjE1Nzg4MjAxNDd9.mQooe7VfcozstEdVRVvgFE_2qJJzzXV1w2Rb0bPZb5M"
        }
    ```
* Default error when token is not exist
    * 404
        ```
        {
            "message": "Token not found"
        }  
        ```
* Default error when token is not match
    * 422
        ```
        {
            message: 'token is not valid'
        }  
        ```

#### create
* Method:  `POST`
* URL:  `/projects`
* body: `name=[string]*`, `description=[string]`, `members=[arraysOfIdMember]`
* Output
    * 201 
        ```
        {
            "project": {
                "members": [
                    "5e19e7aac623e853bb7a20e4"
                ],
                "todos": [],
                "_id": "5e1b58149b39297bb6db2e81",
                "name": "reporting",
                "description": "Membuat aplikasi reporting",
                "owner": "5e19e7aac623e853bb7a20e4",
                "__v": 0
            }
        }
        ```
    * 422 
        ```
        {
            "message": "Project validation failed: name: Name is required"
        }  
        ```

#### find All
* Method:  `GET`
* URL:  `/projects`
* Output
    * 200
        ```
        {
            "projects": [
                {
                    "members": [
                        {
                            "_id": "5e1b53642dd5a97399e5a88b",
                            "username": "dzakki"
                        },
                        {
                            "_id": "5e1b52e92dd5a97399e5a88a",
                            "username": "adam"
                        }
                    ],
                    "todos": [],
                    "_id": "5e1b53712dd5a97399e5a88c",
                    "name": "API ",
                    "description": "",
                    "owner": {
                        "_id": "5e1b53642dd5a97399e5a88b",
                        "username": "dzakki"
                    },
                    "__v": 0
                }
            ]
        }
        ```

#### get
* Method:  `GET`
* URL:  `/projects/:projectId`
* Output
    * 200
        ```
        {
            "project": {
                "members": [
                    {
                        "_id": "5e1b53642dd5a97399e5a88b",
                        "username": "dzakki"
                    },
                    {
                        "_id": "5e1b52e92dd5a97399e5a88a",
                        "username": "adam"
                    }
                ],
                "todos": [],
                "_id": "5e1b53712dd5a97399e5a88c",
                "name": "API ",
                "description": "",
                "owner": {
                    "_id": "5e1b53642dd5a97399e5a88b",
                    "username": "dzakki"
                },
                "__v": 0
            }
        }
        ```
    * 404 
        ``` 
        {
             message: 'id not found'
        }
        ```
#### update
* Method:  `PUT`
* URL:  `/projects/:projectId`
* body: `name=[string]*`, `description=[string]`, `members=[arraysOfIdMember]`
* output   
    * 200
        ```
        {
            "project": {
                "n": 1,
                "nModified": 0,
                "ok": 1
            }
        }
        ```
    * 404 
        ``` 
        {
             message: 'id not found'
        }
        ```
