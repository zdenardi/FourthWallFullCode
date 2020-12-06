import mysql from 'mysql'
require('dotenv').config();
// Hidden for public.

module.exports ={
  connection: mysql.createPool({
    multipleStatements:true,
    connectionLimit: 10,
    host:'localhost',
    user:'webadmin',
    password:'WebAdmin19020811!!',
    database:'4thwall',
    dialect: 'mysql',
    timezone: 'UTC',
  })

  
}
