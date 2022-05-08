//import express
const express = require('express');
const db = require('./db/connection');
//this will automatically look for the index.js file in the directory
const apiRoutes = require('./routes/apiRoutes');

//adding port designations
const PORT = process.env.PORT || 3001;
const app = express();
//const inputCheck = require('./utils/inputCheck');

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//needs to be after express middleware; this allows the api routes to be directly used
app.use('/api', apiRoutes);

//default response after any other unknown request(Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//starting the express.js server on PORT 3001 after DB connection
db.connect(err=>{
    if (err) throw err;
    console.log('databse connected');
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
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

// const sql = `INSERT INTO candidates (id,first_name,last_name,industry_connected)
//                 VALUES(?,?,?,?)`;
//the values in params must match the order of placeholders
// const params = [1,'Ronald','Firbank', 1];

//catchAll: Default response for any other request(Not found)
//Need to place this at the last one to handle other unavailable requests