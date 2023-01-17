require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

const todoRoute = require('./routes/todoRoute');
const authRoute = require('./routes/authenticationRoute');
const userRoute = require('./routes/userRoute');

app.use(express.json());

var oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false, maxAge: oneDay }
}));

app.use('/todo', todoRoute);
app.use('/user', userRoute);
app.use(authRoute);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.URI, () => {
    console.log('MongoDB connected');
});

app.listen(process.env.PORT, () => {
    
});
