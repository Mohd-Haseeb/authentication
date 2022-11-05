require('dotenv').config();  // first import .env and then call the express

const express = require('express')

const User = require('./model/user')

const app = express()


app.get('/', (req, res, next) => {
    res.status(200).send('<h1>HOME page</h1>')
})


app.post('/signup', async (req, res, next) => {
    const {firstName, lastName, email, password } = req.body


    if (!(firstName && lastName && email && password)){
        res.status(400).send('All fields are required!!!')
    };

    // geting user details
    const user = await User.findOne(email)

    // checking if user exists or not
    if (user){
        res.status(400).send("User already exists!!!!")
    };

    // password encryption
    



})









module.exports = app