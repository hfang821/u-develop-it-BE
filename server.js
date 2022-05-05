const mysql = require('mysql2');
//import express
const express = require('express');
//adding port designations
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

app.get('/',(req,res) => {
    res.json({
        message: 'Hello World!'
    });
});

//the query() method runs the sql query and executes the callback with
//all the resulting rows that match the query
db.query(`SELECT * FROM candidates`, (err,rows) => {
    console.log(rows);
});

//catchAll: Default response for any other request(Not found)
//Need to place this at the last one to handle other unavailable requests
app.use((req, res) => {
    res.status(404).end();
});

//starting the express.js server on PORT 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})