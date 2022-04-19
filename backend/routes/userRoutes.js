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


// will be deleted later
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM users;', function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'users' : results})
    });
})

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


