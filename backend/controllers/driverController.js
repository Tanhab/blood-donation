const asyncHandler = require('express-async-handler')
const pool = require("../config/database")




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


const createDriver = asyncHandler(async (req, res) => {
    console.log(req.body)
    let {driving_license, first_name, last_name, station, vehicle} = req.body

    if( typeof phone_no == 'string' ) phone_no = parseInt(phone_no)
    
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query('INSERT INTO driver(driving_license, first_name, last_name, station, vehicle) VALUES(?,?,?);',[driving_license, first_name, last_name, station, vehicle])
        const [driver,fields2 ] = await promisePool.query("SELECT * FROM driver WHERE driving_license = ?",
           driving_license)
        res.status(200).json({"driver": driver[0]})
    } catch (error) {
        res.status(400).json({'Error message': error.message,'stack':error.stack})
    }
    

})




module.exports = {
    getDriver,
    createDriver,
    
}