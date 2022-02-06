const route = require('express').Router()
const workloadCtrl = require('../controller/load.controller');
route.get('/workload',workloadCtrl.load)

module.exports = route