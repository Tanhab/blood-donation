const asyncHandler = require("express-async-handler")
const pool = require("../config/database")
const { insertAddress } = require("../controllers/addressController")

// @desc    Register new reciever
// @route   POST /api/users/recieve
// @access  Private
const createNotification = asyncHandler(async (req, res) => {
  let { message, sender, blood_request } = req.body

  if (!message || !sender || !blood_request) {
    res.status(400)
    throw new Error("Please add all required fields")
  }
  if (typeof blood_request == "string") blood_request = parseInt(blood_request)
  if (typeof sender == "string") sender = parseInt(sender)

  const promisePool = pool.promise()
  // query database using promises
  // get the blood group of the request

  let query1 = "Select * from blood_request where req_id = ? "
  let request
  try {
    const [data, fields] = await promisePool.query(query1, blood_request)
    if (data.length == 1) {
      request = data[0]
    } else {
      throw new Error("blood request not found")
    }
  } catch (error) {
    res.status(400).json({ "Error message": error.message })
  }
  //console.log(request)


  // find all valid donor with the blood group
  let query2 = "Select uid from donor where blood_group = ?"
  let recievers;
  try {
    const [data, fields] = await promisePool.query(
      query2,
      request.blood_group
    )
    recievers = data
  } catch (error) {
    res.status(400).json({ "Error message": error.message })
  }

  //console.log("recievr",recievers)
  // create notification 

  let query3 = "INSERT INTO notification (message,blood_request,sender) VALUES(?)"
  let notification_id;
  try {
    const [notification, fields] = await promisePool.query(
      query3,[[message,blood_request,sender]]
    )
    notification_id = notification.insertId
  } catch (error) {
    res.status(400).json({ "Error message": error.message })
  }
  console.log(recievers)
  // send notification to all valid recievers
  recievers.forEach( async ({uid})=>{
    try {
        await promisePool.query("Insert INTO notification_reciever(`id`,`reciever`) VALUES(?)",
        [[notification_id,uid]])

       
    } catch (error) {
       res.status(400).json({ "Error message": error.message }) 
    }
    
  })
   res.json({ message: "notification created" })
})

const seenNotification = asyncHandler(async (req, res) => {
  let {notification_id,reciever} = req.body
  const promisePool = pool.promise()
  let notification_ids;
  try {
    const [rows, fields] = await promisePool.query(
      "UPDATE notification_reciever SET seen = 1 WHERE reciever = ? and id = ?",
      [reciever, notification_id]
    )

      res.json({"message":"notification sent"})

  } catch (error) {
    res.status(400).json({ "Error message": error.message })
  }
})



const getAllNotificationByID = asyncHandler(async (req, res) => {
  const promisePool = pool.promise()
  
  try {
    const [notification, fields] = await promisePool.query(
      "Select * from notification INNER JOIN notification_reciever where notification_reciever.id = notification.id and notification_reciever.reciever = ? and notification.sender != notification_reciever.reciever",[req.params.reciever])
      
      res.json(notification) 
  } catch (error) {
    res.status(400).json({ "Error message": error.message })
  }
})

const createAcceptNotification = asyncHandler(async (req, res) => {
  let { message, sender, blood_request,reciever } = req.body

  if (!message || !sender || !blood_request || !reciever) {
    res.status(400)
    throw new Error("Please add all required fields")
  }
  if (typeof blood_request == "string") blood_request = parseInt(blood_request)
  if (typeof sender == "string") sender = parseInt(sender)
  if (typeof reciever == "string") reciever = parseInt(reciever)

  const promisePool = pool.promise()
   let query =
     "INSERT INTO notification (message,blood_request,sender) VALUES(?)"
   let notification_id
   try {
     const [notification, fields] = await promisePool.query(query, [
       [message, blood_request, sender],
     ])
     notification_id = notification.insertId
     await promisePool.query(
       "Insert INTO notification_reciever(`id`,`reciever`) VALUES(?)",
       [[notification_id, reciever]]
     )

     res.json({"message": "notification created"})
   } catch (error) {
     res.status(400).json({ "Error message": error.message })
   }




})

module.exports = {
  createNotification,
  seenNotification,
  getAllNotificationByID,
  createAcceptNotification
}
