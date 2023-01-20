# Oops! API
Oops! is a project made for those who usually forget there daily tasks or chores. it is a website that stores a user's to-dos! The project was made using MongoDB, ReactJS, ExpressJS and Bootstrap.

## API routes
Here are the API endpoints: <br />

### Auth routes
Login => POST to /login. <br />
Register => POST to /register (password must have 1 special character, 1 number, 1 capital letter and be longer than 7). <br />
To change your password => POST to /change-password. <br />
To logout => GET to /logout. <br/>

### To-do Routes
*All the following routes requires authentication.
Create => POST to /todo/create. <br />
Get all todo => GET to /todo/. <br />
Get one todo => Get to /todo/:id. <br />
To update a todo => PUT to /todo/:id. <br />
To delete one todo => DELETE to /todo/:id. <br /> 

### User Routes 
Get all users => GET to /user/. <br />
Get one user => GET to /user/:id. <br />
To update a nickname => PUT to /user/:id/nickname. <br />
To update a user => PUT to /user/:id. <br />
To delete a user => DELETE to /user/:id <br />

## Frontend
You can find the frontend of the app in this [repository](https://github.com/vinicgoulart/todofront)!<br />

