const asyncHandler = require('express-async-handler')
const pool = require("../config/database")




const getAmbulance = asyncHandler(async (req, res) => {
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query("SELECT * FROM ambulance WHERE vehicle_id = ?"
        , req.params.id )
        if(rows.length == 1){
            res.status(200).json({"ambulance": rows[0]})
        }
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
    
    
})


const createAmbulance = asyncHandler(async (req, res) => {
    console.log(req.body)
    let {vehicle_id, organization, phone_no} = req.body

    if( typeof phone_no == 'string' ) phone_no = parseInt(phone_no)
    
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query('INSERT INTO ambulance(vehicle_id,organization,phone_no) VALUES(?,?,?);',[vehicle_id,organization,phone_no])
        const [ambulance,fields2 ] = await promisePool.query("SELECT * FROM ambulance WHERE vehicle_id = ?",
            rows.insertId)
        res.status(200).json({"ambulance": ambulance[0]})
    } catch (error) {
        res.status(400).json({'Error message': error.message,'stack':error.stack})
    }
    

})




module.exports = {
    getAmbulance,
    createAmbulance,
    
}