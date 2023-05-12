const express = require('express')
const route = express.Router()
const {verifytoken} = require('../middleware/verifyToken')
const candidateController = require('../controllers/candidateController')

route.post('/profileques', candidateController.profileQues)
route.get('/getdetails', verifytoken, candidateController.getdetailsofuser)

module.exports = route