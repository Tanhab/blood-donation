const express = require("express")
const router = express.Router()
const pool = require("../config/database")
const { createNotification,seenNotification,getAllNotificationByID,createAcceptNotification,countNotificationByID } = require("../controllers/notificationController")
const { protect } = require("../middleware/authMiddleware")

// api/user/

router.post("/", protect, createNotification)
router.post("/accept",protect,createAcceptNotification)
router.put('/',protect,seenNotification)
router.get('/:reciever',protect,getAllNotificationByID)
router.get('/count/:reciever',protect,countNotificationByID)

module.exports = router
