const route = require('express').Router()
const workloadCtrl = require('../controller/load.controller');
const isauth = require('../middlewares/auth.middleware').auth;

route.get('/workload',isauth,workloadCtrl.load)

module.exports = route