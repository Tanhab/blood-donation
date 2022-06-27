const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const pool = require("../config/database")
const {insertAddress} = require('../controllers/addressController')
/** 
@desc    Register new user
@route   POST /api/users
@access  Public
*/
const registerUser = asyncHandler(async (req, res) => {
    let { first_name,last_name,email,password } = req.body

    if (!first_name ||!last_name ||  !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

  // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
    values = [first_name,last_name,email,hashedPassword]
    console.log(values)
    
    const promisePool = pool.promise();
    // query database using promises
    let query = "INSERT INTO blood_donation.users (first_name,last_name,email,password) VALUES(?);"
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
            token : generateToken(user[0].uid)
        })
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
})

// @desc    Register new donor
// @route   POST /api/users/donor
// @access  private
const registerDonor = asyncHandler(async (req, res) => {
    console.log(req.body)
    let { nid_birthCtf,uid,last_donated,blood_group,phone_no } = req.body
    let {building,village_road,post_office,city,district} = req.body
    console.log(building)

    if (!nid_birthCtf ||!uid ||  !last_donated || !blood_group || !phone_no || ! city || !district) {
        res.status(400)
        throw new Error('Please add all required fields')
    }
    console.log("register donor api called")
    console.log(req.body)
    // input adress and get its a_id
    validKey = ["building","village_road","post_office","city","district"]
    address = {}
    for (key in req.body){
        if (validKey.includes(key))
            address[key]=req.body[key]
    }
    
    try {
        a_id = await insertAddress(Object.keys(address),Object.values(address))
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
    
    if(typeof uid == "string") uid = parseInt(uid)
    if(typeof nid_birthCtf == "string") nid_birthCtf = parseInt(nid_birthCtf)
    if(phone_no && typeof phone_no == "string") phone_no = parseInt(phone_no)
    values = [nid_birthCtf,uid,last_donated,blood_group,phone_no,a_id ]
    
    const promisePool = pool.promise();
    // query database using promises
    let query = "INSERT INTO blood_donation.donor (`nid_birthCtf`,`uid`,`last_donated`,`blood_group`,`phone_no`,`a_id`) VALUES(?);"
    try {
        const [rows,fields] = await promisePool.query(query,[values]);
        const [donor,fields2 ] = await promisePool.query("SELECT * FROM donor WHERE nid_birthCtf = ?",
            nid_birthCtf
        )
        
        res.status(201).json({
            uid : donor[0].uid,
            nid_birthCtf : donor[0].nid_birthCtf,
            last_donated : donor[0].last_donated,
            phone_no: donor[0].phone_no,
            blood_group : donor[0].blood_group,
            a_id : donor[0].aid,
        })
    } catch (error) {
        
        res.status(400).json({'Error message ': error.message})
    }
})

// @desc    Register new reciever
// @route   POST /api/users/recieve
// @access  Private
const registerReciepent = asyncHandler(async (req, res) => {
    console.log(req.body)
    let { nid_birthCtf,uid,last_received,blood_group,phone_no } = req.body
    let {building,village_road,post_office,city,district} = req.body

    if (!nid_birthCtf ||!uid ||  !last_received || !blood_group || !phone_no || ! city || !district) {
        res.status(400)
        throw new Error('Please add all required fields')
    }
    
    // input adress and get its a_id
    validKey = ["building","village_road","post_office","city","district"]
    address = {}
    for (key in req.body){
        if (validKey.includes(key))
            address[key]=req.body[key]
    }
    
    try {
        a_id = await insertAddress(Object.keys(address),Object.values(address))
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
    if(typeof uid == "string") uid = parseInt(uid)
    if(typeof nid_birthCtf == "string") nid_birthCtf = parseInt(nid_birthCtf)
    if(phone_no && typeof phone_no == "string") phone_no = parseInt(phone_no)
    values = [nid_birthCtf,uid,last_received,blood_group,phone_no,a_id ]
    
    const promisePool = pool.promise();
    // query database using promises
    let query = "INSERT INTO blood_donation.recipient (`nid_birthCtf`,`uid`,`last_received`,`blood_group`,`phone_no`,`a_id`) VALUES(?);"
    try {
        const [rows,fields] = await promisePool.query(query,[values]);
        const [reciever,fields2 ] = await promisePool.query("SELECT * FROM recipient WHERE nid_birthCtf = ?",
            nid_birthCtf
        )
        
        res.status(201).json({
            uid : reciever[0].uid,
            nid_birthCtf : reciever[0].nid_birthCtf,
            last_received : reciever[0].last_received,
            phone_no: reciever[0].phone_no,
            blood_group : reciever[0].blood_group,
            a_id : reciever[0].aid,
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
    registerDonor,
    registerReciepent
}