const app = require('./app')

const {PORT} = process.env

// connect with Db
require('./config/db').connect()


app.listen(3000, () => {
    console.log(`server is up and running on port ${PORT}!!!`);
});