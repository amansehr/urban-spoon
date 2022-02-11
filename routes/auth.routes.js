const route = require('express').Router()
const authCtrl = require('../controller/auth.controller')
const isauth = require('../middlewares/auth.middleware').auth
const Joi = require('joi')
const validate = require('../middlewares/validate.middleware')
const loginSchema = Joi.object().keys({
    username : Joi.string().required().min(1),
    password : Joi.string().required().min(1)
})

route.post('/login',validate(loginSchema),authCtrl.login);
route.post('/signUp',authCtrl.signUp);

module.exports = route