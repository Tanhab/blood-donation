const asyncHandler = require('express-async-handler')
const pool = require("../config/database")
const { insertAddress } = require("../controllers/addressController")



const getDriver = asyncHandler(async (req, res) => {
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query("SELECT * FROM driver WHERE driving_license = ?"
        , req.params.id )
        if(rows.length == 1){
            res.status(200).json({"driver": rows[0]})
        }
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
    
    
})

const getAllDriver = asyncHandler(async (req, res) => {
  const promisePool = pool.promise()
  try {
    const [rows, fields] = await promisePool.query(
      "SELECT * FROM driver",
    )
    res.status(200).json({drivers: rows})
  } catch (error) {
    res.status(400).json({ "Error message": error.message })
  }
})


const createDriver = asyncHandler(async (req, res) => {
  console.log(req.body)
  let { driving_license, first_name, last_name,phone_no,station, city, district } =
    req.body
  let a_id;
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


  if (typeof phone_no == "string") phone_no = parseInt(phone_no)
  if (typeof station == "string") station = parseInt(station)
  const promisePool = pool.promise()
  try {
    const [rows, fields] = await promisePool.query(
      "INSERT INTO driver(driving_license, first_name, last_name,phone_no, station, a_id) VALUES(?);",
      [[driving_license, first_name, last_name, phone_no,station, a_id]]
    )
    const [driver, fields2] = await promisePool.query(
      "SELECT * FROM driver WHERE driving_license = ?",
      driving_license
    )
    res.status(200).json({ driver: driver[0] })
  } catch (error) {
    res.status(400).json({ "Error message": error.message, stack: error.stack })
  }
})

const verifyDriver = asyncHandler(async (req, res) => {
  const promisePool = pool.promise()
  try {
    const [rows, fields] = await promisePool.query(
      "UPDATE driver SET verified = ? WHERE driving_license = ?",
      [1, req.params.id]
    )
    res.status(200).json({message: "driver verified"})
  } catch (error) {
    res.status(400).json({ "Error message": error.message })
  }
})




module.exports = {
    getDriver,
    createDriver,
    getAllDriver,
    verifyDriver
}