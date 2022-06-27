const express = require("express");
const router =  express.Router()
const pool = require('../config/database')
const {insertAddress} = require('../controllers/addressController')
const {
    registerUser,
    loginUser,
    getMe,
    registerDonor,
    registerReciepent
} = require('../controllers/userController')
const { protect} = require('../middleware/authMiddleware')


// api/user/
router.post('/', registerUser)
router.post('/donor',registerDonor)
router.post('/recieve',registerReciepent)
router.post('/login', loginUser)
router.get('/me', protect, getMe)







// will be deleted later
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM users;', function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'users' : results})
    });
})





router.post('/user-update', (req,res)=>{
    console.log(req.body)
    const {first_name, last_name, blood_group, phone_no, email, a_id} = req.body
    pool.query('UPDATE users SET a_id=?, first_name=?, last_name=?, blood_group=?, phone_no=?  WHERE email=?', [a_id, first_name, last_name, blood_group, phone_no, email], function (error, results, fields) {
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


