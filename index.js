const express = require('express');
const app = express();
const payRoute = require('./routes/pay.routes');
const workloadRoute = require('./routes/workload.routes')
const bodyParser = require('body-parser');
const db = require('./services/db.services')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));

db.sequelize.sync();

app.use('/',payRoute)
app.use('/',workloadRoute)

app.get('/',(req,res) =>{
    return res.send({
        data : 1
    })
})

app.listen(5555,(req,res) =>{
    console.log("server started at ",5555)
})