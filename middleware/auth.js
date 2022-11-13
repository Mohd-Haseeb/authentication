const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {

    console.log(req.cookies)

    const {token} = req.cookies

    if (!token){
        return res.status(403).send('Token is missing. Access Denied!!!')
    }

    // verify token
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decode)

        // I am creating this new property 'user'
        req.user = decode

        // extract _id from token and query the db

    } catch (error) {
        console.log(error)
        res.status(403).send("Token is Invalid!!")
    }

    // moving forward after all the checks are done
    return next()
}

module.exports = auth