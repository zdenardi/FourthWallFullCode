import mysql from 'mysql'
require('dotenv').config();
// Hidden for public.

module.exports ={
  connection: mysql.createPool({
    multipleStatements:true,
    connectionLimit: 10,
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME,
    dialect: 'mysql',
    timezone: 'UTC',
  })

  
}
