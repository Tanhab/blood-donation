const express = require("express");
const router =  express.Router()
const pool = require('../config/database')
const {insertAdress} = require('../controllers/adressController')

const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)


router.get('/',(req,res)=>{
    pool.query('SELECT * FROM users;', function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'users' : results})
    });
})

// router.post('/',async (req,res)=>{
//     console.log(req.body)
//     keys = Object.keys(req.body)
//     console.log(keys)
//     values = Object.values(req.body)
//     values = values.map((item)=>{
//         if(isNaN(item))
//         return item
//         else 
//             return parseInt(item)
//     })
//     console.log(values)
//     const promisePool = pool.promise();
//     // query database using promises
//     let query = "INSERT INTO blood_donation.users (first_name,last_name,blood_group,a_id,phone_no) VALUES(?);"
//     try {
//         const [rows,fields] = await promisePool.query(query,[values]);
//         const [user,fields2 ] = await promisePool.query("SELECT * FROM users WHERE uid = ?",
//             rows.insertId
//         )
//         res.json({user})
//     } catch (error) {
//         res.status(400).json({'Error message': error.message})
//     }
    
// })

router.post('/adress',async (req,res)=>{
    console.log(req.body)
    a_id = await insertAdress(Object.keys(req.body),Object.values(req.body))
    pool.query("SELECT * FROM adress WHERE a_id = ?", a_id, (err,result,fields)=>{
        if(err)
            res.status(401).json({"Error message": err.message})
        res.status(201).json({'adress': result})
    })
})

module.exports = router


