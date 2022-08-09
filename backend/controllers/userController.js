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
    
    const promisePool = pool.promise();
    // query database using promises
    let query = "INSERT INTO blood_donation.users (first_name,last_name,email,password) VALUES(?);"
  
    try {
        const [rows,fields] = await promisePool.query(query,[values]);
       
        const [user,fields2 ] = await promisePool.query("SELECT * FROM users WHERE uid = ?",
            rows.insertId
        )
        
        res.status(201).json({
            uid : user[0].uid,
            first_name : user[0].first_name,
            last_name : user[0].last_name,
            email: user[0].email,
            token : generateToken(user[0].uid, 0)
        })
    } catch (error) {
       
        res.status(400).json({'Error message': error.message})
    }
})


const registerAdmin = asyncHandler(async (req, res) => {

    let { first_name,last_name,email,password,secret } = req.body

    if (!first_name ||!last_name ||  !email || !password || !secret) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    if(secret != "admin")
    {
        res.status(400)
        throw new Error('Wrong Admin Secret')
    }

  // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
    values = [first_name,last_name,email,hashedPassword, 1]
    
    const promisePool = pool.promise();
    // query database using promises
    let query = "INSERT INTO blood_donation.users (first_name,last_name,email,password,is_admin) VALUES(?);"
  
    try {
        const [rows,fields] = await promisePool.query(query,[values]);
       
        const [user,fields2 ] = await promisePool.query("SELECT * FROM users WHERE uid = ?",
            rows.insertId
        )
        
        res.status(201).json({
            uid : user[0].uid,
            first_name : user[0].first_name,
            last_name : user[0].last_name,
            email: user[0].email,
            is_admin: user[0].is_admin,
            token : generateToken(user[0].uid, 1)
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


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Check for user email
  const promisePool = pool.promise()
  const [user, fields] = await promisePool.query(
    "SELECT * FROM users WHERE email = ?",
    email
  )
  //console.log(user)
  if (user.length == 1 && (await bcrypt.compare(password, user[0].password))) {
    res.status(200).json({
      uid: user[0].uid,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
      email: user[0].email,
      is_admin: user[0].is_admin,
      token: generateToken(user[0].uid, user[0].is_admin),
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  let user = req.user
  // delete user.is_admin
  // delete user.a_id
  res.status(200).json(req.user)
})




// Generate JWT
const generateToken = (id, is_admin) => {
    return jwt.sign({ id, is_admin}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const getUser = asyncHandler(async (req, res) => {
    try {
        const promisePool = pool.promise()
        const [user, fields] = await promisePool.query(
          "SELECT * FROM users WHERE uid = ?",
          req.params.id
        )
        console.log(user[0].a_id)
         res.status(200).json({
           uid: user[0].uid,
           first_name: user[0].first_name,
           last_name: user[0].last_name,
           email: user[0].email,
           //is_admin: user[0].is_admin,
           //token: generateToken(user[0].uid, user[0].is_admin),
         })
        
    } catch (error) {
        res.status(400).json({ "Error message": error.message })
    }
})

const getDonor = asyncHandler(async (req, res) => {
    const promisePool = pool.promise()
    try {
        const [user, fields] = await promisePool.query(
          "Select * from users INNER JOIN donor where users.uid = donor.uid and donor.uid = ?",
          req.params.id,
        )
        if(user.length!= 1){
            res.status(401).json({"message": "donor not found"})
        }
        const [address,field] = await promisePool.query("select * from address where a_id=?",user[0].a_id)
        delete user[0].password
        delete user[0].is_admin
        delete user[0].a_id
        user[0].adress = address[0]
       res.json(user[0])
    } catch (error) {
        res.status(400).json({ "Error message": error.message })
    }
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    registerDonor,
    registerAdmin,
    getDonor,
    getUser
}