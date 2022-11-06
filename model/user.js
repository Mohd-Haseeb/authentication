const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    firstName : {
        type : String,
        default : null
    },

    lastName : {
        type : String,
        default : null

    },

    email :{
        type : String,
        unique : true,
        required : [true, 'email must be entered']
    },

    password : {
        type : String
    },

    token : {
        type : String
    }

});

const User = mongoose.model('user', userSchema)

module.exports =  User;