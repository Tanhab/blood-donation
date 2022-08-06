const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const pool = require("../config/database")
const {insertAddress} = require('../controllers/addressController')



// @desc    Get the data of a medical centre
// @route   GET /api/medical-centre/:id
// @access  Public
const getMedicalCentre = asyncHandler(async (req, res) => {
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query("SELECT * FROM medical_centre WHERE m_id = ?"
        , req.params.id )
        if(rows.length == 1){
            res.status(200).json({"medical_centre": rows[0]})
        }
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
    
    
})


// @desc    Get the data of a medical centre
// @route   GET /api/medical-centre/:id
// @access  Public
const getAllMedicalCentre = asyncHandler(async (req, res) => {
    
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query("SELECT m_id,name FROM medical_centre")
        res.status(200).json({ medical_centre: rows })
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
    
    
})

// @desc    Register new medical centre
// @route   POST /api/medical-centre/
// @access  private
const createMedicalCentre = asyncHandler(async (req, res) => {
    let {name,phone_no} = req.body
    let {building,village_road,post_office,city,district} = req.body
    if (!name  || !phone_no || ! city || !district) {
        res.status(400)
        throw new Error('Please add all required fields')
    }
    if( typeof phone_no == 'string' ) phone_no = parseInt(phone_no)
    //if( typeof a_id == 'string' ) a_id = parseInt(a_id)
    validKey = ["building","village_road","post_office","city","district"]
    address = {}
    for (key in req.body){
        if (validKey.includes(key))
            address[key]=req.body[key]
    }
    
    try {
        a_id = await insertAddress(Object.keys(address),Object.values(address))
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }

    console.log([name,phone_no,a_id])
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query('INSERT INTO medical_centre(name,phone_no,a_id) VALUES(?,?,?);',[name,phone_no,a_id])
        const [medical,fields2 ] = await promisePool.query("SELECT * FROM medical_centre WHERE m_id = ?",
            rows.insertId)
        res.status(200).json({"medical": medical[0]})
    } catch (error) {
        res.status(400).json({'Error message': error.message,'stack':error.stack})
    }
    

})

// @desc    Register new medical centre
// @route   PUT /api/medical-centre/
// @access  Public
const updateMedicalCentre = asyncHandler(async (req, res) => {
    
    })

// @desc    delete medical centre
// @route   DELETE /api/medical-centre/:id
// @access  Public
const deleteMedicalCentre = asyncHandler(async (req, res) => {
    
    })




module.exports = {
    getAllMedicalCentre,
    getMedicalCentre,
    createMedicalCentre,
    deleteMedicalCentre,
    updateMedicalCentre,
}