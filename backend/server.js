const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use('/api/',require('./routes/donationRoutes'))
// var mysql = require('mysql2');
// var pool  = mysql.createPool({
//   connectionLimit : 20,
//   host            : 'localhost',
//   user            : 'root',
//   password        : 'drishub',
//   database        : 'blood_donation'
// });



app.listen(port, ()=>{
    console.log("server started on " + port)
})

