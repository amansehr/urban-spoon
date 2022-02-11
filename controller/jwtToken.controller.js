const res = require('express/lib/response');
const jwt = require('jsonwebtoken')
require("dotenv").config();


module.exports.generateToken = (data,res) => {
    const token = jwt.sign({username : data.username},process.env.JWT_SECRET)
    res.cookie("token",token,{
        httpOnly : true,
        maxAge: 864000000,
        sameSite: "none",    
    });
    // res.append('Authorization',`bearer ${token}`)

    return res;
}
