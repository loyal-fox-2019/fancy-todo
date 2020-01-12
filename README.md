# fancy-todo

### Prerequisites : 
- npm
- nodejs
- .env 
    - JWTSECRET= secret for jsonwebtoken
    - GOOGLE_CLIENTID=882572495044-msr1s7rppis0s9dgqpq8nte8sn3e5heh.apps.googleusercontent.com
    - DEFAULT_PASSWORD= default password for creating user with google OAuth

### User : 
- Base URL : 
    - ```localhost:3000/user```
- Routes : 
    - ``` /signin ```
        - method : ```POST```
        - returns a jwt token when successful
        - success :
            - status : ```200```
            - response :
                ```
                {
                    token
                }
                ```
        - errors : 
            - Invalid email : 
                - status : ```400```
                - response :
                    ```
                    {
                        "message": "User doesn't exist"
                    }
            - Wrong password : 
                - status : ```400```
                - response :
                    ```
                    {
                        "message": "Wrong password"
                    }
    
    - ``` /signup ```
        - method : ```POST```
        - creates new user when successful
        - body : 
            - username `String` _required_
            - password `String` _required_
            - name `String`
        - success :
            - status : ```200```
            - response :
                ```
                {
                    "message": "created User",
                    "newUser": {
                        "_id": "5e1b9c1ba5d9d92b496b9357",
                        "email": "petra@mail.com",
                        "password": "$2b$08$CCON1MMtYNzF.ERPf5RR4ukU.BRk15e4EMJQlIgj3QVRqbB19YLk6",
                        "name": "Petra",
                        "__v": 0
                    }
                }
                ```
        - errors : 
            - Email already registered : 
                - status : ```409```
                - response :
                    ```
                    {
                        "message": "email already exist"
                    }
            - Uncomplete form : 
                - status : ```400```
                - required : username & password
                - response :
                    ```
                    {
                    "message": {
                        "password": {
                            "message": "Path `password` is required.",
                            "name": "ValidatorError",
                            "properties": {
                                "message": "Path `password` is required.",
                                "type": "required",
                                "path": "password"
                            },
                            "kind": "required",
                            "path": "password"
                        }
                    }
            - Cannot create admin account : 
                - status : ```400```
                - response :
                    ```
                    {
                        "message : "Can't create account with email admin"
                    }
### Todo : 
- Base URL : 
    - ```localhost:3000/todo```
- Routes : 
    - ``` / ```
        - method : ```GET```
        - returns json of user's todos
        - success :
            - status : ```200```
            - response :
                ```
                [
                    {
                        "owner": [
                            "jpetra123"
                        ],
                        "status": false,
                        "_id": "5e1a10e8a8fca25e1ca8c961",
                        "title": "Bikin fancy todo punya jovi1234",
                        "description": "BIkin fancy todo, deadline hari senin",
                        "due_date": "2020-01-13T00:00:00.000Z",
                        "__v": 0
                    },
                    {
                        "owner": [
                            "jpetra123"
                        ],
                        "status": false,
                        "_id": "5e1a17c1e5e8c963a792a0e7",
                        "title": "Bikin fancy todo ownernya udah array",
                        "description": "BIkin fancy todo, deadline hari senin",
                        "due_date": "2020-01-13T00:00:00.000Z",
                        "__v": 0
                    },
                    {
                        "owner": [
                            "jpetra123"
                        ],
                        "status": false,
                        "_id": "5e1b579cb0d44671ce26e903",
                        "title": "Bikin fancy todo ownernya udah array testerr",
                        "description": "BIkin fancy todo, deadline hari senin",
                        "due_date": "2020-01-13T00:00:00.000Z",
                        "__v": 0
                    }
                ]
                ```
        - errors : 
            - Token invalid or unavailable : 
                - status : ```400```
                - response :
                    ```
                    {
                        "message": "User doesn't exist"
                    }
            - Wrong password : 
                - status : ```400```
                - response :
                    ```
                    {
                        "message": "invalid token"
                    }
    
    - ``` / ```
        - method : ```POST```
        - creates new todo when successful
        - body : 
            - title `String`_required_ 
            - description `String`_required_ 
            - due_date `Date`
            - status `Bool` _required_
        - success :
            - status : ```201```
            - response :
                ```
                {
                    "message": "created todo",
                    "newTodo": {
                        "owner": [
                            "jovi@mail.com"
                        ],
                        "status": false,
                        "_id": "5e1b9fbea5d9d92b496b9359",
                        "title": "Bikin tugas",
                        "description": "BIkin fancy todo, deadline hari senin",
                        "due_date": "2020-01-13T00:00:00.000Z",
                        "__v": 0
                    }
                }
                ```
        - errors : 
            - Uncomplete form : 
                - status : ```400```
                - response :
                    ```
                    {
                    "message": {
                        "title": {
                            "message": "Path `title` is required.",
                            "name": "ValidatorError",
                            "properties": {
                                "message": "Path `title` is required.",
                                "type": "required",
                                "path": "title"
                            },
                            "kind": "required",
                            "path": "title"
                        }
                    }
    - ``` /:_id ```
        - method : ```PUT```
        - edits a todo when successful
        - params : 
            - _id : todo's ObjectId 
        - success :
            - status : ```201```
            - response :
                ```
                {
                    "message": "updated todo",
                    "response": {
                        "n": 1,
                        "nModified": 1,
                        "ok": 1
                    }
                }
        - errors : 
            - Invalid id : 
                - status : ```400```
                - response :
                    ```
                    {
                        "message": "Todo not found"
                    }
    - ``` /:_id ```
        - method : ```GET```
        - return a json of one todo when sucessful
        - params : 
            - _id : todo's ObjectId 
        - success :
            - status : ```200```
            - response :
                ```
                {
                    "owner": [
                        "jpetra123"
                    ],
                    "status": false,
                    "_id": "5e1a10e8a8fca25e1ca8c961",
                    "title": "Bikin fancy todo updatedd",
                    "description": "Bikin fancy todo, deadline hari senin",
                    "due_date": "2020-01-13T00:00:00.000Z",
                    "__v": 0
                }
        - errors : 
            - Invalid id : 
                - status : ```400```
                - response :
                    ```
                    {
                        "message": "Todo not found"
                    }