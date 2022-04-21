const express = require("express");
const router =  express.Router()
const {
    getMedicalHistory,
    createMedicalHistory,
    deleteMedicalHistory,
    updateMedicalHistory,

} = require("../controllers/medicalHistoryContoller")
const { protect } = require('../middleware/authMiddleware')

router.get('/:id',protect, getMedicalHistory)
router.post('/',protect,createMedicalHistory)
router.put('/',updateMedicalHistory)
router.delete('/:id',deleteMedicalHistory)

module.exports = router