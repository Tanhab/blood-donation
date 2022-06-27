const express = require("express");
const router =  express.Router()
const {searchDonor} = require('../controllers/donationController')


const pool = require('../config/database')




router.get('/search',searchDonor)


module.exports = router

