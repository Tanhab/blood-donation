const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const pool = require("../config/database")




// @desc    Get the data of a medical history
// @route   GET /api/medical-history/:id
// @access  Public
const getMedicalHistory = asyncHandler(async (req, res) => {
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query("SELECT * FROM medical_history WHERE uid = ?"
        , req.params.id )
        if(rows.length == 1){
            res.status(200).json({"medical_centre": rows[0]})
        }
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
    
    
})

// @desc    Register new medical centre
// @route   POST /api/medical-centre/
// @access  private
const createMedicalHistory = asyncHandler(async (req, res) => {
    console.log(req.body)
    let {last_checked,checked_at,physical_illness,genetical_issues} = req.body

    if( typeof checked_at == 'string' ) checked_at = parseInt(checked_at)
    //if( typeof a_id == 'string' ) a_id = parseInt(a_id)
    //console.log([name,phone_no,a_id])
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query('INSERT INTO medical_history(uid,last_checked,checked_at,physical_illness,genetical_issues) VALUES(?,?,?);',[req.user.uid,last_checked,checked_at,physical_illness,genetical_issues])
        const [medical,fields2 ] = await promisePool.query("SELECT * FROM medical_history WHERE uid = ?",
            req.user.uid)
        res.status(200).json({"medical": medical[0]})
    } catch (error) {
        res.status(400).json({'Error message': error.message,'stack':error.stack})
    }
    

})

// @desc    Register new medical centre
// @route   PUT /api/medical-centre/
// @access  Public
const updateMedicalHistory = asyncHandler(async (req, res) => {
    
    })

// @desc    delete medical centre
// @route   DELETE /api/medical-centre/:id
// @access  Public
const deleteMedicalHistory = asyncHandler(async (req, res) => {
    
    })




module.exports = {
    getMedicalHistory,
    createMedicalHistory,
    deleteMedicalHistory,
    updateMedicalHistory,
}