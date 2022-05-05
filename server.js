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
//? makes it a prepared statement and takes in the additional param argument
//using a placeholder can block a SQL injection attack
/*
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err,rows) => {
    //console.log(rows);
    //Get a single candidate
    if(err){
        console.log(err);
    }
    console.log(rows);
});
*/

const sql = `INSERT INTO candidates (id,first_name,last_name,industry_connected)
                VALUES(?,?,?,?)`;
//the values in params must match the order of placeholders
const params = [1,'Ronald','Firbank', 1];

db.query(sql,params, (err,result)=>{
    if(err){
        console.log(err);
    }
    console.log(result);
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