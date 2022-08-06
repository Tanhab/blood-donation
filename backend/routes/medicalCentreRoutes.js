const express = require("express");
const router =  express.Router()
const {
    getMedicalCentre,
    createMedicalCentre,
    deleteMedicalCentre,
    updateMedicalCentre,
    getAllMedicalCentre

} = require("../controllers/medicalCentreController")
const { protect } = require('../middleware/authMiddleware')
const { adminProtect } = require("../middleware/adminMiddleware")

//router.get('/:id',protect, getMedicalCentre)
router.get("/all-medical-centres", getAllMedicalCentre)
router.post('/',createMedicalCentre)
router.put('/',updateMedicalCentre)
router.delete('/:id',deleteMedicalCentre)

module.exports = router