const asyncHandler = require('express-async-handler')
const pool = require("../config/database")




const getOrganization = asyncHandler(async (req, res) => {
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query("SELECT * FROM otherOrg WHERE org_id = ?"
        , req.params.id )
        if(rows.length == 1){
            res.status(200).json({"organization": rows[0]})
        }
    } catch (error) {
        res.status(400).json({'Error message': error.message})
    }
    
    
})


const  createOrganization = asyncHandler(async (req, res) => {
    console.log(req.body)
    let {org_name, org_branch, hotline} = req.body

    if( typeof hotline == 'string' ) phone_no = parseInt(hotline)
    
    const promisePool = pool.promise()
    try {
        const [rows,fields] = await promisePool.query('INSERT INTO otherOrg(org_name, org_branch, hotline) VALUES(?,?,?);',[org_name, org_branch, hotline])
        const [organization,fields2 ] = await promisePool.query("SELECT * FROM otherOrg WHERE org_id = ?",
            rows.insertId)
        res.status(200).json({"ambulance": organization[0]})
    } catch (error) {
        res.status(400).json({'Error message': error.message,'stack':error.stack})
    }
    

})




module.exports = {
    getOrganization,
    createOrganization,
    
}