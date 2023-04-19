const express = require('express')
const referralController = require('../controllers/referralController')
const route = express.Router()
const verifytokenmiddleware = require('../middleware/verifyToken')

route.post('/postreferral',referralController.postreferral)
route.get('/getreferral',referralController.getlistofreferrals)

module.exports = route