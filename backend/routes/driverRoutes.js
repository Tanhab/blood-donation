const express = require("express");
const router =  express.Router()
const {
    getDriver,
    createDriver,
    getAllDriver,
    verifyDriver
} = require("../controllers/driverController")
const { protect } = require('../middleware/authMiddleware')
const { adminProtect } = require("../middleware/adminMiddleware")


router.get('/get/:id',protect, getDriver)
router.post('/',protect,createDriver)
router.post('/verify/:id',adminProtect, verifyDriver)
router.get('/all',protect,getAllDriver)

module.exports = router

