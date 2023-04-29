const express = require('express')
const referralController = require('../controllers/referralController')
const route = express.Router()
const {verifytoken} = require('../middleware/verifyToken')

route.post('/postreferral', verifytoken, referralController.postreferral)
route.get('/getreferral', verifytoken, referralController.getlistofreferrals)
route.post('/applyforreferral', verifytoken, referralController.applyForReferral)
route.get('/getonereferral/:referral_id', verifytoken, referralController.getDetailsofReferral)

module.exports = route