const express = require("express");
const router =  express.Router()
const pool = require('../config/database')
const {insertAddress} = require('../controllers/addressController')
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController')
const { protect} = require('../middleware/authMiddleware')


// api/user/
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)







// will be deleted later
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM users;', function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'users' : results})
    });
})

router.post('/address',async (req,res)=>{
    console.log(req.body)
    a_id = await insertAddress(Object.keys(req.body),Object.values(req.body))
    pool.query("SELECT * FROM address WHERE a_id = ?", a_id, (err,result,fields)=>{
        if(err)
            res.status(401).json({"Error message": err.message})
        res.status(201).json({'address': result})
    })
})

router.get("/auth", protect, (req, res) => {
    console.log("here")
    res.json(req.user);
  });


module.exports = router


