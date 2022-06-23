const express = require("express");
const router =  express.Router()
const {
    getAmbulance,
    createAmbulance,

} = require("../controllers/medicalCentreController")
const { protect } = require('../middleware/authMiddleware')



router.get('/:id',protect, getAmbulance)
router.post('/',createAmbulance)


module.exports = router

