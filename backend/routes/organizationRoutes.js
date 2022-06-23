const express = require("express");
const router =  express.Router()
const {
    getOrganization,
    createOrganization,

} = require("../controllers/medicalCentreController")
const { protect } = require('../middleware/authMiddleware')



router.get('/:id',protect,  getOrganization)
router.post('/',createOrganization)


module.exports = router

