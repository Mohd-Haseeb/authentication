const app = require('./app')

const {PORT} = process.env




app.listen(3000, () => {
    console.log(`server is up and running on port ${PORT}!!!`);
});