const mysql = require('mysql2');
//import express
const express = require('express');
//adding port designations
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');

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

// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM  candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

//api signifies that this is a api endpoint
app.get('/api/candidates/:id',(req,res) => {
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id
    WHERE candidates.id=?`;
    
    const params = [req.params.id];

    db.query(sql,params,(err,rows)=>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.delete('/api/candidate/:id',(req,res)=>{
    const sql = `DELETE FROM candidates WHERE id=?`;
    const params = [req.params.id];

    db.query(sql,params,(err,result)=>{
        if(err) {
            res.statusMessage(400).json({error:res.message});
        } 
        //if the user tries to delete a candidate that doesnt exist
        else if (!result.affectedRows) {
            res.json({
                message:'Candidate not found'
            });
        } else {
            res.json({
                message:'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

//create a candidate
//deconstructing the req to pull the body property out of the entire req
app.post('/api/candidate',({body},res)=>{
    const errors = inputCheck(body,'first_name','last_name','industry_connected');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }

    const sql = `INSERT INTO candidates (first_name,last_name,industry_connected)
    VALUES(?,?,?)`;

    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql,params,(err,result) =>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message:'success',
            data: body
        });
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
app.use((req, res) => {
    res.status(404).end();
});

//starting the express.js server on PORT 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})