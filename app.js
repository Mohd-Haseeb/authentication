require('dotenv').config();  // first import .env and then call the express

const express = require('express')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// importing cookie-parser to store and retrieve user cookies for validations
// this middleware directly injects the cokkie into the request
const cookieParser = require('cookie-parser')

// import User model
const User = require('./model/user')

const app = express()

// middleware to read json
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())

app.use(express.urlencoded({extended:true}));


// custom middlewares
const auth = require('./middleware/auth')


// using cookieParser as middleware
app.use(cookieParser())


app.get('/', (req, res) => {
    res.status(200).send('<h1>HOME page</h1>')
})


app.post('/signup', async (req, res) => {


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
        }, process.env.SECRET_KEY, {expiresIn : '2h'})



        createdUser.token = token

        // don't want to send the password
        createdUser.password = undefined

        res.status(200).json(createdUser)


    } catch (error) {
        console.log(error);
        console.log("Some error in the response!!!");
    }
    
});


app.post('/signin', async (req, res) => {

    try {
        
        // collecrt information from frontend
        const { email, password } = req.body

        if (!(email && password)){
            res.status(400).send("All details must be entered!!")
        }

        // get user details
        const user = await User.findOne({email})

        if (!user){
            res.send(400).send("User doesn't exist. Please register first!!!")
        }

        // NOTE ONE WAY OF COMPARING PASSWORD
        /*
        const encryptedPassword = await bcrypt.hash(password, 10) 
        
        if (!(user.password === encryptedPassword)){

        }
        */

        // ANOTHER WAY
        if (user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({
                id : user._id,
                email
            }, process.env.SECRET_KEY, {expiresIn:'2h'})

            user.password = undefined

            user.token = token

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true
            }

            res.status(200).cookie('token', token, options).json({
                success : true,
                token,
                user
            })

        }

        res.status(400).send("Password is incorrect!!!!")

    } catch (error) {
        
        console.log(error)

    }

});


app.get('/dashboard', async (req, auth, res) => {
    
    res.send('Welcome to Dashboard!!!')

});

app.get('/profile', async (req, auth, res) => {
    // access to req.user => _id

    // based on _id, we can query the particular user and get its detrails => findOne(_id)

    // send a response of user details
})



module.exports = app