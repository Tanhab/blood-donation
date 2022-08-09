const asyncHandler = require("express-async-handler")
const pool = require("../config/database")
const { insertAddress } = require("../controllers/addressController")

// @desc    Register new reciever
// @route   POST /api/users/recieve
// @access  Private
const createBloodRequest = asyncHandler(async (req, res) => {
  let { nid_birthCtf, uid, blood_group, phone_no } = req.body
  let { building, village_road, post_office, city, district } = req.body

  if (
    !nid_birthCtf ||
    !uid ||
    !blood_group ||
    !phone_no ||
    !city ||
    !district
  ) {
    res.status(400)
    throw new Error("Please add all required fields")
  }

  // input adress and get its a_id
  validKey = ["building", "village_road", "post_office", "city", "district"]
  address = {}
  for (key in req.body) {
    if (validKey.includes(key)) address[key] = req.body[key]
  }

  try {
    a_id = await insertAddress(Object.keys(address), Object.values(address))
  } catch (error) {
    res.status(400).json({ "Error message": error.message })
  }
  if (typeof uid == "string") uid = parseInt(uid)
  if (typeof nid_birthCtf == "string") nid_birthCtf = parseInt(nid_birthCtf)
  if (phone_no && typeof phone_no == "string") phone_no = parseInt(phone_no)
  values = [nid_birthCtf, uid, blood_group, phone_no, a_id]

  const promisePool = pool.promise()
  // query database using promises
  let query =
    "INSERT INTO blood_donation.blood_request (`nid_birthCtf`,`uid`,`blood_group`,`phone_no`,`a_id`) VALUES(?);"
  try {
    const [rows, fields] = await promisePool.query(query, [values])
    const [reciever, fields2] = await promisePool.query(
      "SELECT * FROM blood_request WHERE req_id = ?",
      rows.insertId
    )

    res.status(201).json({
      req_id: reciever[0].req_id,
      uid: reciever[0].uid,
      nid_birthCtf: reciever[0].nid_birthCtf,
      phone_no: reciever[0].phone_no,
      blood_group: reciever[0].blood_group,
      a_id: reciever[0].a_id,
    })
  } catch (error) {
    res.status(400).json({ "Error message": error.message })
  }
})

const getBloodReqById = asyncHandler(async (req, res) => {
  const promisePool = pool.promise()
  try {
     const [bloodReq, fields2] = await promisePool.query(
      "SELECT * FROM blood_request WHERE req_id = ?",
      req.params.id )
      const [address, field] = await promisePool.query(
        "select * from address where a_id=?",
        bloodReq[0].a_id
      )
      bloodReq[0].address=address[0]
      res.json(bloodReq)
  } catch (error) {
    console.log(error)
    res.status(400).json({ "Error message": error.message })
  }

})


const getAllBloodReq = asyncHandler(async (req, res) => {
  const promisePool = pool.promise()
   try {
     const [bloodReq, fields2] = await promisePool.query(
       "SELECT * FROM blood_request"
     )
     res.json(bloodReq)
   } catch (error) {
     console.log(error)
     res.status(400).json({ "Error message": error.message })
   }
})

const acceptBloodReq = asyncHandler(async (req, res) => {
  let {date_donated,medical_centre,donor} = req.body
 if(!date_donated || !medical_centre || !donor){
  res.status(400).json({"error Message": "Required all fields"})
 }

  if (typeof medical_centre == "string") medical_centre = parseInt(medical_centre)
  if (typeof donor == "string") donor = parseInt(donor)
  const promisePool = pool.promise()
  let query =
    "UPDATE `blood_donation`.`blood_request` SET `donor` = ?, `date_donated` = ?, `medical_centre` = ?, completed = 1 WHERE (`req_id` = ?);"

    try {
      await promisePool.query(query, [donor, date_donated, medical_centre,req.params.id])
      res.status(200).json({"message":"blood request accepted"})
    }catch (error) {
      res.status(400).json({ "Error message": error.message })
    }
})

module.exports = {
  createBloodRequest,
  getAllBloodReq,
  getBloodReqById,
  acceptBloodReq
}
