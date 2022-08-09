const express = require("express")
const router = express.Router()
const pool = require("../config/database")
const {
  createBloodRequest,
  getBloodReqById,
  getAllBloodReq,
  acceptBloodReq
} = require("../controllers/bloodRequestController")
const { protect } = require("../middleware/authMiddleware")

// api/user/

router.post("/", protect, createBloodRequest)
router.get('/blood-req/:id',protect,getBloodReqById)
router.get('/all',protect,getAllBloodReq)
router.post('/accept-req/:id',protect,acceptBloodReq)

module.exports = router