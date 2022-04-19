const express = require("express");
const router =  express.Router()
const {
    getMedicalCentre,
    createMedicalCentre,
    deleteMedicalCentre,
    updateMedicalCentre,

} = require("../controllers/medicalCentreController")
const { protect } = require('../middleware/authMiddleware')



router.get('/:id',protect, getMedicalCentre)
router.post('/',createMedicalCentre)
router.put('/',updateMedicalCentre)
router.delete('/:id',deleteMedicalCentre)

module.exports = router