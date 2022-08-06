var mysql = require('mysql2');
const dotenv = require('dotenv').config()


var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.HOST,
  user            : 'root',
  password        : process.env.PASSWORD,
  database        : process.env.DATABASE
});



module.exports = pool