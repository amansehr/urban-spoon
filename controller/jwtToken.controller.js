const jwt = require('jsonwebtoken')
require("dotenv").config();


module.exports.generateToken = (data,res) => {
    const token = jwt.sign({id : data.id},process.env.JWT_SECRET)
    res.append('Set-Cookie', `token = ${token}; Path='http://localhost:5555/' HttpOnly`)

    return res.send({
        msg: "Login Successful",
    });
}
