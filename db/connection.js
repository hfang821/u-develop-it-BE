const mysql = require('mysql2');

//connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username
        user: 'root',
        //MySQL password
        password:'fanghaoyu',
        database:'election'
    },
    console.log('Connected to the election database')
);

module.exports = db;