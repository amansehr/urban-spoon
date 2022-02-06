const route = require("express").Router()
const payCtrl = require("../controller/pay.controller");

route.post('/pay',payCtrl.pay)

module.exports = route