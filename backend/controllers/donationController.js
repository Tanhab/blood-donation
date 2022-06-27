const asyncHandler = require('express-async-handler')
const pool = require("../config/database")

// router.get('/',(req,res)=> {
//     const params = new URLSearchParams({
//     var1: "value",
//     bloodgroup: "A+",
//     arr: "A-",
//     });
// console.log(params.toString());
//     pool.query('SELECT * FROM users;', function (error, results, fields) {
//     if (error) throw error;
//     res.status(200).json({ 'users' : results})
//     });
// })


/**
 * @desc 
 * @route GET /api/search
 * @query - uid,first_name,last_name,phone_no,district,city,blood_group
 * @access - private
 */
const searchDonor = asyncHandler(async (req,res)=>{
    // take all the query parameters in a dictionary
    const params = req.query
    console.log(params)
    // default query
    let query = "SELECT * FROM donor "
    let a_ids = []
    if(Object.keys(params).length>0){
        query += 'WHERE ';
        let district = null
        let city = null
        let isFirstCondition = true // for adding AND in query
        for(const [key,value] of Object.entries(params)){
            
            // we will handle the adress manually so we keep their value for later
            if(key == 'district'){
                district = value
                continue
            }
            if(key == 'city'){
                city = value
                continue
            }
            if(!isFirstCondition) query+= "AND " // if its not first condition,then add AND
            // if value is string we need to surround with ''
            if (typeof value === 'string' || value instanceof String) 
                query += `${key}='${value}' `
            else
                query += `${key}=${value} `

            isFirstCondition = false // after first iteration make it false
        }

        // if there is adress then save their a_ids and make query
        if(district || city){
            a_ids = await getA_ids(district,city)
            // if no a_id is found that means no person from that adress
            if(a_ids.length == 0){
                res.json({"message": "No result found"})
                return
            }
            if(!isFirstCondition) query+= "AND "
            query += "a_id IN(?);"
            console.log(query);
            console.log(a_ids)
            // ? will be replaced with a_ids
            pool.query(query,[a_ids], function (error, results, fields) {
                if (error) throw error;
                res.status(200).json({ 'users' : results})
            });

        }else{
            console.log(query);
            pool.query(query, function (error, results, fields) {
                if (error) throw error;
                res.status(200).json({ 'users' : results})
            });
        }
        
    }else{
        pool.query(query,function (error, results, fields) {
                if (error) throw error;
                res.status(200).json({ 'users' : results})
            })
    }
    
    
    
})

/**
 * 
 * @param {string} district 
 * @param {string} city 
 * @returns 
 */
function getA_ids(district=null,city=null){
    let query = "SELECT a_id FROM address"
    if(district || city) query += " WHERE "
    if (district){
        query += `district='${district}'`
        if(city) query += " AND "
    }
    if(city){
        query += `city='${city}'`
    }
    return new Promise((resolve,reject)=>{
        pool.query(query,(err,rows,fields)=>{
            if(err){
                reject("Invalid adress search")
            }
            a_ids = rows.map((item)=>{
                return item['a_id']
            })
            resolve(a_ids);
        })
    })

}

module.exports = {
    searchDonor
}