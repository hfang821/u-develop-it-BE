//import express
const express = require('express');
//adding port designations
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/',(req,res) => {
    res.json({
        message: 'Hello World!'
    });
});

//Default response for any other request(Not found)
//Need to place this at the last one to handle other unavailable requests
app.use((req, res) => {
    res.status(404).end();
});

//starting the express.js server on PORT 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})