const express = require('express');
const app = express();

app.get('/',(req,res) =>{
    return res.send({
        data : 1
    })
})

app.listen(5555,(req,res) =>{
    console.log("server started at ",5555)
})