# Fancy Todo

### Getting Started

If you want to used this API & Client you need to run this in your terminal

```
//install dependencies
$ npm install

//install dev dependencies for dotenv
$ npm install -D dotenv

// running the server
$ npm run dev
```

Access the API via `http://localhost:3000/`

##### POST  `/users/register`

```json

```

##### POST  `/users/login`

```

```

##### GET  `/todos/`

```

```

##### POST  `/todos/

```

```

##### GET `/todos/{id}`

```

```

##### PUT  `/todos/{id}`

```

```

##### PATCH `/todos/{id}`

```

```



### Error Handling

------

- ##### 400

  ```json
  {
  	message:'Invalid Token'
  }
  ```

- ##### 403

  ```json
  {
  	code: 403,
      status: 'Forbidden',
      message: 'You Don\'t have access to this Todo'
  }
  ```

- ##### 404

  ```json
  {
  	code: 404,
  	status: 'Not Found',
  	message: 'Cannot find Todos with Id : {todo id}'
  
  }
  ```

  

- ##### 500

  ```json
  {
  	message : 'Internal Sever Error'
  }
  ```

  