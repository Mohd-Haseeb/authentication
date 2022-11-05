const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    firstName : {
        type : String,
        default : null
    },

    lastName : {
        type : String
    },

    email :{
        type : String,
        unique : true
    },

    password : {
        type : String
    },

    token : String

});

const User = mongoose.model('user', userSchema)

module.exports =  User;