const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const pool = require("../config/database")



// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    let { first_name,last_name,email,blood_group,phone_no,a_id,password } = req.body

    if (!first_name ||!last_name ||  !email || !blood_group || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

  // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
    if(typeof a_id == "string") a_id = parseInt(a_id)
    if(phone_no && typeof phone_no == "string") phone_no = parseInt(phone_no)
    values = [first_name,last_name,email,blood_group,a_id,phone_no,hashedPassword]
    console.log(values)
    
    const promisePool = pool.promise();
    // query database using promises
    let query = "INSERT INTO blood_donation.users (first_name,last_name,email,blood_group,a_id,phone_no,password) VALUES(?);"
    try {
        const [rows,fields] = await promisePool.query(query,[values]);
        const [user,fields2 ] = await promisePool.query("SELECT * FROM users WHERE uid = ?",
            rows.insertId
        )
        console.log(user)
        
        res.status(201).json({
            uid : user[0].uid,
            first_name : user[0].first_name,
            last_name : user[0].last_name,
            email: user[0].email,
            blood_group : user[0].blood_group,
            a_id : user[0].aid,
            token : generateToken(user[0].uid)
        })
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // Check for user email
    const promisePool = pool.promise()
    const [user,fields] = await promisePool.query('SELECT * FROM users WHERE email = ?',email)
    //console.log(user)
    if (user.length==1 && (await bcrypt.compare(password, user[0].password))) {
        res.json({
            uid : user[0].uid,
            first_name : user[0].first_name,
            last_name : user[0].last_name,
            email: user[0].email,
            blood_group : user[0].blood_group,
            a_id : user[0].aid,
            token : generateToken(user[0].uid)
        })
    } else {
        res.status(400)
       
        throw new Error('Invalid credentials')
    }
    })

    // @desc    Get user data
    // @route   GET /api/users/me
    // @access  Private
const getMe = asyncHandler(async (req, res) => {
    let user = req.user
    delete user.is_admin
   // delete user.a_id 
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}