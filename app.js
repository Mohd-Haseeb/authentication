require('dotenv').config();  // first import .env and then call the express

const express = require('express')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// import User model
const User = require('./model/user')

const app = express()

// middleware to read json
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())

app.use(express.urlencoded({extended:true}));


app.get('/', (req, res, next) => {
    res.status(200).send('<h1>HOME page</h1>')
})


app.post('/signup', async (req, res, next) => {


    try {
    

        // collecting information form body (user entered data from frontend form)  
        const { firstName, lastName, email, password } = req.body;


            // validating if the user has entered all the data
        if (!(firstName && lastName && email && password)) {
            res.status(400).send("All fields are required!!!");
        }

        // geting user details
        const user = await User.findOne({email});

        // checking if user exists or not (if user doesn't exists it will be an empty object)
        if (user) {
            res.status(400).send("User already exists!!!!");
        }

        // check if email format is correct

        // password encryption
        const encryptedPassword = await bcrypt.hash(password, 10)

        // create a new user in database
        const createdUser = await User.create({
            firstName,
            lastName,
            email,
            password:encryptedPassword
        })

        // create a token

        const token = jwt.sign({
            id : createdUser._id,
            email
        }, 'mysecretstring', {expiresIn : '2h'})



        createdUser.token = token

        // don't want to send the password
        createdUser.password = undefined

        res.status(200).json(createdUser)


    } catch (error) {
        console.log(error);
        console.log("Some error in the response!!!");
    }
    
})









module.exports = app