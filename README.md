# fancy-todo

This website allows user to create, read, update and delete their to do lists. 

# Usage for Checking purposes
Make sure to install all the packages that are needed.
> npm install mongoose express bcrypt axios jsonwebtoken dotenv cors 

Run the server on
> http://localhost:3000
run nodemon app.js on folder server

And the client on
>http://localhost:8080
run live-server --host=localhost --port=8080 on folder client

# Routes
| Route | HTTP | Header | Body | Description|
| ----------- | ----------- |----------- |----------- | ----------- |
| /gSignIn | POST |null | Token|Sign in With Google| ----------- |
| /register | POST |null|username, email, password|Register to the website|
| /login | POST |null|username, password|Log in to the Website
| /| GET |Token, userId|username, password|Read all the user's todo (Authenticated)
| /create| POST |Token|name, description, due_date, status|Create To do (Authorized)
| /update:id| PUT |Token|name, description, due_date, status|Update user's To do (Authorized)
| /delete:id| DELETE |Token|null|Delete user's To do (Authorized)
| /getWeather| GET |Token|null|Get current's weather

# Important
Set these datas on file .env
JWT_SECRET=
WEATHER_APIKEY=
CLIENT_ID=
USER_PASSWORD=




   

