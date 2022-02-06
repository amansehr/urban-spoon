const route = require("express").Router()
const userCtrl = require("../controller/user.controller")

route.post('/user',userCtrl.insertUser)

module.exports = route