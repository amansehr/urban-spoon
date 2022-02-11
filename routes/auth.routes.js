const route = require('express').Router()
const authCtrl = require('../controller/auth.controller')
const isauth = require('../middlewares/auth.middleware').auth
const Joi = require('joi')
const validate = require('../middlewares/validate.middleware')
const loginPasswordSchema = Joi.object().keys({
    emailId : Joi.string().required().min(1),
    password : Joi.string().required().min(1)
})
const loginGoogleSchema = Joi.object().keys({
    idtoken : Joi.string().required()
})


route.post('/loginByEmailPassword',validate(loginPasswordSchema),authCtrl.loginByEmailPassword);
route.post('/loginByGoogle',validate(loginGoogleSchema),authCtrl.loginByGoogle);

route.post('/signUpEmailPassword',authCtrl.signUpEmailPassword);

module.exports = route