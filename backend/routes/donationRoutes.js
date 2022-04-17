const express = require("express");
const { type } = require("express/lib/response");
const router =  express.Router()
var mysql = require('mysql2');
var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : 'localhost',
  user            : 'root',
  password        : 'drishub',
  database        : 'blood_donation'
});
router.get('/',(req,res)=> {
    const params = new URLSearchParams({
    var1: "value",
    bloodgroup: "A+",
    arr: "A-",
    });
console.log(params.toString());
    pool.query('SELECT * FROM users;', function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'users' : results})
    });
})
router.get('/search',(req,res)=>{
    const params = req.query
    console.log(params)
    let query = "SELECT * FROM users "
    if(params){
        query += 'WHERE ';
        let first = true
        for(const [key,value] of Object.entries(params)){
            if(!first) query+= "AND "
            if (typeof value === 'string' || value instanceof String)
                query += `${key}='${value}'`
            else
                query += `${key}=${value}`
            first = false
        }
        
    }
    query+=';'
    console.log(query);
    pool.query(query, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json({ 'users' : results})
    });
    
})
module.exports = router

