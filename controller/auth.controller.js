const userModel = require("../services/db.services").User
const generateToken = require("../controller/jwtToken.controller").generateToken
const bcrypt = require('bcrypt')
require("dotenv").config();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require("jsonwebtoken")
const {mailService} = require("../services/email.service")


module.exports.loginByEmailPassword = (req,res) =>{
    userModel.findOne({
        where : {
            emailId : req.body.emailId,
        }
    }).then(data =>{
        console.log(data)
        if(data.length == 0){
            return res.send({
                msg : "Please SignUp"
            })
        }
        else if(data['dataValues'].password == null){
            return res.send({
                msg : "Please Reset your Password"
            })
        }
        if(bcrypt.compareSync(req.body.password,data.password)){
           return  generateToken(data,res)   
        }
        return res.send({
            msg : "Password Incorrect"
        })
    }).catch(err => {
        console.log("Error in login controller",err)
        res.send({
            msg: "Not Able to login" 
        })
    })
}

module.exports.signUpEmailPassword = (req,res) => {
    userModel.findAll({
        where : {
            emailId : req.body.emailId
        }
    }).then(data => {
        console.log(data)
        if(data.length == 0){
            const hash = bcrypt.hashSync(req.body.password,10);
            userModel.create({ 
                emailId:req.body.emailId,
                password:hash
            }).catch(err => console.log("Error in signup controller",err))

            return res.send({
                msg: "User Signed Up Successfully"
            })
        }
        return res.send({
            msg : "user already exist"

        })
    }).catch(err => console.log("Error in signup controller",err))
}

module.exports.loginByGoogle = async (req,res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.body.idtoken,
        audience: process.env.CLIENT_ID,
    }).catch(console.error);
    let email = ticket.getPayload().email;
    let data = await userModel.findOrCreate({
        where : {
            emailId : email
        }
    }).catch(err => console.log("Error in fetching user data",err))
    return generateToken(data,res)
}

module.exports.forgetPassword = async (req,res) => {
    let data = await userModel.findOne({
        where : {
            emailId : req.body.emailId
        }
    }).catch(err => console.log("Error in fetching user data",err))

    if(data.length == 0){
        return res.send({
            msg : "User Not Found"
        })
    }
    const token = jwt.sign({id : data.id},process.env.JWT_SECRET);
    await userModel.update({resetLink : token},{
        where : {
            emailId: req.body.emailId
        }
    }).catch(err => console.log("Error while updating forget password link",err))
    
    let url = `http://localhost:5555/resetPassword?resetLink=${token}`
    mailService(req.body.mailId,"Password Resest Link",url)
}

module.exports.resetPassword = async (req,res) => {
    const passwordHash = bcrypt.hashSync(req.body.newPassword,10);
    let data = await userModel.findOne({
        where : {
            resetLink: req.body.resetLink
        }
    })
    if(data == null){
        return res.send({
            msg : "Something Went Wrong"
        })
    }
    data = await userModel.update({password : passwordHash ,resetLink : ""},{
        where:{
           emailId : data.emailId
        }
    }).catch(err => console.log(err));
    console.log(data)
    if(data.length == 0){
        return res.send({
            msg : "Something Went Wrong"
        })
    }
    return res.send({
        msg : "Password Updated Successfully"
    })
}
