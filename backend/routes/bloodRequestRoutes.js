const express = require("express")
const router = express.Router()
const pool = require("../config/database")
const {
  createBloodRequest,
} = require("../controllers/bloodRequestController")
const { protect } = require("../middleware/authMiddleware")

// api/user/

router.post("/", protect, createBloodRequest)

module.exports = router