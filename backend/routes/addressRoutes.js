const express = require("express");
const router =  express.Router()
const pool = require('../config/database')
const {insertAddress} = require('../controllers/addressController')

const { protect} = require('../middleware/authMiddleware')

router.post('/',async (req,res)=>{
    console.log(req.body)
    a_id = await insertAddress(Object.keys(req.body),Object.values(req.body))
    pool.query("SELECT * FROM address WHERE a_id = ?", a_id, (err,result,fields)=>{
        if(err)
            res.status(401).json({"Error message": err.message})
        res.status(201).json({'address': result})
    })
})

router.get('/me-address', protect, async (req,res)=>{
    let user = req.user
    console.log(user.a_id)
    pool.query("SELECT * FROM address WHERE a_id = ?", user.a_id, (err,result,fields)=>{
        if(err)
            res.status(401).json({"Error message": err.message})
        res.status(201).json({'address': result})
    })
})

module.exports = router