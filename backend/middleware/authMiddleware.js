const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const pool = require('../config/database')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const promisePool = pool.promise()
        const [rows,fields] = await promisePool.query('SELECT * FROM users WHERE uid = ?',decoded.id)
        console.log(rows)
        if(rows.length==1){
            req.user = rows[0]
            delete req.user.password
        }else {
            res.status(401)
            throw new Error('Not authorized')
        }
            
        next()
        } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }