const express = require('express');
const app = express();
require("dotenv").config();
const payRoute = require('./routes/pay.routes');
const workloadRoute = require('./routes/workload.routes')
const insertRoute = require('./routes/user.routes')
const bodyParser = require('body-parser');
const db = require('./services/db.services')
const authRoute = require('./routes/auth.routes')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('tiny'))
app.use(cookieParser())

db.sequelize.sync();
// db.sequelize.sync({force : true});

app.set('view engine','ejs')

app.use('/',payRoute)
app.use('/',workloadRoute)
app.use('/',insertRoute)
app.use('/',authRoute)

app.get('/',(req,res) =>{   
    return res.send({
        data : 1
    })
})

app.get('/loginByGoogle',(req,res)=>{
    return res.render('login')
})
app.listen(5555,(req,res) =>{
    console.log("server started at ",5555)
})