# fancy-todo

### Before Using

Do this first before using this APP

```
// initialize npm
$ npm init -y

// install dependencies
$ npm install
$ npm install dotenv -dev

// run server
$ npm run dev
```

### Environment

```
PORT=
CLIENT_ID=
DEFAULT_PASS=
JWT_KEY=
WEATHER_API_KEY=
```

## Routes

### API Access

All API routes accessed from `http://localhost:3000`

### Register User

* **Route**

    `POST /user/register`

* **Data body**

    ```
    data: {
        name: string,
        email: string,
        password: string
    }
    ```

### Login User

* **Route**

    `POST /user/login`

* **Data body**

    ```
    data: {
        email: email@email.com,
        password: string
    }
    ```

* **Response**

    ```
    {
        token: "KasdkJHASKJDHafafishgi234824ut08fwu301ejqd"
    }
    ```

### Create Todo

* **Route**

    `POST /todos`

* **Data body**

    ```
    data: {
        name: "Todo",
        description: "Todo description"
        due_date: "2020-05-20"
    }
    ```

* **Data headers**

    ```
    {
        token: "KasdkJHASKJDHafafishgi234824ut08fwu301ejqd"
    }
    ```

### Get Todo

* **Route**

    `GET /todos`

* **Data headers**

    ```
    {
        token: "KasdkJHASKJDHafafishgi234824ut08fwu301ejqd"
    }
    ```

* **Response**

    ```
    [
        {
            _id: "Todo1 Id",
            name: "Todo1",
            description: "Todo1 description",
            status: false,
            due_date: "2020-02-23",
            user: {
                _id: "User Id",
                name: "User name",
                email: "User@mail.com"
            }
        }
    ]
    ```

### Update Todo

* **Route**

    `PATCH /todo`

* **Data body**

    ```
    data: {
        todoId: "todoId",
        newDone: true
    }
    ```

* **Data headers**

    ```
    {
        token: "KasdkJHASKJDHafafishgi234824ut08fwu301ejqd"
    }
    ```

### Delete Todo

* **Route**

    `DELETE /todo/:todoId`

* **Data headers**

    ```
    {
        token: "KasdkJHASKJDHafafishgi234824ut08fwu301ejqd"
    }
    ```
