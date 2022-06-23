const express = require("express");
const router =  express.Router()
const {
    getDriver,
    createDriver,

} = require("../controllers/medicalCentreController")
const { protect } = require('../middleware/authMiddleware')



router.get('/:id',protect, getDriver)
router.post('/',createDriver)


module.exports = router

