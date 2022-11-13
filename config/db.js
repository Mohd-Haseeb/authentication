// connecting to database

const mongoose = require('mongoose')

const {MONGO_URL} = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser :true,
        useUnifiedTopology : true
    })
    .then(
        console.log('DB CONNECTED SUCCESSFULLY...')
    )
    .catch(err => {
        console.log('DB CONNECTION FAILED');
        console.log(err);
        process.exit(1)
    })
    
}