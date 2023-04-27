const express = require('express')
const route = express.Router()
const {verifytoken} = require('../middleware/verifyToken')
const candidateController = require('../controllers/candidateController')

route.post('/profileques', verifytoken, candidateController.profileQues)

module.exports = route