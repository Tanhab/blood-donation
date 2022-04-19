const pool = require('../config/database')

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


function insertAdress(adressFieldName,adressFieldValue){
    let query = 'INSERT INTO blood_donation.adress ('
    let first = true
    adressFieldName.map((item)=>{
        if(!first) query+= ','
        query += item;
        first = false;
    })
    values = adressFieldValue.map((item)=>{
        if(!isNumeric(item))
        return item
        else 
            return parseFloat(item)
    })

    query += ") VALUES(?)"
    console.log(query)
    return new Promise((resolve,reject)=>{
        pool.query(query,[values],(err,result,fields)=>{
            if(err)
                reject(err.message)
            resolve(result.insertId)
        })
    })
    
}

module.exports = {
    insertAdress
}