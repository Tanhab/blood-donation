const { Router } = require("express");
const express = require("express");
const router =  express.Router()
const pool = require('../config/database')
const {insertAddress} = require('../controllers/addressController')
const {
    registerUser,
    loginUser,
    getMe,
    registerDonor,
    registerAdmin,
    getDonor,
    getUser,
    getAllDonors
} = require('../controllers/userController')
const { protect} = require('../middleware/authMiddleware')


// api/user/
router.post('/', registerUser)
router.post('/admin', registerAdmin)
router.post('/donor',protect,registerDonor)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/donor/:id',protect,getDonor)
router.get('/donors',protect,getAllDonors)
router.get('/profile/:id',protect,getUser)







// will be deleted later
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM users;', function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'users' : results})
    });
})





router.post('/user-update', (req,res)=>{
    console.log(req.body)
    const {first_name, last_name, email} = req.body
    pool.query('UPDATE users SET first_name=?, last_name=?  WHERE email=?', [ first_name, last_name, email], function (error, results, fields) {
    if (error) 
       return res.status(401).json({"Error message": err.message})

    console.log(results)
    return res.status(200).json({ 'users' : results})
    });
})

router.get('/user-info', (req,res)=>{
    console.log(req.query)
    const {uid} = req.query
    console.log('inside user_info')
    pool.query('SELECT * FROM users WHERE uid = ?',[uid], function (error, results, fields) {
    if (error) 
       return res.status(401).json({"Error message": err.message})

    console.log(results)
    return res.status(200).json({ 'users' : results})
    });
})

router.get("/auth", protect, (req, res) => {
    res.json(req.user);
  });


module.exports = router


